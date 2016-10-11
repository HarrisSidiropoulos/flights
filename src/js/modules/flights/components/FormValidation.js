import getAirportCodes from '../../../api-client/getAirportCodes'

export const validate = values => {
  const errors = {}
  for (const key in values) {
    if (values[key]==="") {
      errors[key] = `Field is required`
    }
  }
  for (const key in values) {
    if (typeof key ==="string" && (/city/ig).test(key) && values[key].length<3) {
      errors[key] = `Enter more than three characters`
    }
  }
  return errors
}

export const asyncValidate = values => {
  const cities = []
  for (const key in values) {
    if (typeof key ==="string" && (/city/ig).test(key)) {
      cities.push({input:key, city:values[key]})
    }
  }
  return Promise.all(cities.map(({input,city})=> {
    const error = {}
    error[input] = `${city} is not a city`
    return getAirportCodes(city)
      .then((response)=> {
        const filteredResponse =
          response.filter((item)=>item.city.indexOf(city)>=0)
        if (filteredResponse.length===0) {
          throw error
        }
        return true
      })
      .catch(()=>{
        throw error
      })
  }))
  .then(()=>true)
}
