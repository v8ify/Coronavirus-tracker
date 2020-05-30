import React from "react";
import { getDailyData } from "../../api/covid";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fetchedData: [] };
  }

  async componentDidMount() {
    let data = await getDailyData();

    this.setState({ fetchedData: data });
  }

  displayCharts = () => {
    if (this.props.country === "Global") {
      return (
        <div className={styles.linechart}>
          <Line
            data={{
              labels: this.state.fetchedData.map(obj => obj.date),

              datasets: [
                {
                  data: this.state.fetchedData.map(obj => obj.confirmed),
                  label: "confirmed",
                  borderColor: "#3e95cd",
                  backgroundColor: "rgba(62, 149, 205, 0.1)",
                  borderWidth: 2,
                  fill: true,
                },
                {
                  data: this.state.fetchedData.map(obj => obj.deaths),
                  label: "deaths",
                  borderColor: "#c45850",
                  backgroundColor: "rgba(196, 88, 80, 0.3)",
                  borderWidth: 2,
                  fill: true,
                },
              ],
            }}
          />
        </div>
      );
    } else {
      if (!this.props.data.confirmed) return null;
      return (
        <Bar
          width="700"
          height="350"
          data={{
            labels: ["Confirmed", "Recovered", "Deaths"],
            datasets: [
              {
                label: "Number of people",
                backgroundColor: [
                  "rgba(0, 0, 255, 0.5)",
                  "rgba(0, 255, 0, 0.5)",
                  "rgba(255, 0, 0, 0.5)",
                ],
                data: [
                  this.props.data.confirmed.value,
                  this.props.data.recovered.value,
                  this.props.data.deaths.value,
                ],
              },
            ],
          }}
          options={{
            legend: { display: false },
            title: {
              display: true,
              text:
                "Covid-19 cases in " +
                this.props.country +
                " on " +
                new Date(this.props.data.lastUpdate).toDateString(),
            },
          }}
        />
      );
    }
  };

  render() {
    if (this.state.fetchedData === []) return <p>Loading...</p>;
    return <div className={styles.container}>{this.displayCharts()}</div>;
  }
}

export default Chart;
