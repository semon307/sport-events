import { SportEventRaw } from '../types/SportEventRaw';
import { SportEvent } from '../types/SportEvent';

export const mapSportEvent = (sportEvent: SportEventRaw): SportEvent => ({
  ...sportEvent,
  dt_start: new Date(sportEvent.dt_start),
  dt_end: new Date(sportEvent.dt_end),
  dt_create: new Date(sportEvent.dt_create),
});
