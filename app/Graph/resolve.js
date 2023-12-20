import Chart from "chart.js/auto";
import "chartjs-adapter-moment";
import moment from "moment";

export const thermometerLog = (chart, data) => {
  const timestamps = data?.success?.map((entry) => moment(entry.timestamp));
  const temperatures = data?.success?.map((entry) =>
    parseFloat(entry.temperature)
  );
  return new Chart(chart, {
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
          type: "time",
          time: {
            unit: "day",
          },
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const dailyEmailLog = (chart, data) => {
  const logDates = data?.success?.map((entry) => moment(entry.log_date));

  const employeeData = Object.keys(data?.success[0])
    .filter((key) => key !== "log_date")
    .map((employee) => ({
      label: employee,
      data: data?.success?.map((entry) => entry[employee]),
    }));

  return new Chart(chart, {
    type: "line",
    data: {
      labels: logDates,
      datasets: employeeData.map((employee) => ({
        label: employee.label,
        data: employee.data,
        borderColor: getRandomColor(),
        fill: false,
      })),
    },
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
          },
        },
      },
    },
  });
};

export const dailyAccountBalance = (chart, data) => {
  const balanceDates = data?.success?.map((entry) =>
    moment(entry.balance_date)
  );
  const balances = data?.success?.map((entry) => parseFloat(entry.balance));

  return new Chart(chart, {
    type: "line",
    data: {
      labels: balanceDates,
      datasets: [
        {
          label: "Balance",
          data: balances,
          borderColor: "blue",
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
          },
        },
      },
    },
  });
};
