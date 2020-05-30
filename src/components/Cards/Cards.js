import React from "react";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import Countup from "react-countup";
import styles from "./Cards.module.css";
import cx from "classnames";

class Cards extends React.Component {
  render() {
    const { confirmed, recovered, deaths, lastUpdate } = this.props.data;
    if (!confirmed) {
      return <p>Loading...</p>;
    }

    return (
      <div className={styles.container}>
        <Grid container spacing={3} justify="center">
          <Grid
            item
            component={Card}
            xs={12}
            md={3}
            className={cx(styles.card, styles.infected)}
          >
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Infected
              </Typography>
              <Typography variant="h5" className={styles.numberCases}>
                <Countup
                  start={0}
                  end={confirmed.value}
                  duration={2.2}
                  separator={","}
                />{" "}
              </Typography>
              <Typography color="textSecondary">
                {new Date(lastUpdate).toDateString()}
              </Typography>
              <Typography variant="body1">
                Number of active cases of COVID-19
              </Typography>
            </CardContent>
          </Grid>
          <Grid
            item
            component={Card}
            xs={12}
            md={3}
            className={cx(styles.card, styles.recovered)}
          >
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Recovered
              </Typography>
              <Typography variant="h5" className={styles.numberCases}>
                <Countup
                  start={0}
                  end={recovered.value}
                  duration={2.2}
                  separator={","}
                />
              </Typography>
              <Typography color="textSecondary">
                {new Date(lastUpdate).toDateString()}
              </Typography>
              <Typography variant="body1">
                Number of recovered patients of COVID-19
              </Typography>
            </CardContent>
          </Grid>
          <Grid
            item
            component={Card}
            xs={12}
            md={3}
            className={cx(styles.card, styles.deaths)}
          >
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Deaths
              </Typography>
              <Typography variant="h5" className={styles.numberCases}>
                <Countup
                  start={0}
                  end={deaths.value}
                  duration={2.2}
                  separator={","}
                />
              </Typography>
              <Typography color="textSecondary">
                {new Date(lastUpdate).toDateString()}
              </Typography>
              <Typography variant="body1">
                Number of deaths caused by COVID-19
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Cards;
