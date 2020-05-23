import React, { useEffect, useState } from 'react';
import './App.css';
import { Cards, Charts, CountryPicker } from './components'
import { fetchData } from './api'
import covid19 from './images/Covidimage.png'

function App() {

  const [data, setData] = useState({})
  const [country, setCountry] = useState('')

  useEffect(() => {
    const fetchAPI = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    }
    fetchAPI();
  }, []);

  const handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    setData(fetchedData);
    setCountry(country);
  }

  return (
    <div className="container">
      <img src={covid19} alt="COVID-19" className="covidImage" />
      <Cards data={data} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Charts data={data} country={country} />
    </div>
  );
}

export default App;
