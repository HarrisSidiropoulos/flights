import getFlights from './flights'

describe('getFlights', () => {
  it('should return the correct airport name', () => {
    return getFlights('SKG', "ATH")
      .then(({toAirport}) => {
        expect(toAirport).toBe('Athens Eleftherios Venizelos')
      });
  })
})
