import { Facility } from '@/types/facility';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FacilityCardProps {
  facility: Facility;
}

export default function FacilityCard({ facility }: FacilityCardProps) {
  return (
    <Link to={`/facility/${facility.id}`}>
      <Card className="card-facility group cursor-pointer">
        <div className="relative overflow-hidden">
          <img
            src={facility.images[0]}
            alt={facility.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-white/90 text-foreground">
              {facility.sport}
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1 bg-white/90 rounded-full px-2 py-1 text-xs font-medium">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{facility.rating}</span>
              <span className="text-muted-foreground">({facility.reviewCount})</span>
            </div>
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
            {facility.name}
          </h3>
          
          <div className="flex items-center text-muted-foreground text-sm mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{facility.location.neighborhood}, {facility.location.city}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-primary">
              KSh {facility.pricePerHour.toLocaleString()}<span className="text-sm font-normal text-muted-foreground">/hour</span>
            </div>
            <Button variant="sport-outline" size="sm">
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}