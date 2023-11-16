import React from 'react';
import styles from './Banner.module.css';
// import bannerImage from '../../assets/images/bannerImage.png'; 


const Banner: React.FC = () => {
  return (
    <div className={styles.banner}>
      <h1>Ella's Automation App</h1>
    </div>
  );
}

export default Banner;
