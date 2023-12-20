import { Button, Card, Title, Text, Flex } from "@mantine/core";

import { useEffect, useRef } from "react";
import "chartjs-adapter-moment";
import { useAppContext } from "~/utils/store";
import { dailyAccountBalance, dailyEmailLog, thermometerLog } from "./resolve";

export const LineChart = ({ data }) => {
  const chartRef = useRef(null);
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    const chart = document.getElementById("chart-canvas");
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    if (data?.success) {
      if (data?.success?.length > 0) {
        let givenNames = {
          timestamp: "AC Thermometer Log",
          log_date: "Daily Email Log",
          balance_date: "Daily Account Balance",
        };

        for (var name in givenNames) {
          if (data?.success[0].hasOwnProperty(name)) {
            dispatch({ graphTitle: givenNames[name] });
          }
        }
      }

      if (state.graphTitle == "AC Thermometer Log") {
        chartRef.current = thermometerLog(chart, data);
      } else if (state.graphTitle == "Daily Email Log") {
        chartRef.current = dailyEmailLog(chart, data);
      } else if (state.graphTitle == "Daily Account Balance") {
        chartRef.current = dailyAccountBalance(chart, data);
      }
    }
  }, [, data, state.graphTitle]);

  return (
    <Card withBorder p={"md"} mt={"md"}>
      <Title order={4}>
        Line Graph {state.graphTitle ? `- ${state.graphTitle}` : null}
      </Title>
      <Text size={"xs"}>Hover to see specific detail</Text>
      {data?.success ? (
        <canvas id="chart-canvas" width="400" height="150"></canvas>
      ) : (
        <Flex align={"center"} justify={"center"} h={"200px"}>
          <Text c={"dimmed"} size={"sm"}>
            Not data to visualise
          </Text>
        </Flex>
      )}
    </Card>
  );
};
