import React from 'react';
import styles from './widget.module.css';
import { Timer, TimerType } from './timer';
import { TimeDifferenceType } from '../common/utils/getDateDifference';

type WidgetProps = {
  timeDifference: TimeDifferenceType;
};

export const Widget: React.FC<WidgetProps> = (props) => {
  return (
    <div className={styles.widget}>
      <Timer type={TimerType.DAYS} value={props.timeDifference.days} description={'дней'}/>
      <Timer type={TimerType.HOURS} value={props.timeDifference.hours} description={'часов'}/>
      <Timer type={TimerType.MINUTES} value={props.timeDifference.minutes} description={'минут'}/>
      <Timer type={TimerType.SECONDS} value={props.timeDifference.seconds} description={'секунд'}/>
    </div>
  );
};
