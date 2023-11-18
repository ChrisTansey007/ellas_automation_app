// DisplayArea.tsx
import React from 'react';
import { Flight } from '../../customHooks/interfaces';
import styles from './DisplayArea.module.css';

interface DisplayAreaProps {
  title: string;
  flights: Flight[];
}

const DisplayArea: React.FC<DisplayAreaProps> = ({ title, flights }) => {
  const hasFlights = flights.length > 0;

  console.log("flights", flights)

  return (
    <div className={styles.displayArea}>
      <h2>{title}</h2>
      <div className={styles.box}>
        {hasFlights && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Flight</th>
                <th>{title === "Arrivals" ? "From" : "Destination"}</th>
                <th>Scheduled</th>
                <th>Actual</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {flights.slice(1).map((flight, index) => (
                <tr key={index}>
                  <td>{flight.flightNumber}</td>
                  <td>{title === "Arrivals" ? flight.origin : flight.destination}</td>
                  <td>{flight.scheduledTime}</td>
                  <td>{flight.actualTime}</td>
                  <td>{flight.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DisplayArea;
