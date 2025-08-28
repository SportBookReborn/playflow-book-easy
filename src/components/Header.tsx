import { Link } from 'react-router-dom';
import { Calendar, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 bg-gradient-sport rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <span className="bg-gradient-sport bg-clip-text text-transparent">
            BookaPlay
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            Facilities
          </Link>
          <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
            My Bookings
          </Link>
          <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
            Help
          </Link>
        </nav>
        
        <div className="flex items-center gap-3">
          <Button variant="sport-outline" size="sm" className="hidden sm:flex">
            Sign In
          </Button>
          <Button variant="hero" size="sm">
            List Your Facility
          </Button>
          <button className="md:hidden p-2">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}