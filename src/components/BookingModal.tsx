import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, CreditCard, Smartphone, Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Facility, BookingFormData } from '@/types/facility';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

interface BookingModalProps {
  facility: Facility;
  date: string;
  time: string;
  onClose: () => void;
}

export default function BookingModal({ facility, date, time, onClose }: BookingModalProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    playerCount: 1,
    specialRequests: '',
    paymentMethod: 'mpesa'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalAmount = facility.pricePerHour;
  const bookingDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleInputChange = (field: keyof BookingFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create booking ID
      const bookingId = `BK${Date.now().toString().slice(-6)}`;
      
      // Store booking in sessionStorage for demo
      const booking = {
        id: bookingId,
        facilityId: facility.id,
        facilityName: facility.name,
        date,
        time,
        duration: 1,
        customerInfo: formData,
        totalAmount,
        status: 'confirmed',
        paymentMethod: formData.paymentMethod,
        bookingId,
        createdAt: new Date().toISOString()
      };
      
      sessionStorage.setItem('lastBooking', JSON.stringify(booking));
      
      toast({
        title: "Booking Confirmed!",
        description: `Your booking for ${time} on ${bookingDate} has been confirmed.`
      });
      
      navigate('/booking-success');
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Complete Your Booking</DialogTitle>
        </DialogHeader>
        
        {/* Booking Summary */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{facility.name}</h3>
            <span className="text-sm text-muted-foreground">{facility.sport}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>{bookingDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>{time} (1 hour)</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>{facility.location.neighborhood}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-primary">
                KSh {totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+254 700 000 000"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="players">Number of Players</Label>
                <Input
                  id="players"
                  type="number"
                  min="1"
                  max="50"
                  value={formData.playerCount}
                  onChange={(e) => handleInputChange('playerCount', parseInt(e.target.value) || 1)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="requests">Special Requests (Optional)</Label>
              <Textarea
                id="requests"
                value={formData.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                placeholder="Any special requirements or requests..."
                rows={3}
              />
            </div>
          </div>
          
          <Separator />
          
          {/* Payment Method */}
          <div className="space-y-4">
            <h3 className="font-semibold">Payment Method</h3>
            
            <RadioGroup
              value={formData.paymentMethod}
              onValueChange={(value) => handleInputChange('paymentMethod', value)}
            >
              <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="mpesa" id="mpesa" />
                <Label htmlFor="mpesa" className="flex items-center gap-3 cursor-pointer flex-1">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Smartphone className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">M-Pesa</div>
                    <div className="text-sm text-muted-foreground">Pay with mobile money</div>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">Credit/Debit Card</div>
                    <div className="text-sm text-muted-foreground">Pay with Visa, Mastercard</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <Separator />
          
          {/* Total and Actions */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total Amount</span>
              <span className="text-primary">KSh {totalAmount.toLocaleString()}</span>
            </div>
            
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 btn-hero"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : `Pay KSh ${totalAmount.toLocaleString()}`}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}