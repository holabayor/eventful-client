declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
}

export interface Event {
  _id: string;
  title: string;
  imageUrl: string;
  date: Date;
  time: string;
  startDate: string; // Consider using Date
  endDate: string; // Consider using Date
  startTime: string;
  endTime: string;
  location: string;
  creator: User;
  description: string;
  category: Category;
  attendees: string[];
  price: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  events: string[];
}

export interface Category {
  _id: string;
  name: string;
}
