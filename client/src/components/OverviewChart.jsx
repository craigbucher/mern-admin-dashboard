import { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetSalesQuery } from "state/api";

const OverviewChart = ({ isDashboard = false, view }) => {	// by default, is *not* the dashboard view
  const theme = useTheme();	// initialize MUI color theme
  const { data, isLoading } = useGetSalesQuery();	// make the api call; 'isLoading' provided by api query

  // Have option to format the data on either the front end or the back end;
  // since the endpoint we're using is also used by 3 other pages, it's better
  // to format in the front end in this case:
  // uses same api endpoint as Daily, Monthly and Breakdown charts

	// useMemo = calculate and retain the result; only update when 'data' changes
  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (!data) return [];		// if no data, return empty array to avoid error

    const { monthlyData } = data;		// deconstruct 'monthlyData' from 'data'
    const totalSalesLine = {    // in format required by nivo line chart:
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: [],   // start with empty array
    };
    const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: [],
    };

		// cycle through 'monthlyData' values to generate datapoints:
		// 'acc' = accumulator
    // 'reduce' is more efficient than separate loops for both 'sales' and 'units'
    Object.values(monthlyData).reduce(
      (acc, { month, totalSales, totalUnits }) => {   // grab 'month', 'totalSales', 'totalUnits' for each month
        const curSales = acc.sales + totalSales;  // 'current sales' = 'accumulated sales' + 'totalSales' for this month
        const curUnits = acc.units + totalUnits;  // 'current units' = 'accumulated units' + 'totalUnits' for this month

        totalSalesLine.data = [
          ...totalSalesLine.data,     // (previously-added monthly sales data)
          { x: month, y: curSales },	// add current data point to 'totalSalesLine.data' array
        ];
        totalUnitsLine.data = [     // (previously-added monthly unit data)
          ...totalUnitsLine.data,		// add current data point to 'totalUnitsLine.data' array
          { x: month, y: curUnits },
        ];

        return { sales: curSales, units: curUnits };	
      },
      { sales: 0, units: 0 }	// starting values
    );

    return [[totalSalesLine], [totalUnitsLine]];	// return both arrays
		// only update when 'data' changes:
	}, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!data || isLoading) return "Loading...";	// show if there's no data or 'isLoading' is true

  return (
		// nivo ResponsiveLine component:	(responsive = responds to page width)
		// https://nivo.rocks/line/
    <ResponsiveLine
      // configuration info generated on nivo site based on option selectons:
      data={view === "sales" ? totalSalesLine : totalUnitsLine}	// determine which 'data' to use
      // theme also generated on nivo line chart site:
      // essentially the same as theme from 'geography'
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
      margin={{ top: 20, right: 50, bottom: 50, left: 75 }} // I modified 'left'
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false, // modified
        reverse: false,
      }}
      yFormat={view === "sales" ? " >-$.2d" : ""} // for tooltip display
      // yFormat=" >-$.2d" // changed to currency display
      curve="catmullRom"  // added
      enableArea={isDashboard}
      axisTop={null}
      axisRight={null}
      axisBottom={{       // added: if 'dashboard' concatenate month name to 3 digits:
        format: (v) => {
          if (isDashboard) return v.slice(0, 3);
          return v;       // if not dashboard, return full name
        },
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : "Month", // if dashboard, no legend
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        format:view === "sales" ? " >-$.2d" : "",
        // format: " >-$d",  // chaged to currency
        orient: "left",
        tickValues: 5,  // only 5 tick values on left axis
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard   // if dashboard, no legend
          ? ""                // if not dashboard and 'sales' view or 'units' view:
          : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
        legendOffset: -65,  // modified
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
      legends={
        !isDashboard    // if *not* dashboard:
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 30,   // modified
                translateY: -40,  // modified
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 20,
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
            ]
          : undefined   // if dashboard = no legend
      }
    />
  );
};

export default OverviewChart;