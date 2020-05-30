import React from "react";
import { getCountries } from "../../api/covid";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import styles from "./CountryPicker.module.css";

class CountryPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { countries: ["Global"] };
  }

  async componentDidMount() {
    let fetchedData = await getCountries();
    this.setState({ countries: [{ name: "Global" }, ...fetchedData] });
  }

  onNativeSelect = event => {
    this.props.onCountrySelect(event.target.value);
  };

  render() {
    return (
      <div className={styles.CountryPicker}>
        <FormControl className={styles.formcontrol}>
          <NativeSelect defaultValue="Global" onChange={this.onNativeSelect}>
            {/* <option value="Global">Global</option> */}
            {this.state.countries.map(country => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      </div>
    );
  }
}

export default CountryPicker;
