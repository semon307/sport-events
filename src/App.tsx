import React, { useEffect, useState } from 'react';
import './app.module.css';
import { useSelector } from 'react-redux';
import { AppRootStateType, useTypedDispatch } from './redux/store';
import { sportEventsTC, SportsEventsPageState } from './redux/sport-events-reducer';
import styles from './app.module.css';
import { ClockDefault } from './clock/clock-default';
import { ClockCommon } from './clock/clock-common';
import { getDayMonthYearDate } from './common/utils/getDayMonthYearDate';
import 'react-circular-progressbar/dist/styles.css';
import { getMonthName } from './common/utils/getMonthDay';
import { getDateDiff, TimeDifferenceType } from './common/utils/getDateDifference';
import { Widget } from './widget/widget';
import { useEffectOnce } from './common/hooks/useEffectOnce';

const App = () => {
  const dispatch = useTypedDispatch();
  const sportsEventsPage = useSelector<AppRootStateType, SportsEventsPageState>((state) => state.sportEvents);

  const [isEventNow, setIsEventNow] = useState(false);
  const [clockTime, setClockTime] = useState('');
  const [clockWeekDay, setClockWeekDay] = useState('');
  const [clockMonthDay, setClockMonthDay] = useState('');
  const [timeDifference, setTimeDifference] = useState<TimeDifferenceType>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  //fetching data for first render
  useEffectOnce(() => {
      // dispatch(sportEventsTC());
  });

  // fetching data once in a minute for live updates
  useEffect(() => {
    const intervalId = setInterval(() => {
      // dispatch(sportEventsTC());
    }, 60000);

    return () => clearInterval(intervalId);

  }, []);

  // getting known if first event in the result array is current event
  useEffect(() => {
    setIsEventNow(new Date().getTime() > sportsEventsPage.current_and_upcoming[0]?.dt_start.getTime());
    console.log('isEventNow', isEventNow);
  }, [sportsEventsPage.current_and_upcoming]);

  //logic for timer and widget
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      if (sportsEventsPage.current_and_upcoming[0]?.dt_start) {
        setTimeDifference(getDateDiff(new Date(), sportsEventsPage.current_and_upcoming[0]?.dt_start));
      }
      setClockTime(`${hours}:${minutes}`);

      const weekday = now.toLocaleDateString('ru-RU', { weekday: 'long' });
      const month = getMonthName(now.getMonth());
      const day = now.getDate();
      setClockWeekDay(weekday);
      setClockMonthDay(`${day} ${month}`);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.appLayout}>
      {sportsEventsPage.current_and_upcoming.length
        ? (
          <div className={styles.eventLayout}>
            <ClockCommon time={clockTime} weekDay={clockWeekDay} monthDay={clockMonthDay}/>
            <div className={styles.event}>
              <div className={styles.dateAndTitleMain}>
                <span className={styles.eventStartDate}>
                  {getDayMonthYearDate(
                    sportsEventsPage.current_and_upcoming[0].dt_start,
                    sportsEventsPage.current_and_upcoming[0].dt_end,
                  )}
                </span>
                <div className={styles.eventTitle}>
                  {sportsEventsPage.current_and_upcoming[0].title}
                </div>
              </div>
              {isEventNow ? (
                  <div className={styles.eventNow}>ИДЁТ СЕЙЧАС</div>
                )
                : (
                  <Widget timeDifference={timeDifference}/>
                )
              }
            </div>
            {sportsEventsPage.current_and_upcoming[1] && (
              <div className={styles.dateAndTitleNextEvent}>
                <span className={styles.eventStartDate}>
                  {getDayMonthYearDate(
                    sportsEventsPage.current_and_upcoming?.[1]?.dt_start,
                    sportsEventsPage.current_and_upcoming?.[1]?.dt_end,
                  )}
                </span>
                <div className={styles.nextEventTitle}>
                  {sportsEventsPage.current_and_upcoming?.[1]?.title}
                </div>
              </div>)
            }
          </div>
        )
        : <ClockDefault time={clockTime} weekDay={clockWeekDay} monthDay={clockMonthDay}/>}
    </div>
  );
};

export default App;
