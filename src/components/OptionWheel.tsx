import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react';
import './OptionWheel.css';

type OptionWheelProps = {
  items?: string[];
  defaultSelected?: number;
  onChange?: (index: number, item?: string) => void;
  textColor?: string;
  activeColor?: string;
  side?: 'left' | 'right';
  fontSize?: number;
  spacing?: number;
  curve?: number;
  tilt?: number;
  blur?: number;
  fade?: number;
  minOpacity?: number;
  smoothing?: number;
  inset?: number;
  loop?: boolean;
  draggable?: boolean;
  className?: string;
};

type WheelConfig = {
  count: number;
  items: string[];
  rowH: number;
  curve: number;
  tilt: number;
  blur: number;
  fade: number;
  minOpacity: number;
  side: 'left' | 'right';
  loop: boolean;
  smoothing: number;
  draggable: boolean;
};

type DragState = { y: number; start: number; id: number };

export default function OptionWheel({
  items = [],
  defaultSelected = 0,
  onChange,
  textColor = '#a6a6a6',
  activeColor = '#ffffff',
  side = 'left',
  fontSize = 3,
  spacing = 1.4,
  curve = 1,
  tilt = 6,
  blur = 2,
  fade = 0.25,
  minOpacity = 0.05,
  smoothing = 200,
  inset = 80,
  loop = false,
  draggable = true,
  className = '',
}: OptionWheelProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const posRef = useRef(defaultSelected);
  const targetRef = useRef(defaultSelected);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const selectedRef = useRef(defaultSelected);
  const wheelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const dragMovedRef = useRef(false);
  const [selectedIndex, setSelectedIndex] = useState(defaultSelected);
  const [isDragging, setIsDragging] = useState(false);

  const remPx = typeof window !== 'undefined' ? parseFloat(getComputedStyle(document.documentElement).fontSize) || 16 : 16;
  const config: WheelConfig = {
    count: items.length,
    items,
    rowH: Math.max(fontSize * spacing * remPx, 1),
    curve,
    tilt,
    blur,
    fade,
    minOpacity,
    side,
    loop,
    smoothing,
    draggable,
  };
  const configRef = useRef<WheelConfig>(config);
  configRef.current = config;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const runFrame = useCallback((now: number) => {
    const delta = Math.min((now - lastRef.current) / 1000, 0.05);
    lastRef.current = now;
    const currentConfig = configRef.current;
    const smoothingTime = Math.max(currentConfig.smoothing, 1) / 1000;
    const progress = 1 - Math.exp(-delta / smoothingTime);
    const target = targetRef.current;
    let current = posRef.current + (target - posRef.current) * progress;
    const settled = Math.abs(target - current) < 0.001;
    if (settled) current = target;
    posRef.current = current;

    const mirror = currentConfig.side === 'right' ? -1 : 1;
    const tiltRadians = (currentConfig.tilt * Math.PI) / 180;
    const radius = tiltRadians > 0.0005 ? currentConfig.rowH / tiltRadians : 0;
    itemRefs.current.forEach((element, index) => {
      if (!element) return;
      let distance = index - current;
      if (currentConfig.loop && currentConfig.count > 1) {
        distance = ((distance % currentConfig.count) + currentConfig.count) % currentConfig.count;
        if (distance > currentConfig.count / 2) distance -= currentConfig.count;
      }
      const angle = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, distance * tiltRadians));
      const y = radius ? radius * Math.sin(angle) : distance * currentConfig.rowH;
      const x = radius ? -mirror * radius * (1 - Math.cos(angle)) * currentConfig.curve : 0;
      const rotation = radius ? (mirror * angle * 180) / Math.PI : 0;
      const absoluteDistance = Math.abs(distance);
      element.style.transform = `translate(${x.toFixed(2)}px, calc(${y.toFixed(2)}px - 50%)) rotate(${rotation.toFixed(3)}deg)`;
      element.style.opacity = String(Math.max(currentConfig.minOpacity, 1 - absoluteDistance * currentConfig.fade));
      element.style.filter = currentConfig.blur > 0 ? `blur(${(absoluteDistance * currentConfig.blur).toFixed(2)}px)` : 'none';
      element.style.setProperty('--ow-p', Math.max(0, 1 - Math.min(absoluteDistance, 1)).toFixed(4));
    });

    rafRef.current = settled ? null : requestAnimationFrame(runFrame);
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(runFrame);
  }, [runFrame]);

  const applyTarget = useCallback((value: number, snap: boolean) => {
    const currentConfig = configRef.current;
    let next = value;
    if (!currentConfig.loop) next = Math.min(Math.max(next, 0), Math.max(currentConfig.count - 1, 0));
    if (snap) next = Math.round(next);
    targetRef.current = next;
    if (currentConfig.count === 0) return;
    const index = ((Math.round(next) % currentConfig.count) + currentConfig.count) % currentConfig.count;
    if (index !== selectedRef.current) {
      selectedRef.current = index;
      setSelectedIndex(index);
      onChangeRef.current?.(index, currentConfig.items[index]);
    }
    startLoop();
  }, [startLoop]);

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const currentConfig = configRef.current;
      const delta = event.deltaMode === 1 ? event.deltaY * 24 : event.deltaY;
      const step = Math.max(-1, Math.min(1, delta / currentConfig.rowH));
      applyTarget(targetRef.current + step, false);
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = setTimeout(() => applyTarget(targetRef.current, true), 140);
    };
    element.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      element.removeEventListener('wheel', onWheel);
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
    };
  }, [applyTarget]);

  const handlePointerDown = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (!configRef.current.draggable) return;
    dragRef.current = { y: event.clientY, start: targetRef.current, id: event.pointerId };
    dragMovedRef.current = false;
    setIsDragging(true);
  }, []);

  const handlePointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const distance = event.clientY - drag.y;
    if (!dragMovedRef.current && Math.abs(distance) > 4) {
      dragMovedRef.current = true;
      rootRef.current?.setPointerCapture(drag.id);
    }
    if (dragMovedRef.current) applyTarget(drag.start - distance / configRef.current.rowH, false);
  }, [applyTarget]);

  const handlePointerEnd = useCallback(() => {
    if (!dragRef.current) return;
    dragRef.current = null;
    setIsDragging(false);
    if (dragMovedRef.current) applyTarget(targetRef.current, true);
  }, [applyTarget]);

  const handleItemClick = useCallback((index: number) => {
    if (dragMovedRef.current) return;
    const currentConfig = configRef.current;
    const current = targetRef.current;
    let distance = index - (((current % currentConfig.count) + currentConfig.count) % currentConfig.count);
    if (currentConfig.loop && currentConfig.count > 1) {
      if (distance > currentConfig.count / 2) distance -= currentConfig.count;
      else if (distance < -currentConfig.count / 2) distance += currentConfig.count;
    }
    applyTarget(current + distance, true);
  }, [applyTarget]);

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    const delta = event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : null;
    if (delta === null) return;
    event.preventDefault();
    applyTarget(Math.round(targetRef.current) + delta, true);
  }, [applyTarget]);

  useEffect(() => {
    applyTarget(targetRef.current, false);
  }, [applyTarget, items, fontSize, spacing, curve, tilt, blur, fade, minOpacity, side, loop, smoothing]);

  useEffect(() => () => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
  }, []);

  const style = {
    '--ow-text-color': textColor,
    '--ow-active-color': activeColor,
    '--ow-font-size': `${fontSize}rem`,
    '--ow-inset': `${inset}px`,
  } as CSSProperties;

  return (
    <div ref={rootRef} role="listbox" tabIndex={0} aria-label="Option wheel" className={`option-wheel${side === 'right' ? ' option-wheel--right' : ''}${isDragging ? ' option-wheel--dragging' : ''}${className ? ` ${className}` : ''}`} style={style} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerEnd} onPointerCancel={handlePointerEnd} onKeyDown={handleKeyDown}>
      {items.map((label, index) => <div key={`${label}-${index}`} ref={(element) => { itemRefs.current[index] = element; }} role="option" aria-selected={selectedIndex === index} className={`option-wheel__item${selectedIndex === index ? ' option-wheel__item--selected' : ''}`} onClick={() => handleItemClick(index)}>{label}</div>)}
    </div>
  );
}
