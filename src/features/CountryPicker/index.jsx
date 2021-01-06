import { FormControl, NativeSelect } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import covidApi from "../../api/covidApi";
import "./style.scss";

CountryPicker.propTypes = {
  handleCountry: PropTypes.func,
};

CountryPicker.defaultProps = {
  handleCountry: null,
};

function CountryPicker(props) {
  const [fetchedCountries, setFetchedCountries] = useState([]);
  const { handleCountry } = props;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const { countries } = await covidApi.getCountries();
        const data = countries.map((country) => country.name);

        setFetchedCountries(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCountries();
  }, [setFetchedCountries]);

  return (
    <FormControl className="formControl">
      <NativeSelect defaultValue="" onChange={e => handleCountry(e.target.value)}>
        <option value="">Global</option>
        {fetchedCountries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}

export default CountryPicker;
