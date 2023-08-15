import { useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { ResponsiveLine } from "@nivo/line";
import { useGetSalesQuery } from "state/api";

// does not have corresponding component, because is not included in dashboard
// component configuration included below:
// uses same api endpoint as Daily and OverviewChart:

const Monthly = () => {
  const { data } = useGetSalesQuery();	// make api call
  const theme = useTheme();		// initialize MUI color theme

	// useMemo = perform this calculation only when 'data' changes
  const [formattedData] = useMemo(() => {
    if (!data) return [];		// if no data, return empty array to avoid error

    const { monthlyData } = data;		// deconstruct 'monthlyData' from 'data'
    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: [],		// start with empty array
    };
    const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: [],		// start with empty array
    };

		// iterate through 'monthlyData' and add to results arrays:
    Object.values(monthlyData).forEach(({ month, totalSales, totalUnits }) => {
      totalSalesLine.data = [
        ...totalSalesLine.data,		// to existing 'totalSalesLine' data
        { x: month, y: totalSales },	// add datapoint in this format
      ];
      totalUnitsLine.data = [
        ...totalUnitsLine.data,		// to existing 'totalUnitsLine' data
        { x: month, y: totalUnits },	// add datapoint in this format
      ];
    });

		// return line information:
    const formattedData = [totalSalesLine, totalUnitsLine];
    return [formattedData];
    // update only when 'data' changes
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  // essentially the same as OverviewChart, Daily and Breakdown charts:
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="MONTHLY SALES" subtitle="Chart of monthly sales" />
      <Box height="75vh">
        {data ? (
          <ResponsiveLine
            data={formattedData}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                    fontSize: 16, // added to make it larger
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                  fontSize: 16, // added to make it larger
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            colors={{ datum: "color" }}
            margin={{ top: 50, right: 70, bottom: 70, left: 70 }} // modified
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-$.2d"   // changed to decimal
            // curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Month",
              legendOffset: 60,
              legendPosition: "middle",
            }}
            axisLeft={{
              format: " >-$.2d",  // changed to decimal
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Total",
              legendOffset: -60,  // modified
              legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: 50,
                translateY: 0,
                itemsSpacing: 5,  // modified from 0
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 20,   // made a little bigger
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};

export default Monthly;