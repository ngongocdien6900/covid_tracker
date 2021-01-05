import { useEffect, useState } from 'react';
import covidApi from './api/covidApi';
import './App.scss';

import Cards from './features/Cards';
import Chart from './features/Chart';
import CountryPicker from './features/CountryPicker';

function App() {

  const [data, setData] = useState({});

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {
    try {
      const { confirmed, recovered, deaths, lastUpdate} = await covidApi.getCovid();

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

  return (
    <div className="App">
      <Cards data={data}/>
      <CountryPicker />
      <Chart />
    </div>
  );
}

export default App;
