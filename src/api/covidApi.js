import axiosClient from './axiosClient';

const covidApi = {

  getInformationCovid(country) {
    const url = '/';
    let changeableUrl = url;

    if(country) changeableUrl = `/countries/${country}`;

    return axiosClient.get(changeableUrl);
  },

  getDailyData(data) {
    const url= '/daily';
    return axiosClient.get(url, data); 
  },

  getCountries(data) {
    const url = '/countries';
    return axiosClient.get(url, data); 
  }


};

export default covidApi;
