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

// Assuming the raw data structure is similar for both arrivals and departures
export interface RawFlightData  {
  0: string; // Flight Number or 'Flight'
  1: string; // Origin/Destination or 'From'/'To'
  2: string; // Scheduled Time or 'Scheduled'
  3: string; // Actual Time or 'Actual'
  4: string; // Status or 'Remarks'
};