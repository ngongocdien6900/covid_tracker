import { useEffect, useState } from 'react';
import covidApi from './api/covidApi';
import './App.scss';

import Cards from './features/Cards';
import Chart from './features/Chart';
import CountryPicker from './features/CountryPicker';

import coronaImage from './images/image.png';

function App() {

  const [data, setData] = useState({});
  const [country, setCountry] = useState('');

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async (country) => {
    try {
      const { confirmed, recovered, deaths, lastUpdate} = await covidApi.getInformationCovid();

      //lấy ra những dữ liệu cần thiết
      const modifiedData = {
        confirmed,
        recovered,
        deaths,
        lastUpdate,
      }

      setData(modifiedData);

    } catch (err) {
      console.log('Failed to fetch message list' + err);
    }
  };

  const handleCountryChange = async country => {
    //fetch data
    const response = await covidApi.getInformationCovid(country);
    //set state 
    setData(response);
    setCountry(country);
  }

  return (
    <div className="App">
      <img src={coronaImage} className="image" alt="COVID-19"/>
      <Cards data={data}/>
      <CountryPicker handleCountry={handleCountryChange}/>
      <Chart data={data} country={country}/>
    </div>
  );
}

export default App;
