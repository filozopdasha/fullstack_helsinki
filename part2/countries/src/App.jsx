import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
    const api_key = import.meta.env.VITE_REACT_APP_API_KEY
    const [data, setData] = useState([])
    const [country, setCountry] = useState('')
    const [weather, setWeather] = useState([])

    const firstLetters = (name, term) => {
        return name.toLowerCase().startsWith(term.toLowerCase());
    }

    const filteringElement = (array, term) => {
        return array.filter(e => firstLetters(e.name, term));
    }
    const countriesToShow = filteringElement(data, country)

    useEffect(() => {
        axios
            .get('https://restcountries.com/v2/all')
            .then(response => {
                setData(response.data)
            })
    }, [])

    const Countries = ({ countries, onClick }) => {
        return (
            countries.map(country =>
                <li key={country.callingCodes}>
                    {country.name} <button value={country.name} onClick={onClick}>show</button>
                </li>
            )
        );
    }

    const DetailedCountryInfo = ({ country, weather }) => {
        return (
            <div>
                <h1>{country.name}</h1>
                <br />
                <p>capital {country.capital}</p>
                <p>area {country.area}</p>
                <br />
                <h3>languages: </h3>
                <ul>
                    {country.languages.map(lang => { return <li key={lang.id}>{lang.name}</li> })}
                </ul>
                <img src={country.flags.png} />
                {weather !== undefined &&
                    <>
                        <h3>Weather in {country.capital}</h3>
                        <p><b>temperature: </b>{weather.temperature} Celsius</p>
                        <p><img alt="descriptor" src={weather.weather_icons} /></p>
                        <p><b>wind: </b>{weather.wind_speed} kph direction {weather.wind_dir}</p>
                    </>
                }
            </div>
        );
    }

    const Output = ({ shownCountries: shownCountries }) => {
        if (shownCountries.length > 10) {
            return <p>Too many matches, specify another filter</p>;
        }
        else if (shownCountries.length <= 10 && shownCountries.length >= 2) {
            return <Countries countries={shownCountries} onClick={settingOfCountry} />
        }
        else if (shownCountries.length === 1) {
            return <DetailedCountryInfo country={shownCountries[0]} weather={weather} />
        }
        else return null;
    }

    const settingOfCountry = (e) => {
        e.preventDefault();
        setCountry(e.target.value);
        document.getElementById('country').value = e.target.value;
    }

    if (countriesToShow.length === 1) {
        setInterval(axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${countriesToShow[0].latlng[0]}&lon=${countriesToShow[0].latlng[1]}&appid=${api_key}`)
            .then(response => {
                setWeather(response.data.current)
            }), 10000000)
    }

    return (
        <div className="App">
            <p>find countries</p>
            <input id="country" onChange={(e) => setCountry(e.target.value)} />
            <Output shownCountries={countriesToShow} />
        </div>
    );
}

export default App;