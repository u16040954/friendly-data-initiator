
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Location, getLocationsByDay, dayColors } from '@/data/locationData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface LogisticsMapProps {
  selectedDay: string;
  preConfiguredToken?: string;
}

const MAPBOX_TOKEN_KEY = 'logistics-mapbox-token';

const LogisticsMap: React.FC<LogisticsMapProps> = ({ selectedDay, preConfiguredToken }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState<boolean>(true);
  
  // Try to load token from localStorage on component mount
  useEffect(() => {
    const savedToken = localStorage.getItem(MAPBOX_TOKEN_KEY);
    if (savedToken) {
      setMapboxToken(savedToken);
      setShowTokenInput(false);
    } else if (preConfiguredToken) {
      setMapboxToken(preConfiguredToken);
      setShowTokenInput(false);
    }
  }, [preConfiguredToken]);
  
  const addMarkers = (locations: Location[]) => {
    if (!map.current) return;
    
    // Remove existing markers
    document.querySelectorAll('.mapboxgl-marker').forEach(el => {
      el.remove();
    });
    
    // Add new markers
    locations.forEach(location => {
      const color = location.days.length > 1 
        ? dayColors['All'] 
        : dayColors[location.days[0] as keyof typeof dayColors];
      
      const el = document.createElement('div');
      el.className = 'mapboxgl-marker';
      el.style.width = '14px';
      el.style.height = '14px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = color;
      el.style.border = '2px solid white';
      el.style.boxShadow = '0 0 4px rgba(0,0,0,0.5)';
      
      // Create popup
      const popup = new mapboxgl.Popup({ offset: 15 })
        .setHTML(`
          <div style="padding: 8px;">
            <strong style="font-size: 14px;">${location.name}</strong>
            <div style="font-size: 12px; margin-top: 4px;">Serviced on: ${location.days.join(', ')}</div>
          </div>
        `);
      
      new mapboxgl.Marker(el)
        .setLngLat(location.coordinates)
        .setPopup(popup)
        .addTo(map.current);
    });
  };
  
  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;
    
    try {
      // Initialize map
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [24.5, -29], // Center on South Africa
        zoom: 5,
      });
      
      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );
      
      map.current.on('load', () => {
        const locations = getLocationsByDay(selectedDay);
        addMarkers(locations);
      });
      
      // Save token to localStorage for future visits
      localStorage.setItem(MAPBOX_TOKEN_KEY, mapboxToken);
    } catch (error) {
      console.error('Map initialization error:', error);
      toast({
        title: "Map error",
        description: "There was an error initializing the map. Please check your Mapbox token.",
        variant: "destructive"
      });
      setShowTokenInput(true);
    }
  };
  
  useEffect(() => {
    if (mapboxToken && !map.current) {
      initializeMap();
    }
  }, [mapboxToken]);
  
  useEffect(() => {
    if (!map.current) return;
    
    const locations = getLocationsByDay(selectedDay);
    addMarkers(locations);
  }, [selectedDay]);
  
  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowTokenInput(false);
    initializeMap();
  };
  
  const handleChangeToken = () => {
    // Clear the current map
    if (map.current) {
      map.current.remove();
      map.current = null;
    }
    
    // Clear localStorage
    localStorage.removeItem(MAPBOX_TOKEN_KEY);
    
    // Show token input again
    setShowTokenInput(true);
  };

  return (
    <Card className="w-full h-[600px] mb-6">
      <CardContent className="p-0 relative h-full">
        {showTokenInput ? (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-background p-6">
            <form onSubmit={handleTokenSubmit} className="w-full max-w-md space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Enter your Mapbox Token</h3>
                <p className="text-sm text-muted-foreground">
                  To display the map, you need to provide your Mapbox public token.
                  Get one from <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>
                </p>
                <input
                  type="text"
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  placeholder="pk.eyJ1Ijoi..."
                  className="w-full p-2 border rounded-md"
                  required
                />
                <button 
                  type="submit" 
                  className="px-4 py-2 w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
                >
                  Load Map
                </button>
              </div>
            </form>
          </div>
        ) : null}
        <div ref={mapContainer} className="w-full h-full rounded-lg" />
        
        {/* Settings button to change token */}
        {!showTokenInput && mapboxToken && (
          <Button
            variant="outline"
            size="sm"
            className="absolute top-2 right-2 z-10 bg-background/80"
            onClick={handleChangeToken}
          >
            Change Map Token
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default LogisticsMap;
