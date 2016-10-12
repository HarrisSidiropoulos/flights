import getAirportCodes from '../../../api-client/getAirportCodes'

const getToCities = (values) => {
  return values.toCities.map((val,index)=>(
    {key: `toCity${index+1}`, value:values[`toCity${index+1}`]})
  )
}

const getCities = (values) => {
  return getToCities(values).concat([{key:'fromCity', value:values.fromCity}])
}

export const validate = values => {
  const errors = {}
  for (const key in values) {
    if (values[key]==="") {
      errors[key] = `Field is required`
    }
  }
  const cities = getCities(values)
  cities.forEach(({value,key})=> {
    if (value.length<=2) {
      errors[key] = `Enter more than two characters`
    }
  })
  getToCities(values).forEach(({value,key})=> {
    if (value===values.fromCity) {
      errors[key] = `The field "To City" must not be the same with field "from City"`
    }
  })
  return errors
}

export const asyncValidate = values => {
  const cities = getCities(values)
  return Promise.all(cities.map(({value,key})=> {
    if (value.length<3) {
      return true
    }
    const error = {}
    error[key] = `${value} is not a city`
    const airportReg = (/\(.+\)/)
    if (airportReg.test(value)) {
      value = airportReg.exec(value)[0].replace(/[\(\)]/g,'')
    }
    value = value.toLowerCase()
    return getAirportCodes(value,10)
      .then((response)=> {
        const filteredResponse =
          response.filter((item)=> {
            return item.city.toLowerCase().indexOf(value)>=0 ||
                   item.airport.toLowerCase().indexOf(value)>=0
          })
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
