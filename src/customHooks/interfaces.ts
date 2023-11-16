// interfaces.ts
export interface FlightData {
    arrivals: Flight[];
    departures: Flight[];
  }
  
  // Original Flight interface
export interface Flight {
  flightNumber: string;
  origin: string;
  destination: string;
  scheduledTime: string;
  actualTime: string;
  status: string;
}

// New interface for transformed data
export interface TransformedFlight {
  flightNumber: string;
  location: string;
  scheduledTime: string;
  actualTime: string;
  status: string;
}