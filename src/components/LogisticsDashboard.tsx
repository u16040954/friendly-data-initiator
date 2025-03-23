
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import LogisticsMap from './LogisticsMap';
import { Button } from '@/components/ui/button';
import { dayColors, dailyLocations } from '@/data/locationData';
import { Separator } from '@/components/ui/separator';
import { MapPin } from 'lucide-react';

const LogisticsDashboard: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>("All");
  
  const formatCount = (day: string): number => {
    if (day === "All") {
      // Count unique cities across all days
      const allCities = new Set<string>();
      dailyLocations.forEach(dayData => {
        dayData.locations.forEach(location => {
          allCities.add(location);
        });
      });
      return allCities.size;
    }
    
    const dayData = dailyLocations.find(d => d.day === day);
    return dayData ? dayData.locations.length : 0;
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Logistics Coverage Dashboard</h1>
        <p className="text-muted-foreground">Visualize your truck routes by day of the week</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
        <Button
          key="All"
          variant={selectedDay === "All" ? "default" : "outline"}
          className="flex flex-col items-center justify-center h-auto py-3"
          onClick={() => setSelectedDay("All")}
          style={{ 
            backgroundColor: selectedDay === "All" ? dayColors.All : 'transparent',
            color: selectedDay === "All" ? 'white' : 'inherit',
            borderColor: dayColors.All
          }}
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dayColors.All }}></div>
            <span>All Days</span>
          </div>
          <span className="text-xs mt-1">{formatCount("All")} locations</span>
        </Button>
        
        {Object.entries(dayColors).filter(([day]) => day !== "All").map(([day, color]) => (
          <Button
            key={day}
            variant={selectedDay === day ? "default" : "outline"}
            className="flex flex-col items-center justify-center h-auto py-3"
            onClick={() => setSelectedDay(day)}
            style={{ 
              backgroundColor: selectedDay === day ? color : 'transparent',
              color: selectedDay === day ? 'white' : 'inherit',
              borderColor: color
            }}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
              <span>{day}</span>
            </div>
            <span className="text-xs mt-1">{formatCount(day)} locations</span>
          </Button>
        ))}
      </div>
      
      <LogisticsMap selectedDay={selectedDay} />
      
      {/* Map Legend Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Map Legend</CardTitle>
          <CardDescription>Color-coded locations by day of week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: dayColors.All }}></div>
              <span>Multiple Days</span>
            </div>
            {Object.entries(dayColors).filter(([day]) => day !== "All").map(([day, color]) => (
              <div key={day} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                <span>{day}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Day of Week Analysis</CardTitle>
          <CardDescription>View locations covered on each day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {dailyLocations.map((dayData) => (
              <div key={dayData.day} className="space-y-3">
                <div 
                  className="text-base font-semibold flex items-center gap-2" 
                  style={{ color: dayData.color }}
                >
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: dayData.color }}
                  ></div>
                  {dayData.day}
                  <span className="text-xs font-normal text-muted-foreground ml-auto">
                    {dayData.locations.length} locations
                  </span>
                </div>
                <Separator />
                <div className="space-y-1 text-sm overflow-auto max-h-96">
                  {dayData.locations.map((loc) => (
                    <div key={`${dayData.day}-${loc}`} className="flex items-center gap-2">
                      <MapPin size={12} />
                      <span>{loc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>About This Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This logistics dashboard visualizes your truck routes across South Africa, color-coded by day of the week. 
            Select a specific day to see which locations are serviced, or view all locations at once.
            Each marker on the map represents a location, and you can click on it to see more details.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogisticsDashboard;
