import axiosClient from './axiosClient';

const covidApi = {

  getInformationCovid(data) {
    const url = '/api';
    return axiosClient.get(url, data);
  },

  getDailyData(data) {
    const url= '/api/daily';
    return axiosClient.get(url, data); 
  }


};

export default covidApi;
