import React, { useState, useEffect } from 'react';

const App = () => {
  const [city, setCity] = useState('');
  const [isWeather, setIsWeather] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [bgImage, setBgImage] = useState('');

  const getRandomCity = () => {
    const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Kolkata', 'Chennai', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Rajkot', 'Kanpur', 'Nagpur'];
    const randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex];
  };

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getWeather(city);
    }
  };

  function getWeather(city) {
    // const api = import.meta.env.VITE_REACT_APP_WEATHER_KEY;
    const api = secret.VITE_REACT_APP_WEATHER_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWeatherData(data);
        if (data.cod === 200) {
          setIsWeather(true);
        } else {
          setIsWeather(false);
        }
      });
  }

  useEffect(() => {
    const randomCity = getRandomCity();
    getWeather(randomCity);
  }, []);

  useEffect(() => {
    const getRandomInt = (max) => {
      return Math.floor(Math.random() * max) + 1;
    };
    setBgImage(`url('./bg (${getRandomInt(8)}).jpg')`);
  }, []);

  function toPascalCase(string) {
    return `${string}`
      .toLowerCase()
      .replace(new RegExp(/[-_]+/, 'g'), ' ')
      .replace(new RegExp(/[^\w\s]/, 'g'), '')
      .replace(
        new RegExp(/\s+(.)(\w*)/, 'g'),
        ($1, $2, $3) => `${$2.toUpperCase() + $3}`
      )
      .replace(new RegExp(/\w/), s => s.toUpperCase());
  }

  return (
    <div className="relative h-full w-screen ">
      <div className="sm:h-screen h-full bg-cover bg-center" style={{ backgroundImage: bgImage }}>
        <div className='flex flex-wrap sm:justify-between justify-center gap-10 items-center p-4'>
          <div className='flex justify-center items-center'>
            <img src="./logo4.png" width={80} alt="logo" />
            <p className='text-2xl text-white font-semibold'>WeatherCloud</p>
          </div>
          <div>
            <input
              type="text"
              className='bg-white bg-opacity-10 w-80 text-white font-medium text-lg border-none outline-none p-5 rounded-full h-14 backdrop-blur-md backdrop-filter'
              placeholder='Search by City'
              autoComplete='false'
              autoCorrect='false'
              value={city}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
            />
          </div>
        </div>

        {weatherData && isWeather ? (
          <div id='weatherdata' className="p-16  w-full flex flex-col justify-center items-center text-white">
            <h1 className='sm:text-8xl  text-5xl font-bold'>{weatherData.name},{weatherData.sys.country}</h1>
            <p className='mt-4 sm:text-6xl text-3xl font-semibold'>{Math.floor(weatherData.main.temp - 273.15)}°C</p>
            <p className='mt-4 sm:text-7xl text-4xl font-thin'>{toPascalCase(weatherData.weather[0].description)}</p>
            <div className='mt-16 flex justify-around flex-wrap gap-10 items-center w-full'>
              <div><p className='sm:text-4xl text-2xl font-semibold'>{weatherData.wind.speed}🍃</p><p className='sm:text-2xl text-xl font-normal'>Wind Speed</p></div>
              <div><p className='flex justify-center items-center sm:text-4xl text-2xl font-semibold'>{weatherData.main.humidity}%<img width={40} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACy0lEQVR4nO1YwU/TUBx++AcY/wDaJUr0ZCJeNCExnrwIif4FetUD8T/gYEzfzGbbbR6mCHeBA5CNwyImGIxrZxjeQDIPa5cNDEI2WV+L+Zm3MYaZpW9hrq3pl/ySly+v3/u+tq+/tggFCBCgbwgJ+v3BsH4P+RFDE9/P84Je5LBeConfLiC/gcN6gsc60OIELY78hBAu3uSx9qsVgI4ph/wCDusf2+aPQygIYAB5HZygjXWaP6qwNoo8DYABTtDXbANg/QuagHPIl2e/vaHHkFfBCdocQ4C5ni8sq0ZdUgjIn34OtriIcsBRrhv+SrQEDAEqbPr1OnOA6XWzISRlSZqKURFRIUutBVj5oYhzAB4Xqyz61BNzgMVNC2T1SOxEJdRmsfIjyW3HACPJbUcd6oV6Yg6QKViwsGnB5JoJsRyBuEpgat2E1FcLUlsWTOdNiKnOvLBScwzwZKlqq0PXph6oF+qpqwC9qkfzP2zNP17Y60rLlQC0Iqs1uDO1A5cjpUbRcXS11rWOawF6VSgIUAiuAPTlForlms/f9JZ5fDAdt57LbvCxHIGuO/GbvNkQoDWZby/gBj/tRifuFS+71YnPyse80ImDPlDoQyN7vlKD8IeaPzvx4oYJ1+QyXJXLML9B/Bfgwezu8dvlw9ldbwSQVcNiaTRJ9QBC4fbrMR1Tzm7+WXhZrVvMARI5Y5ml0dx+3fnFdetVBVL/oJG9/EzesV8BhQyLSvPD/o/KGjuNUgiMp6u2HyrjS9WO+XY6EgNPvVBPqBuIOfOGlCUZUTF2payxJynk7QulflHO1S9JWTJzPV4+tAswHC8fRrNk5uR8UTH2/6YjnsI31yYZ6gX1EsEPK7fBCVqF9YeVJ8FjreoYAGv7yKvgsP7eOYDO/tjrN1g2MY+Ld5GXwWPt2Sln/ynyA/iwNsoJ+nJzT2hVett4/swHCPCf4TedQZXvL+EKLAAAAABJRU5ErkJggg==" /></p><p className='sm:text-2xl text-xl font-normal'>Humidity</p></div>
              <div><p className='sm:text-4xl text-2xl font-semibold'>{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString("en-US")}🌄</p><p className='sm:text-2xl text-xl font-normal'>Sunrise</p></div>
              <div><p className='sm:text-4xl text-2xl font-semibold'>{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString("en-US")}🌇</p><p className='sm:text-2xl text-xl font-normal'>Sunset</p></div>
            </div>
          </div>
        ) : (
          <div id='weatherdata' className="p-16 w-full flex flex-col justify-center items-center text-white">
            <p className='text-5xl font-bold text-center'>Weather Not Found !</p>
          </div>
        )}
        <div className='absolute bottom-0  w-full text-slate-300 font-medium text-lg text-center p-10' >
          Copyright © 2023-24 Raj Markana. All Rights Recived
        </div>
      </div>
    </div>
  );
};

export default App;
