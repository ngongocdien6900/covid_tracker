import axiosClient from './axiosClient';

const covidApi = {

  getCovid(data) {
    const url = '/api';
    return axiosClient.get(url, data);
  },


};

export default covidApi;
