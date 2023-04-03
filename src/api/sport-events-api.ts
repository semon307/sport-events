import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://beta.sosportom.ru/graphql/',
});

const mockBody = {
  query: 'query videostandEvents ($videostand_id: ID!) { videostandEvents(videostand_id: $videostand_id) { current_and_upcoming { title, is_main, dt_start, dt_end, dt_create }, finished { title, is_main, dt_start, dt_end, dt_create } } }',
  variables: { videostand_id: '6' }
};

export const sportEventsAPI = {
  getSportEvents() {
    return instance.post('', mockBody);
  },
};
