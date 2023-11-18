// SideToolbar.tsx
import React from 'react';
import styles from './SideToolbar.module.css';
import scrapeIcon from '../../assets/icons/scrapeicon.png';
import futureToolIcon from '../../assets/icons/future_tool_icon.png';
import Tooltip from '../Tooltip/Tooltip';

interface SideToolbarProps {
  onScrapeAndToggle: () => void;
  onGoToFutureTools: () => void;
}

const SideToolbar: React.FC<SideToolbarProps> = ({ onScrapeAndToggle, onGoToFutureTools  }) => {
  return (
    <div className={styles.sideToolbar}>
      <button onClick={onScrapeAndToggle}>
        <Tooltip text="Get ILM Info">
          <img src={scrapeIcon} alt="Get ILM Info" className={styles.icon} />
        </Tooltip>
      </button>
      <button onClick={onGoToFutureTools}>
        <Tooltip text="Future Tools">
          <img src={futureToolIcon} alt="Future Tools" className={styles.icon} />
        </Tooltip>
      </button>
    </div>
  );
}

export default SideToolbar;
