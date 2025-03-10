import { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"
const iconUrl = "https://openweathermap.org/img/wn/"

const api_key = import.meta.env.VITE_WEATHER_API_KEY;

const fetchWeather = (city, apiKey) => {
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
  const url = `${baseUrl}?q=${city}&appid=${apiKey}&units=metric`;

  return axios
    .get(url)
    .then(response => response.data)
    .catch(err => console.log(`Error getting weather data: ${err.code}`));
}

const Country = ({ country, single }) => {
  const [show, setShow] = useState(false);
  const [weather, setWeather] = useState(null);
  const onShowClick = (value) => {
    setShow(value);
  }
  if (!single && show === false) return (<p>{country.name.common} <button onClick={() => onShowClick(!show)}>show</button></p>);
  const imgStyle = {
    width: 200,
  };

  if (single) {
    fetchWeather(country.capital, api_key)
      .then((response) => {
        setWeather(response);
      })
      .catch(err => { })
  };

  return <div>
    {!single ? <button onClick={() => onShowClick(!show)}>hide</button> : <></>}
    <h1>{country.name.common}</h1>
    <p>capital {country.capital}</p>
    <p>area {country.area}</p>
    <h2>Languages</h2>
    <ul>{Object.keys(country.languages).map(l => <li key={l}>{country.languages[l]}</li>)}</ul>
    <img style={imgStyle} src={country.flags.svg} alt={country.flags.alt} />
    {single && weather
      ? <>
      <p>Temperature: {weather.main.temp} Celcius</p>
      <img src={`${iconUrl}${weather.weather[0].icon}@2x.png`}/>
      <p>Wind: {weather.wind.speed} m/s</p>
      </>
      : null}
  </div>
}

const Countries = ({ countries }) => {
  if (!countries) return null
  else if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  else if (countries.length === 1) {
    return <Country key={countries[0].name.common} country={countries[0]} single={true} />
  }
  else {
    return countries.map(c => { return (<Country key={c.name.common} country={c} single={false} />) });
  }
}

function App() {
  const [countries, setCountries] = useState(null);
  const [allCountries, setAllCountries] = useState(null);
  const [country, setCountry] = useState('');

  const handleInputCountry = (event) => {
    event.preventDefault();
    const input = event.target.value;
    setCountry(input);

    const findCountries = allCountries.filter(val => val.name.common.toUpperCase().match(input.toUpperCase()));
    setCountries(findCountries);
  }

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => setAllCountries(response.data))
      .catch((err) => console.log(`Error getting data: ${err.code}`));

  }, []);
  if (!allCountries) return <p>Fetching countries...</p>;

  return (
    <>
      find countries
      <input onChange={handleInputCountry} value={country}></input>
      <Countries countries={countries} />
    </>
  )
}

export default App
