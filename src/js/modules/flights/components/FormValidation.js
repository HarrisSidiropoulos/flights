import getAirportCodes from '../../../api-client/getAirportCodes'

const getCities = (values) => {
  const toCities = values.toCities.map((val,index)=>(
    {key: `toCity${index+1}`, value:values[`toCity${index+1}`]})
  )
  return toCities.concat([{key:'fromCity', value:values.fromCity}])
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
    if (value.length<3) {
      errors[key] = `Enter more than three characters`
    }
  })
  return errors
}

export const asyncValidate = values => {
  const cities = getCities(values)
  return Promise.all(cities.map(({value,key})=> {
    const error = {}
    error[key] = `${value} is not a city`
    return getAirportCodes(value)
      .then((response)=> {
        const filteredResponse =
          response.filter((item)=>item.city.indexOf(value)>=0)
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
