import { useState, useEffect } from 'react';
import useFetchData from '../customHooks/useFetchData';
import { FlightData, RawFlightData } from '../customHooks/interfaces';
import { transformFlightData } from '../utilities/flightDataHelpers';

type UseFlightDataReturnType = {
    data: FlightData | null;
    isLoading: boolean;
    error: Error | null;
    refetch: () => void;
};

function isRawFlightData(data: any): data is RawFlightData {
    return typeof data[0] === 'string' &&
           typeof data[1] === 'string' &&
           typeof data[2] === 'string' &&
           typeof data[3] === 'string' &&
           typeof data[4] === 'string';
}

function isArrayOfTypeRawFlightData(data: any[]): data is RawFlightData[] {
    return data.every(isRawFlightData);
}

export const useFlightData = (): UseFlightDataReturnType => {
    const [flightData, setFlightData] = useState<FlightData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const { data, refetch, loading, error: fetchDataError } = useFetchData('http://localhost:5000/scrape');

    useEffect(() => {
        setIsLoading(loading);
        if (fetchDataError) {
            setError(new Error(fetchDataError.toString()));
        }
    
        if (data) {
            // Validate the data before transformation
            if (isArrayOfTypeRawFlightData(data.arrivals) && isArrayOfTypeRawFlightData(data.departures)) {
                const transformedArrivals = transformFlightData(data.arrivals);
                const transformedDepartures = transformFlightData(data.departures);
    
                setFlightData({
                    arrivals: transformedArrivals,
                    departures: transformedDepartures
                });
            } else {
                // Handle the error scenario
                console.error("Data is not in the expected RawFlightData format");
            }
        }
    }, [data, loading, fetchDataError]);

    return { data: flightData, isLoading, error, refetch };
};
