import { Facility } from '@/types/facility';
import basketballImage from '@/assets/basketball-court.jpg';
import footballImage from '@/assets/football-field.jpg';
import tennisImage from '@/assets/tennis-court.jpg';
import gymImage from '@/assets/gym-interior.jpg';

// Generate mock availability for the next 7 days
const generateAvailability = () => {
  const availability: { [date: string]: { [hour: string]: 'available' | 'booked' } } = {};
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    
    availability[dateStr] = {};
    
    // Generate hourly slots from 8 AM to 10 PM
    for (let hour = 8; hour <= 22; hour++) {
      const timeStr = `${hour.toString().padStart(2, '0')}:00`;
      // Randomly mark some slots as booked (30% chance)
      availability[dateStr][timeStr] = Math.random() < 0.3 ? 'booked' : 'available';
    }
  }
  
  return availability;
};

export const mockFacilities: Facility[] = [
  {
    id: '1',
    name: 'Elite Basketball Arena',
    sport: 'Basketball',
    location: {
      city: 'Nairobi',
      neighborhood: 'Westlands',
      address: '123 Sports Avenue, Westlands, Nairobi'
    },
    images: [basketballImage],
    pricePerHour: 1500,
    rating: 4.8,
    reviewCount: 124,
    description: 'Professional indoor basketball court with premium hardwood flooring, perfect lighting, and modern facilities. Ideal for competitive games and training sessions.',
    rules: [
      'Clean sports shoes required',
      'Maximum 10 players per session',
      'No outside food or drinks',
      'Equipment can be rented separately'
    ],
    amenities: ['Changing rooms', 'Parking', 'Equipment rental', 'Water fountain', 'First aid'],
    contact: {
      email: 'info@elitebasketball.co.ke',
      phone: '+254 700 123 456'
    },
    availability: generateAvailability()
  },
  {
    id: '2',
    name: 'Premier Football Pitch',
    sport: 'Football',
    location: {
      city: 'Nairobi',
      neighborhood: 'Karen',
      address: '456 Stadium Road, Karen, Nairobi'
    },
    images: [footballImage],
    pricePerHour: 2000,
    rating: 4.9,
    reviewCount: 89,
    description: 'Full-size professional football pitch with natural grass, floodlights for evening games, and spectator seating. Perfect for team matches and tournaments.',
    rules: [
      'Football boots required',
      'Maximum 22 players per session',
      'No metal studs allowed',
      'Goals and balls provided'
    ],
    amenities: ['Floodlights', 'Spectator stands', 'Changing rooms', 'Parking', 'Refreshments'],
    contact: {
      email: 'bookings@premierpitch.co.ke',
      phone: '+254 700 789 012'
    },
    availability: generateAvailability()
  },
  {
    id: '3',
    name: 'Championship Tennis Court',
    sport: 'Tennis',
    location: {
      city: 'Nairobi',
      neighborhood: 'Kilimani',
      address: '789 Tennis Lane, Kilimani, Nairobi'
    },
    images: [tennisImage],
    pricePerHour: 1200,
    rating: 4.7,
    reviewCount: 156,
    description: 'Professional clay tennis court with regulation net height and professional-grade surface. Suitable for singles and doubles matches.',
    rules: [
      'Tennis shoes required',
      'Maximum 4 players for doubles',
      'Rackets available for rent',
      'Court must be swept after use'
    ],
    amenities: ['Equipment rental', 'Coaching available', 'Parking', 'Pro shop', 'Water station'],
    contact: {
      email: 'court@champtennis.co.ke',
      phone: '+254 700 345 678'
    },
    availability: generateAvailability()
  },
  {
    id: '4',
    name: 'PowerFit Gym Studio',
    sport: 'Fitness',
    location: {
      city: 'Nairobi',
      neighborhood: 'CBD',
      address: '321 Fitness Street, CBD, Nairobi'
    },
    images: [gymImage],
    pricePerHour: 800,
    rating: 4.6,
    reviewCount: 203,
    description: 'Modern fitness studio with state-of-the-art equipment, air conditioning, and professional-grade facilities. Perfect for personal training and group workouts.',
    rules: [
      'Athletic wear required',
      'Towel mandatory',
      'No outside weights',
      'Clean equipment after use'
    ],
    amenities: ['AC', 'Sound system', 'Mirrors', 'Equipment included', 'Lockers', 'Shower facilities'],
    contact: {
      email: 'studio@powerfit.co.ke',
      phone: '+254 700 901 234'
    },
    availability: generateAvailability()
  }
];