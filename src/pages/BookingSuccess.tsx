import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, MapPin, Download, Share2, Home } from 'lucide-react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Booking } from '@/types/facility';

export default function BookingSuccess() {
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    // Retrieve booking from sessionStorage
    const bookingData = sessionStorage.getItem('lastBooking');
    if (bookingData) {
      setBooking(JSON.parse(bookingData));
    }
  }, []);

  if (!booking) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">No booking found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find your booking details. Please try booking again.
          </p>
          <Link to="/" className="btn-hero inline-flex items-center gap-2 px-6 py-3">
            <Home className="w-4 h-4" />
            Back to Facilities
          </Link>
        </div>
      </div>
    );
  }

  const bookingDate = new Date(booking.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const generateQRCode = () => {
    // Generate a simple text-based QR code representation
    return `QR:${booking.bookingId}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">Booking Confirmed!</h1>
          <p className="text-lg text-muted-foreground">
            Your sports facility has been successfully booked
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Booking Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Booking Details</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Confirmed
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Booking ID */}
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">Booking ID</span>
                <span className="font-mono text-primary font-bold">#{booking.bookingId}</span>
              </div>

              {/* Facility Info */}
              <div>
                <h3 className="font-semibold text-lg mb-2">{booking.facilityName}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{bookingDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{booking.time} (1 hour)</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Customer Info */}
              <div>
                <h4 className="font-medium mb-3">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Name:</span>
                    <div className="font-medium">{booking.customerInfo.name}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <div className="font-medium">{booking.customerInfo.email}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Phone:</span>
                    <div className="font-medium">{booking.customerInfo.phone}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Players:</span>
                    <div className="font-medium">{booking.customerInfo.playerCount}</div>
                  </div>
                </div>
                
                {booking.customerInfo.specialRequests && (
                  <div className="mt-3">
                    <span className="text-muted-foreground">Special Requests:</span>
                    <div className="mt-1 text-sm bg-muted/50 p-3 rounded-lg">
                      {booking.customerInfo.specialRequests}
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* Payment Info */}
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-muted-foreground">Payment Method:</span>
                  <div className="font-medium capitalize">{booking.paymentMethod}</div>
                </div>
                <div className="text-right">
                  <span className="text-muted-foreground">Total Paid:</span>
                  <div className="text-xl font-bold text-primary">
                    KSh {booking.totalAmount.toLocaleString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* QR Code Card */}
          <Card>
            <CardHeader>
              <CardTitle>Entry QR Code</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="w-32 h-32 bg-muted border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="text-xs font-mono break-all p-2">
                  {generateQRCode()}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Show this QR code at the facility for entry
              </p>
            </CardContent>
          </Card>

          {/* Important Information */}
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-amber-800 mb-2">Important Information</h3>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• Please arrive 10 minutes before your scheduled time</li>
                <li>• Bring valid ID and show your booking confirmation</li>
                <li>• Follow all facility rules and guidelines</li>
                <li>• Contact the facility directly for any changes or cancellations</li>
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="flex-1 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Receipt
            </Button>
            <Button variant="outline" className="flex-1 flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share Booking
            </Button>
            <Link to="/" className="flex-1">
              <Button className="w-full btn-hero flex items-center gap-2">
                <Home className="w-4 h-4" />
                Book Another Facility
              </Button>
            </Link>
          </div>

          {/* Contact Support */}
          <div className="text-center pt-4">
            <p className="text-sm text-muted-foreground">
              Need help with your booking?{' '}
              <a href="mailto:support@sportbook.co.ke" className="text-primary hover:underline">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}