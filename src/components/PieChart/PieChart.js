import React from "react";
import { Pie } from "react-chartjs-2";
import numeral from "numeral";

function PieChart({ countryInfo }) {
  const data = {
    labels: ["cases", "deaths", "Recovered"],
    datasets: [
      {
        data: [
          countryInfo.cases?.total,
          countryInfo.deaths?.total,
          countryInfo.cases?.recovered,
        ],
        backgroundColor: ["#25CCF7", "#FF4848", "#45CE30"],
      },
    ],
  };
  return (
    <div className="pieChart">
      <Pie
        data={data}
        height={300}
        options={{
          responsive: false,
          tooltips: {
            mode: "label",
            callbacks: {
              label: function (tooltipItem, data) {
                var indice = tooltipItem.index;
                return (
                  data.labels[indice] +
                  ": " +
                  numeral(data.datasets[0].data[indice]).format("+0,0") +
                  ""
                );
              },
            },
          },
        }}
      />
    </div>
  );
}

export default PieChart;
