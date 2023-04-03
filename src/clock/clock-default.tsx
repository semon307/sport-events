import React from 'react';
import styles from './clock-default.module.css';

type ClockDefaultProps = {
  time: string;
  monthDay: string;
  weekDay: string;
};

export const ClockDefault: React.FC<ClockDefaultProps> = (props) => {
  return (
    <div>
      <div className={styles.timeBlock}>
        <div className={styles.time}>{props.time}</div>
      </div>
      <div className={styles.dateBlock}>
        <div className={styles.date}>{props.monthDay}</div>
        <div className={styles.date}>{props.weekDay}</div>
      </div>
    </div>
  );
};
