// ContainerComponent.tsx
import React, { useEffect, useState } from 'react';
import { useFlightData } from '../../customHooks/useFlightData'; 
import { Flight } from '../../customHooks/interfaces'; 
import { convertDataToCSV, downloadCSV, getCurrentTimestamp } from '../../utilities/flightDataHelpers'; 
import styles from './ContainerComponent.module.css';
import SideToolbar from '../SideToolbar/SideToolbar';
import DisplayArea from '../DisplayArea/DisplayArea';
import Tooltip from '../Tooltip/Tooltip';
import tooltipStyles from '../Tooltip/Tooltip.module.css'; 
import downloadIcon from '../../assets/icons/downloadIcon.png';

const ContainerComponent: React.FC = () => {
  const { data, isLoading, error, refetch } = useFlightData();
  const [arrivalBox, setArrivalBox] = useState<Flight[]>([]);
  const [departureBox, setDepartureBox] = useState<Flight[]>([]);
  const [showFlightBoxes, setShowFlightBoxes] = useState(false);

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

  const handleScrapeAndToggle = () => {
    refetch();
    setShowFlightBoxes(!showFlightBoxes);
  };

  
  const toggleFlightBoxes = () => {
  setShowFlightBoxes(!showFlightBoxes);
  };

  const handleGoToFutureTools = () => {
    toggleFlightBoxes(); 
  };

  useEffect(() => {
    if (data) { 
        console.log("data.arrivals", data.arrivals)
        setArrivalBox(data.arrivals);
        setDepartureBox(data.departures);
    }
  }, [data]);
   

  return (
    <div className={styles.container}>
      <SideToolbar onScrapeAndToggle={handleScrapeAndToggle} onGoToFutureTools={handleGoToFutureTools}/>
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
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};

export default ContainerComponent;
