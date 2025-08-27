export interface Facility {
  id: string;
  name: string;
  sport: string;
  location: {
    city: string;
    neighborhood: string;
    address: string;
  };
  images: string[];
  pricePerHour: number;
  rating: number;
  reviewCount: number;
  description: string;
  rules: string[];
  amenities: string[];
  contact: {
    email: string;
    phone: string;
  };
  availability: {
    [date: string]: {
      [hour: string]: 'available' | 'booked';
    };
  };
}

export interface Booking {
  id: string;
  facilityId: string;
  facilityName: string;
  date: string;
  time: string;
  duration: number; // in hours
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    playerCount: number;
    specialRequests?: string;
  };
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentMethod: 'mpesa' | 'card';
  bookingId: string;
  createdAt: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  playerCount: number;
  specialRequests?: string;
  paymentMethod: 'mpesa' | 'card';
}