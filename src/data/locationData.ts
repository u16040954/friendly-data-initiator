
export interface Location {
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  days: string[];
}

export interface DailyLocations {
  day: string;
  color: string;
  locations: string[];
}

// Color scheme for days of the week
export const dayColors = {
  Monday: "#8B5CF6", // Vivid Purple
  Tuesday: "#D946EF", // Magenta Pink
  Wednesday: "#0EA5E9", // Ocean Blue
  Thursday: "#F97316", // Bright Orange
  Friday: "#10B981", // Green
  All: "#6B7280" // Gray for "All days" view
};

// Daily locations from the spreadsheet
export const dailyLocations: DailyLocations[] = [
  {
    day: "Monday",
    color: dayColors.Monday,
    locations: [
      "Bellville", "Durbanville", "Century City", "Canal Walk", "Edgemead", 
      "Montague Gardens", "Tygervalley", "Bothasig", "Parow", "Goodwood", 
      "N1 City", "Belhar", "Eerste Rivier", "Delft", "Kuilsrivier", 
      "Brackenfell", "Kraaifontein", "Pinehurst", "Glen Garry", "Plattekloof", 
      "Panorama", "Welgemoed", "Monte Vista"
    ]
  },
  {
    day: "Tuesday",
    color: dayColors.Tuesday,
    locations: [
      "Bergvliet", "Tokai", "Meadowridge", "Constantia", "Plumstead", 
      "Kenilworth", "Newlands", "Rondebosch", "Wynberg", "Claremont", 
      "Strandfontein", "Mitchells Plain", "Athlone", "Wetton", "Ottery", 
      "Lansdowne", "Grassy Park", "Phillipi", "Langa", "Khayelitsha", 
      "Gugulethu", "Airport city", "Gordons Bay", "Somerset West", "Helderberg", 
      "Strand", "Parklands", "Table View", "Table Bay", "Big Bay"
    ]
  },
  {
    day: "Wednesday",
    color: dayColors.Wednesday,
    locations: [
      "Muizenberg", "Lakeside", "Fish Hoek", "Simonstown", "Noordhoek", 
      "Glencairn", "Kommetjie", "Ocean view", "Retreat", "Cape Town CBD", 
      "Waterfront", "Camps Bay", "Green Point", "Sea Point", "Hout Bay", 
      "Pinelands", "Maitland", "Epping", "Woodstock", "Observatory", 
      "Melkbos", "Langebaan", "Veldrif", "Yzerfontein", "St Helena Bay", 
      "Malmesbury", "Atlantis", "Riebeek West", "Ceres", "Tulbagh", 
      "Porterville", "Wolseley"
    ]
  },
  {
    day: "Thursday",
    color: dayColors.Thursday,
    locations: [
      "Strandfontein", "Mitchells Plain", "Athlone", "Wetton", "Ottery", 
      "Lansdowne", "Grassy Park", "Phillipi", "Langa", "Khayelitsha", 
      "Gugulethu", "Airport city", "Gordons Bay", "Somerset West", "Helderberg", 
      "Strand", "Worcester", "De Doorns", "Touwsrivier"
    ]
  },
  {
    day: "Friday",
    color: dayColors.Friday,
    locations: [
      "Bergvliet", "Tokai", "Meadowridge", "Constantia", "Plumstead", 
      "Kenilworth", "Newlands", "Rondebosch", "Wynberg", "Claremont", 
      "Cape Town CBD", "Waterfront", "Camps Bay", "Green Point", "Sea Point", 
      "Hout Bay", "Pinelands", "Maitland", "Epping", "Woodstock", "Observatory", 
      "Muizenberg", "Lakeside", "Fish Hoek", "Simonstown", "Noordhoek", 
      "Glencairn", "Kommetjie", "Ocean view", "Retreat", "Paarl", 
      "Wellington", "Stellenbosch", "Franschhoek"
    ]
  }
];

// South African cities with their coordinates
// Note: These are approximated coordinates and should be replaced with accurate ones
export const locationCoordinates: { [key: string]: [number, number] } = {
  "Bellville": [18.6321, -33.8896],
  "Durbanville": [18.6585, -33.8308],
  "Century City": [18.5097, -33.8913],
  "Canal Walk": [18.5153, -33.8913],
  "Edgemead": [18.5581, -33.8665],
  "Montague Gardens": [18.5217, -33.8665],
  "Tygervalley": [18.6348, -33.8703],
  "Bothasig": [18.5386, -33.8581],
  "Parow": [18.5997, -33.9043],
  "Goodwood": [18.5553, -33.9043],
  "N1 City": [18.5469, -33.9043],
  "Belhar": [18.6379, -33.9333],
  "Eerste Rivier": [18.7249, -33.9435],
  "Delft": [18.6489, -33.9833],
  "Kuilsrivier": [18.6989, -33.9333],
  "Brackenfell": [18.7009, -33.8759],
  "Kraaifontein": [18.7209, -33.8458],
  "Pinehurst": [18.6818, -33.8551],
  "Glen Garry": [18.7121, -33.8649],
  "Plattekloof": [18.5636, -33.8582],
  "Panorama": [18.5775, -33.8549],
  "Welgemoed": [18.6071, -33.8582],
  "Monte Vista": [18.5553, -33.8663],
  "Bergvliet": [18.4636, -34.0495],
  "Tokai": [18.4396, -34.0583],
  "Meadowridge": [18.4636, -34.0339],
  "Constantia": [18.4213, -34.0251],
  "Plumstead": [18.4755, -34.0090],
  "Kenilworth": [18.4793, -33.9958],
  "Newlands": [18.4473, -33.9796],
  "Rondebosch": [18.4695, -33.9634],
  "Wynberg": [18.4695, -34.0026],
  "Claremont": [18.4695, -33.9869],
  "Strandfontein": [18.5747, -34.0786],
  "Mitchells Plain": [18.6186, -34.0475],
  "Athlone": [18.5056, -33.9634],
  "Wetton": [18.4975, -34.0090],
  "Ottery": [18.5056, -34.0153],
  "Lansdowne": [18.5056, -33.9958],
  "Grassy Park": [18.5217, -34.0339],
  "Phillipi": [18.5462, -34.0130],
  "Langa": [18.5298, -33.9477],
  "Khayelitsha": [18.6731, -34.0475],
  "Gugulethu": [18.5701, -33.9760],
  "Airport city": [18.5824, -33.9724],
  "Gordons Bay": [18.8600, -34.1637],
  "Somerset West": [18.8431, -34.0751],
  "Helderberg": [18.8512, -34.0854],
  "Strand": [18.8186, -34.1170],
  "Parklands": [18.4843, -33.8266],
  "Table View": [18.4843, -33.8164],
  "Table Bay": [18.4193, -33.8266],
  "Big Bay": [18.4433, -33.7959],
  "Muizenberg": [18.4776, -34.1083],
  "Lakeside": [18.4712, -34.0877],
  "Fish Hoek": [18.4331, -34.1363],
  "Simonstown": [18.4353, -34.1929],
  "Noordhoek": [18.3894, -34.1057],
  "Glencairn": [18.4255, -34.1637],
  "Kommetjie": [18.3273, -34.1363],
  "Ocean view": [18.3573, -34.1456],
  "Retreat": [18.4809, -34.0542],
  "Cape Town CBD": [18.4241, -33.9249],
  "Waterfront": [18.4157, -33.9033],
  "Camps Bay": [18.3764, -33.9532],
  "Green Point": [18.4073, -33.9033],
  "Sea Point": [18.3893, -33.9100],
  "Hout Bay": [18.3473, -34.0308],
  "Pinelands": [18.5136, -33.9296],
  "Maitland": [18.4978, -33.9237],
  "Epping": [18.5379, -33.9317],
  "Woodstock": [18.4497, -33.9305],
  "Observatory": [18.4713, -33.9372],
  "Melkbos": [18.4395, -33.7275],
  "Langebaan": [18.0322, -33.0916],
  "Veldrif": [18.1563, -32.7767],
  "Yzerfontein": [18.1493, -33.3414],
  "St Helena Bay": [18.0156, -32.7547],
  "Malmesbury": [18.7275, -33.4542],
  "Atlantis": [18.4839, -33.6063],
  "Riebeek West": [18.8723, -33.3589],
  "Ceres": [19.3129, -33.3708],
  "Tulbagh": [19.1392, -33.2843],
  "Porterville": [18.9958, -33.0140],
  "Wolseley": [19.2077, -33.4150],
  "Worcester": [19.4458, -33.6464],
  "De Doorns": [19.6655, -33.4728],
  "Touwsrivier": [20.0323, -33.3339],
  "Paarl": [18.9706, -33.7274],
  "Wellington": [18.9845, -33.6421],
  "Stellenbosch": [18.8601, -33.9321],
  "Franschhoek": [19.1211, -33.9100],
};

// Get all locations as an array of Location objects
export const getAllLocations = (): Location[] => {
  return Object.entries(locationCoordinates).map(([name, coordinates]) => {
    const days = dailyLocations
      .filter(day => day.locations.includes(name))
      .map(day => day.day);
    
    return {
      name,
      coordinates,
      days
    };
  });
};

// Get locations for a specific day
export const getLocationsByDay = (day: string): Location[] => {
  if (day === "All") {
    return getAllLocations();
  }
  
  const dayData = dailyLocations.find(d => d.day === day);
  if (!dayData) return [];
  
  return dayData.locations
    .filter(name => locationCoordinates[name])
    .map(name => ({
      name,
      coordinates: locationCoordinates[name],
      days: [day]
    }));
};
