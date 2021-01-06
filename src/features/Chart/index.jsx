import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import covidApi from "../../api/covidApi";
import "./style.scss";
import PropTypes from "prop-types";

Chart.propTypes = {
  data: PropTypes.object,
  country: PropTypes.string,
};

Chart.defaultProps = {
  data: {},
  country: "",
};

function Chart(props) {
  const [dailyData, setDailyData] = useState([]);
  const { country, data : {recovered, confirmed, deaths} } = props;

  useEffect(() => {
    fetchDailyData();
  }, []);

  const fetchDailyData = async () => {
    try {
      const response = await covidApi.getDailyData();
      //lấy ra những thông tin cần thiết
      const modifiedData = response.map((data) => ({
        confirmed: data.confirmed.total,
        deaths: data.deaths.total,
        date: data.reportDate,
      }));
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
              label: "Lây nhiễm",
              borderColor: "#3333ff",
              fill: true,
            },
            {
              data: dailyData.map(({ deaths }) => deaths),
              label: "Tử vong",
              borderColor: "red",
              backgroundColor: "rgba(255, 0, 0, .5)",
              fill: true,
            },
          ],
        }}
      />
    ) : null;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Lây nhiễm", "Phục hồi", "Tử vong"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, .5)",
              "rgba(0, 255, 0, .5)",
              "rgba(255, 0, 0, .5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value]
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Tình trạng hiện tại ở ${country}` },
      }}
    />
  ) : null;

  return <div className="container">{country ? barChart : lineChart}</div>;
}

export default Chart;
