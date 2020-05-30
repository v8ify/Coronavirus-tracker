import React from "react";
import Cards from "./components/Cards/Cards";
import Chart from "./components/Chart/Chart";
import CountryPicker from "./components/CountryPicker/CountryPicker";
import styles from "./App.module.css";
import { getData } from "./api/covid";
import covidImage from "./images/covid-19.png";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: {}, country: "Global" };
  }

  async componentDidMount() {
    let fetchedData = await getData();

    this.setState({ data: fetchedData });
  }

  onCountrySelect = async country => {
    let fetchedData = await getData(country);
    this.setState({ country: country });
    this.setState({ data: fetchedData });
  };

  render() {
    return (
      <div className={styles.container}>
        <img src={covidImage} alt="covid-19" className={styles.image} />
        <Cards data={this.state.data} />
        <CountryPicker onCountrySelect={this.onCountrySelect} />
        <Chart data={this.state.data} country={this.state.country} />
        <p className={styles.footer}>app created by Prajwal Jadhav</p>
      </div>
    );
  }
}

export default App;
