import React from 'react';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from './timer.module.css';

export enum TimerType {
  SECONDS = 'seconds',
  HOURS = 'hours',
  MINUTES = 'minutes',
  DAYS = 'days',
}

const TimerAppearance: Record<TimerType, { maxValue: number; pathColor: string;}> = {
  [TimerType.SECONDS]: {
    maxValue: 60,
    pathColor: '#51ACD8'
  },
  [TimerType.MINUTES]: {
    maxValue: 60,
    pathColor: '#FDAE47'
  },
  [TimerType.HOURS]: {
    maxValue: 24,
    pathColor: '#D62F0D'
  },
  [TimerType.DAYS]: {
    maxValue: 7,
    pathColor: '#0062B5'
  },
};

type TimerProps = {
  type: TimerType;
  value: number;
  description: string;
};

export const Timer: React.FC<TimerProps> = (props) => {
  let daysValue;

  if (props.type === TimerType.DAYS && props.value > TimerAppearance[TimerType.DAYS].maxValue){
    daysValue = props.value % TimerAppearance[TimerType.DAYS].maxValue;
    console.log('maxDaysValue', daysValue);
  }
  return (
    <CircularProgressbarWithChildren
      className={styles.progressBar}
      maxValue={TimerAppearance[props.type].maxValue}
      value={daysValue || props.value}
      counterClockwise={true}
      styles={buildStyles({
        textColor: 'white',
        pathColor: TimerAppearance[props.type].pathColor,
      })}
    >
      <div className={styles.timerBlock}>
        <div className={styles.timerHeader}>{daysValue || props.value}</div>
        <div className={styles.timerDescription}>{props.description}</div>
      </div>
    </CircularProgressbarWithChildren>
  );
};
