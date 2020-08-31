import React, { useState, useEffect } from "react";
import "./App.css";
import AppHeader from "./components/AppHeader/AppHeader";
import { Card, CardContent } from "@material-ui/core";
import {
  getAffectedCountries,
  getCountryData,
  getAllCountriesData,
} from "./api";
import StatusPanal from "./components/StatusPanal/StatusPanal";
import StatTable from "./components/Table/StatTable";
import { sortTableData } from "./utils/sortTableData";
function App() {
  //state to store list of countries affected by the Coronavirus
  const [countries, setCountries] = useState([]);

  //state for dropdown select item
  const [country, setCountry] = useState("all");

  // state for storing coronavirus status
  const [countryInfo, setCountryInfo] = useState({});

  //state for storing table data
  const [tableData, setTableData] = useState([]);

  // getting list of countries affected by the Coronavirus.
  useEffect(() => {
    const getCountriesList = async () =>
      setCountries(await getAffectedCountries());
    getCountriesList();
  }, []);

  //getting worldwide status to show when first time app loads
  useEffect(() => {
    const getWorldwideStatus = async () =>
      setCountryInfo(await getCountryData("all"));
    getWorldwideStatus();
  }, []);

  // Get the current status of all countries
  useEffect(() => {
    //sortTableData() function used to sort data
    const getCountriesStatus = async () =>
      setTableData(sortTableData(await getAllCountriesData()));
    getCountriesStatus();
  }, []);

  // onChange for dropdown menu
  const onCountryChange = async (event) => {
    const country = event.target.value;
    const getCountryStatus = await getCountryData(country);
    setCountry(country);
    setCountryInfo(getCountryStatus);
  };

  return (
    <div className="app">
      <div className="app__left">
        {/* AppHeader component with props countries, country, onCountryChange */}
        <AppHeader
          countries={countries}
          country={country}
          onCountryChange={onCountryChange}
        />
        {/* showing cases ,recoverd , deaths status  */}
        <StatusPanal countryInfo={countryInfo} />
      </div>
      <div className="app__right">
        <Card>
          <CardContent>
            <h1>Current status of all countries</h1>
            {/* showing stats for all counties in table form  */}
            <StatTable countries={tableData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
