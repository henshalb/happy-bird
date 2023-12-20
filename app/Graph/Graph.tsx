import { Button, Card, Title, Text } from "@mantine/core";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";
import moment from "moment";
import { useAppContext } from "~/utils/state/store";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const LineChart = ({ data }) => {
  const chartRef = useRef(null);
  const { state, dispatch } = useAppContext();

  console.log(data);

  useEffect(() => {
    const ctx = document.getElementById("myChart");
    if (ctx && data) {
      if (data?.length > 0) {
        let givenNames = {
          timestamp: "AC Thermometer Log",
          log_date: "Daily Email Log",
          balance_date: "Daily Account Balance",
        };

        for (var name in givenNames) {
          if (data[0].hasOwnProperty(name)) {
            dispatch({ graphTitle: givenNames[name] });
          }
        }
      }

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      if (state.graphTitle == "AC Thermometer Log") {
        const timestamps = data.map((entry) => moment(entry.timestamp));
        const temperatures = data.map((entry) => parseFloat(entry.temperature));
        chartRef.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: timestamps.map((timestamp) => timestamp.format()),
            datasets: [
              {
                label: "Temperature",
                data: temperatures,
                borderColor: "blue",
                fill: false,
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: "time", // Use 'time' for date scales
                time: {
                  unit: "day", // Adjust the time unit based on your data
                },
              },
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      } else if (state.graphTitle == "Daily Email Log") {
        const logDates = data.map((entry) => moment(entry.log_date)); // Use moment to parse log_dates

        // Extract individual employee data
        const employeeData = Object.keys(data[0])
          .filter((key) => key !== "log_date")
          .map((employee) => ({
            label: employee,
            data: data.map((entry) => entry[employee]),
          }));

        // Create a new chart instance
        chartRef.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: logDates,
            datasets: employeeData.map((employee) => ({
              label: employee.label,
              data: employee.data,
              borderColor: getRandomColor(), // Function to generate random colors
              fill: false,
            })),
          },
          options: {
            scales: {
              x: {
                type: "time", // Use 'time' for date scales
                time: {
                  unit: "day", // Adjust the time unit based on your data
                },
              },
            },
          },
        });
      } else if (state.graphTitle == "Daily Account Balance") {
        const balanceDates = data.map((entry) => moment(entry.balance_date)); // Use moment to parse balance_dates
        const balances = data.map((entry) => parseFloat(entry.balance));

        // Create a new chart instance
        chartRef.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: balanceDates,
            datasets: [
              {
                label: "Balance",
                data: balances,
                borderColor: "blue", // Set your desired color
                fill: false,
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: "time", // Use 'time' for date scales
                time: {
                  unit: "day", // Adjust the time unit based on your data
                },
              },
            },
          },
        });
      }
    }

    // Cleanup function
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <Card withBorder p={"md"} mt={"md"}>
      <Title order={4}>
        Line Graph {state.graphTitle ? `- ${state.graphTitle}` : null}
      </Title>
      <Text size={"xs"}>Hover to see specific detail</Text>
      <canvas id="myChart" width="400" height="100"></canvas>
    </Card>
  );
};
