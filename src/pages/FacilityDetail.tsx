import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  Wifi, 
  Car,
  Shield,
  Phone,
  Mail,
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Header from '@/components/Header';
import BookingModal from '@/components/BookingModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockFacilities } from '@/data/mockFacilities';

export default function FacilityDetail() {
  const { id } = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  const facility = mockFacilities.find(f => f.id === id);
  
  if (!facility) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Facility not found</h1>
          <Link to="/" className="btn-hero inline-flex items-center gap-2 px-6 py-3">
            <ArrowLeft className="w-4 h-4" />
            Back to Facilities
          </Link>
        </div>
      </div>
    );
  }
  
  // Generate next 7 days for date selection
  const next7Days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    next7Days.push(date);
  }
  
  const availableSlots = facility.availability[selectedDate] || {};
  const timeSlots = Object.keys(availableSlots).sort();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Facilities
        </Link>
      </div>
      
      {/* Hero Image */}
      <div className="container mx-auto px-4 mb-8">
        <div className="relative rounded-xl overflow-hidden h-64 md:h-96">
          <img
            src={facility.images[0]}
            alt={facility.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <Badge className="bg-white/20 text-white mb-2">{facility.sport}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{facility.name}</h1>
            <div className="flex items-center gap-4 text-white/90">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{facility.location.neighborhood}, {facility.location.city}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{facility.rating} ({facility.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About this facility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {facility.description}
                </p>
              </CardContent>
            </Card>
            
            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {facility.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      </div>
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Rules */}
            <Card>
              <CardHeader>
                <CardTitle>Facility Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {facility.rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Shield className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{facility.contact.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{facility.contact.email}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <span>{facility.location.address}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Book This Facility</span>
                  <span className="text-2xl font-bold text-primary">
                    KSh {facility.pricePerHour.toLocaleString()}
                    <span className="text-sm font-normal text-muted-foreground">/hour</span>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date Selection */}
                <div>
                  <label className="font-medium mb-3 block">Select Date</label>
                  <div className="grid grid-cols-7 gap-1">
                    {next7Days.map((date) => {
                      const dateStr = date.toISOString().split('T')[0];
                      const isSelected = selectedDate === dateStr;
                      const isToday = dateStr === new Date().toISOString().split('T')[0];
                      
                      return (
                        <button
                          key={dateStr}
                          onClick={() => {
                            setSelectedDate(dateStr);
                            setSelectedTime(null);
                          }}
                          className={`p-2 text-xs rounded-lg border transition-all ${
                            isSelected
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'border-border hover:border-primary hover:bg-primary/5'
                          }`}
                        >
                          <div className="font-medium">
                            {date.toLocaleDateString('en-US', { weekday: 'short' })}
                          </div>
                          <div className={isToday ? 'font-bold' : ''}>
                            {date.getDate()}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                {/* Time Selection */}
                <div>
                  <label className="font-medium mb-3 block">Available Times</label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {timeSlots.map((time) => {
                      const isAvailable = availableSlots[time] === 'available';
                      const isSelected = selectedTime === time;
                      
                      return (
                        <button
                          key={time}
                          onClick={() => isAvailable ? setSelectedTime(time) : null}
                          disabled={!isAvailable}
                          className={`p-2 text-sm rounded-lg border transition-all ${
                            isSelected
                              ? 'bg-primary text-primary-foreground border-primary'
                              : isAvailable
                              ? 'border-border hover:border-primary hover:bg-primary/5'
                              : 'border-border bg-muted text-muted-foreground cursor-not-allowed'
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                {/* Book Button */}
                <Button
                  onClick={() => setShowBookingModal(true)}
                  disabled={!selectedTime}
                  variant="hero"
                  size="lg"
                  className="w-full"
                >
                  {selectedTime ? `Book ${selectedTime}` : 'Select a time slot'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Booking Modal */}
      {showBookingModal && selectedTime && (
        <BookingModal
          facility={facility}
          date={selectedDate}
          time={selectedTime}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
}