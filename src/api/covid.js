import axios from "axios";

let url = "https://covid19.mathdro.id/api";

const getData = async country => {
  let changedURL = url;

  if (country && country !== "Global") {
    changedURL = changedURL + "/countries/" + country;
  }

  const response = await axios.get(changedURL);

  const {
    data: { confirmed, recovered, deaths, lastUpdate },
  } = response;
  
  const recovered = 491919504;

  return {
    confirmed,
    recovered,
    deaths,
    lastUpdate,
  };
};

const getDailyData = async () => {
  const response = await axios.get(`${url}/daily`);
  let modifiedData = response.data.map(obj => {
    return {
      confirmed: obj.confirmed.total,
      deaths: obj.deaths.total,
      date: obj.reportDate,
    };
  });
  return modifiedData;
};

const getCountries = async () => {
  const {
    data: { countries },
  } = await axios.get(`${url}/countries`);

  return countries;
};

export { getData, getDailyData, getCountries };
