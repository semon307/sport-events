import { Dispatch } from 'redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sportEventsAPI } from '../api/sport-events-api';
import { SportEvent } from './types/SportEvent';
import { mapSportEvent } from './utils/mapSportevent';

export type SportsEventsPageState = {
  current_and_upcoming: Array<SportEvent>;
};

const initialState: SportsEventsPageState = {
  current_and_upcoming: [
    // {
    //   title: 'Международный шахматный форум "Moscow Open" Международный шахматный форум',
    //   is_main: false,
    //   dt_start: new Date('2024-04-02T16:00:00+03:00'),
    //   dt_end: new Date ('2024-04-20T20:00:00+03:00'),
    //   dt_create: new Date ('2022-06-28T11:18:29+03:00')
    // },
    // {
    //   title: 'Test Event',
    //   is_main: false,
    //   dt_start: new Date('2024-04-26T16:00:00+03:00'),
    //   dt_end: new Date ('2024-04-28T20:00:00+03:00'),
    //   dt_create: new Date ('2022-06-28T11:18:29+03:00')
    // }
  ],

};
const slice = createSlice({
  name: 'sportEventsReducer',
  initialState: initialState,
  reducers: {
    setSportEventsAC(state, action: PayloadAction<Array<SportEvent>>) {
      state.current_and_upcoming = action.payload;
    }
  }
});

export const sportEventsReducer = slice.reducer;
export const setSportEventsAC = slice.actions.setSportEventsAC;


export const sportEventsTC = () => (dispatch: Dispatch) => {
  sportEventsAPI.getSportEvents()
    .then((res) => {
      const mappedSportEvents = res.data.data.videostandEvents.current_and_upcoming.map(mapSportEvent)
        .sort((a: SportEvent, b: SportEvent) => a.dt_start.getTime() - b.dt_start.getTime());
      dispatch(setSportEventsAC(mappedSportEvents));
    })
    .catch((error) => {
      dispatch({ type: 'sportEvents/error', payload: error.message });
    });
};
