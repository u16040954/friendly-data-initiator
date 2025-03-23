
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Location, getLocationsByDay, dayColors } from '@/data/locationData';
import { Card, CardContent } from '@/components/ui/card';

interface LogisticsMapProps {
  selectedDay: string;
}

const LogisticsMap: React.FC<LogisticsMapProps> = ({ selectedDay }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState<boolean>(true);
  
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
      el.style.width = '12px';
      el.style.height = '12px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = color;
      el.style.border = '2px solid white';
      el.style.boxShadow = '0 0 2px rgba(0,0,0,0.3)';
      
      // Create popup
      const popup = new mapboxgl.Popup({ offset: 15 })
        .setHTML(`
          <div>
            <strong>${location.name}</strong>
            <div>Serviced on: ${location.days.join(', ')}</div>
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
    
    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [18.8601, -33.9321], // Centered on Stellenbosch
      zoom: 7.5,
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
      </CardContent>
    </Card>
  );
};

export default LogisticsMap;
