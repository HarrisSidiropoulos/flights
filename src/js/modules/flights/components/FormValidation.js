import getAirportCodes from '../../../api-client/getAirportCodes'

export const getToCities = values => {
  return values.toCities.map((val,index) => (
    {key: `toCity${index + 1}`, value:values[`toCity${index + 1}`]})
  )
}

export const getCities = values => {
  return getToCities(values).concat([{key:'fromCity', value:values.fromCity}])
}

export const validate = values => {
  const errors = {}
  for (const key in values) {
    if (values[key] === '') {
      errors[key] = 'Field is required'
    }
  }
  const cities = getCities(values)
  cities.forEach(({value,key}) => {
    if (value.length <= 2) {
      errors[key] = 'Enter more than two characters'
    }
  })
  getToCities(values).forEach(({value,key}) => {
    if (value === values.fromCity) {
      errors[key] = 'The field \'To City\' must not be the same with field \'from City\''
    }
  })
  return errors
}

export const asyncValidate = values => {
  const cities = getCities(values)
  const error = {}
  return Promise.all(cities.map(({value,key}) => {
    if (!value) {
      return new Promise(resolve => resolve(true));
    }
    if (value.length < 3) {
      return new Promise((resolve,reject) => {
        error[key] = 'Enter more than two characters'
        reject(error)
      });
    }
    const value_lowercase = value.toLowerCase()
    const ERROR_MESSAGE = `${value_lowercase} is not a city`
    return getAirportCodes(value,10)
      .then(response => {
        const filteredResponse =
          response.filter(item => {
            return item.city.toLowerCase().indexOf(value_lowercase) >= 0 ||
                   item.airport.toLowerCase().indexOf(value_lowercase) >= 0
          })
        if (filteredResponse.length === 0) {
          error[key] = ERROR_MESSAGE
          throw error
        }
      }).catch(() => {
        error[key] = ERROR_MESSAGE
        throw error
      })
  }))
  .then(() => true)
}
