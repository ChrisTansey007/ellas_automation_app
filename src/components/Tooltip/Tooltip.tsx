// Tooltip.tsx
import React, { useState, FC, ReactElement } from 'react';
import styles from './Tooltip.module.css'; // assuming you have this CSS file

interface TooltipProps {
  text: string;
  children: ReactElement; // Explicitly declare children prop
  additionalClass?: string;
}

const Tooltip: FC<TooltipProps> = ({ text, children, additionalClass  }) => {
  const [show, setShow] = useState(false);

  return (
    <div 
      onMouseEnter={() => setShow(true)} 
      onMouseLeave={() => setShow(false)} 
      className={styles.tooltipContainer}
    >
      {children}
      {show && (
        <div className={`${styles.tooltipText} ${additionalClass || ''}`}>
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
