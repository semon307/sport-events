import React from 'react';
import styles from './clock-common.module.css';

type ClockCommonProps = {
  time: string;
  monthDay: string;
  weekDay: string;
};

export const ClockCommon: React.FC<ClockCommonProps> = (props) => {
  return (
    <div>
      <div className={styles.timeBlock}>
        <div className={styles.time}>{props.time}</div>
        <span className={styles.date}>{props.monthDay} • {props.weekDay}</span>
      </div>
    </div>
  );
};
