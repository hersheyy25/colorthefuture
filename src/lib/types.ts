export type Workshop = {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  image_url: string | null;
  capacity: number;
  price_note: string;
  category: string;
  created_at: string;
};

export type Registration = {
  id: string;
  workshop_id: string;
  name: string;
  email: string;
  phone: string | null;
  attendees: number;
  created_at: string;
};

export type Volunteer = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  interests: string | null;
  message: string | null;
  created_at: string;
};

export type Newsletter = {
  id: string;
  email: string;
  created_at: string;
};
