import React, { useEffect, useState } from "react";
import covidApi from "../../api/covidApi";
import "./style.scss";
import { Line, Bar } from "react-chartjs-2";

function Chart() {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    fetchDailyData();
  }, []);

  const fetchDailyData = async () => {
    try {
      const response = await covidApi.getDailyData();

      const modifiedData = response.map(data => ({
          confirmed: data.confirmed.total,
          deaths: data.deaths.total,
          date: data.reportDate,
      }))

      console.log('ModifiedData: ', modifiedData);
      setDailyData(modifiedData);
    } catch (err) {
      console.log("Failed to fetch message list" + err);
    }
  };

  const lineChart =
    dailyData.length !== 0 ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [
            {
              data: dailyData.map(({ confirmed }) => confirmed),
              label: "Infected",
              borderColor: "#3333ff",
              fill: true,
            },
            {
              data: dailyData.map(({ deaths }) => deaths),
              label: "Deaths",
              borderColor: "red",
              backgroundColor: "rgba(255, 0, 0, .5)",
              fill: true,
            },
          ],
        }}
      />
    ) : null;

  return <div className="container">{lineChart}</div>;
}

export default Chart;
