// ContainerComponent.tsx
import React, { useEffect, useState } from 'react';
import useFetchData from '../../customHooks/useFetchData';
import styles from './ContainerComponent.module.css';
import SideToolbar from '../SideToolbar/SideToolbar';
import DisplayArea from '../DisplayArea/DisplayArea';
import { FlightData, Flight } from '../../customHooks/interfaces'; 
import downloadIcon from '../../assets/icons/downloadIcon.png';
import Tooltip from '../Tooltip/Tooltip';
import tooltipStyles from '../Tooltip/Tooltip.module.css'; 

const ContainerComponent: React.FC = () => {
  const { data, refetch } = useFetchData<FlightData>('http://localhost:5000/scrape');
  const [arrivalBox, setArrivalBox] = useState<Flight[]>([]);
  const [departureBox, setDepartureBox] = useState<Flight[]>([]);
  const [showFlightBoxes, setShowFlightBoxes] = useState(false);

  const convertDataToCSV = (data) => {
    let csvContent = "Flight Number,Location,Scheduled Time,Actual Time,Status\n";
  
    data.forEach(flight => {
      let rowContent = `${flight.flightNumber},${flight.location},${flight.scheduledTime},${flight.actualTime},${flight.status}`;
      csvContent += rowContent + "\n";
    });
  
    return csvContent;
  };

  const downloadCSV = (csvContent, fileName) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
  
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const getCurrentTimestamp = () => {
    const now = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const suffixes = ["th", "st", "nd", "rd"];
  
    const month = months[now.getMonth()];
    const day = now.getDate();
    const year = now.getFullYear();
    const hour = now.getHours();
    const minute = now.getMinutes();
  
    const suffix = (day % 10) < 4 && Math.floor(day / 10) !== 1 ? suffixes[day % 10] : suffixes[0];
    const formattedHour = hour % 12 || 12; // Convert 24hr to 12hr format
    const formattedMinute = String(minute).padStart(2, '0');
    const amPm = hour < 12 ? 'a.m.' : 'p.m.';
  
    return `${month} ${day}${suffix}, ${year} : ${formattedHour}:${formattedMinute} ${amPm}`;
  };
  
  
const handleDownloadBoth = () => {
  refetch();
    if (data) {
      if (data.arrivals) {
        const arrivalsCSV = convertDataToCSV(data.arrivals);
        const arrivalsFileName = `arrivals_${getCurrentTimestamp()}.csv`;
        downloadCSV(arrivalsCSV, arrivalsFileName);
      }
      if (data.departures) {
        const departuresCSV = convertDataToCSV(data.departures);
        const departuresFileName = `departures_${getCurrentTimestamp()}.csv`;
        downloadCSV(departuresCSV, departuresFileName);
      }
    }
  };
  

  const transformFlightData = (flightArray: Flight[]): Flight[] => {
    return flightArray.map((flight: Flight)  => {
      return {
        flightNumber: flight[0],
        location: flight[1],
        scheduledTime: flight[2],
        actualTime: flight[3],
        status: flight[4]
      };
    });
  };

  const handleScrapeAndToggle = () => {
    refetch(); // This is your onScrape function
    toggleFlightBoxes(); // This toggles the flight box visibility
  };

  
  // Function to toggle the visibility of flight boxes
  const toggleFlightBoxes = () => {
    setShowFlightBoxes(!showFlightBoxes);
  };
const goToFutureTools = () => {
    toggleFlightBoxes(); // Hide the flight boxes
  };

  useEffect(() => {
    if (data) {
      setArrivalBox(transformFlightData(data.arrivals));
      setDepartureBox(transformFlightData(data.departures));
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <SideToolbar onScrapeAndToggle={handleScrapeAndToggle} ongoToFutureTools={goToFutureTools}/>
      {showFlightBoxes && (
        <>
          <DisplayArea title="Arrivals" flights={arrivalBox} />
          <DisplayArea title="Departures" flights={departureBox} />
          <Tooltip text="Download Data" additionalClass={tooltipStyles.downloadButtonTooltip}>        
            <button onClick={handleDownloadBoth} className={styles.downloadButton}>
              <img src={downloadIcon} alt="Download data" className={styles.icon} />
          </button>
          </Tooltip>
        </>
      )}
    </div>
  );
};

export default ContainerComponent;
