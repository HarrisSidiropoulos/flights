import getAirportCodes from './getAirportCodes';
import getWeatherAndFlight from './getWeatherAndFlight';

export const getWeatherAndFlights = (fromCity, toCities, startDate, endDate) => {
  return getAirportCodes(fromCity)
    .then(([{ airport, },]) => {
      return Promise.all(
        toCities.map(toCity => {
          return getWeatherAndFlight(airport, toCity, startDate, endDate);
        })
      );
    })
    .then(values => {
      return values;
    });
};
export default getWeatherAndFlights;
