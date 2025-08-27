import { useState } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import FacilityCard from '@/components/FacilityCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockFacilities } from '@/data/mockFacilities';

const sportTypes = ['All', 'Basketball', 'Football', 'Tennis', 'Fitness'];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('All');
  
  const filteredFacilities = mockFacilities.filter(facility => {
    const matchesSearch = facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         facility.location.neighborhood.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = selectedSport === 'All' || facility.sport === selectedSport;
    return matchesSearch && matchesSport;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Book Your Perfect
            <br />
            <span className="text-accent">Sports Venue</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover and book premium sports facilities across Nairobi. From basketball courts to football pitches - find your game today.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
              <Input
                placeholder="Search facilities or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-transparent border-none text-white placeholder:text-white/70 focus-visible:ring-white/30"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
              <Input
                placeholder="Nairobi, Kenya"
                disabled
                className="pl-10 bg-transparent border-none text-white placeholder:text-white/70"
              />
            </div>
            <Button className="bg-accent hover:bg-accent/90 px-8" size="lg">
              Search
            </Button>
          </div>
        </div>
      </section>
      
      {/* Filters and Results */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          {/* Sport Type Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium">Filter by sport:</span>
            </div>
            {sportTypes.map((sport) => (
              <Badge
                key={sport}
                variant={selectedSport === sport ? "default" : "outline"}
                className={`cursor-pointer transition-all ${
                  selectedSport === sport 
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                    : 'hover:bg-muted'
                }`}
                onClick={() => setSelectedSport(sport)}
              >
                {sport}
              </Badge>
            ))}
          </div>
          
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredFacilities.length} facilities
              {selectedSport !== 'All' && ` for ${selectedSport}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>
          
          {/* Facility Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFacilities.map((facility) => (
              <FacilityCard key={facility.id} facility={facility} />
            ))}
          </div>
          
          {filteredFacilities.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No facilities found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSport('All');
                }}
                variant="outline"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}