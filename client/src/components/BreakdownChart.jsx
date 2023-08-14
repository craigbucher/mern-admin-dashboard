import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme } from "@mui/material";
import { useGetSalesQuery } from "state/api";

const BreakdownChart = ({ isDashboard = false }) => {		// by default = *not* dashboard page
  const { data, isLoading } = useGetSalesQuery();		// make the api call; 'isLoading' provided by api query
  const theme = useTheme();		// initialize MUI theme

	// if no data or 'isLoading' is true:
  if (!data || isLoading) return "Loading...";

	// set chart colors based on color theme colors:
	// chart will cycle through for each data element
  const colors = [
    theme.palette.secondary[500],
    theme.palette.secondary[400],
    theme.palette.secondary[300],
    theme.palette.secondary[200],
  ];
	// iterate through data entries:
  const formattedData = Object.entries(data.salesByCategory).map(
    ([category, sales], i) => ({	// retrieve 'category' and 'sales'
      id: category,		// format data element for chart:
      label: category,
      value: sales,
      color: colors[i],	// cycle through colors, above
    })
  );

  return (
    <Box
      height={isDashboard ? "400px" : "100%"}	// height = 400px when dashboard, otherwise 100% of view height
      width={undefined}		// box is dependent on height, not width
      minHeight={isDashboard ? "325px" : undefined}	// minimum for when is dashboard
      minWidth={isDashboard ? "325px" : undefined}	// minimum for when is dashboard
      position="relative"		// so we can place text in center of pie chart (why?)
    >
			{/* nivo chart pie chart: */}
			{/* https://nivo.rocks/pie/ */}
      <ResponsivePie
        data={formattedData}	// created above
				// configuration generated on nivo pie chart page & copied over:
				// theme is essentially the same as overview chart
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
            },
          },
          tooltip: {
            container: {
              color: theme.palette.primary.main,
            },
          },
        }}
        colors={{ datum: "data.color" }}	// use colors defined above
        margin={
          isDashboard
            ? { top: 40, right: 80, bottom: 100, left: 50 }	// when dashboard
            : { top: 40, right: 80, bottom: 80, left: 80 }	// when *not* dashboard
        }
        sortByValue={true}	// added; values decrease clockwise
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={!isDashboard}	// labels when not dashboard
        arcLinkLabelsTextColor={theme.palette.secondary[200]}	// modified
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: isDashboard ? 20 : 0,		// modified
            translateY: isDashboard ? 50 : 56,	// modified
            itemsSpacing: 0,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: theme.palette.primary[500],	// modified
                },
              },
            ],
          },
        ]}
      />
			{/* text in the center of the chart: */}
			{/* in general, to center something in the center of something else */}
      {/* make the parent position="relative" and child position="absolute" */}
			{/* then top="50%" and left="50%" (or whatever) on child element */}
			<Box
        position="absolute"
        top="50%"
        left="50%"
        color={theme.palette.secondary[400]}
        textAlign="center"
        pointerEvents="none"
        sx={{
          transform: isDashboard
            ? "translate(-75%, -170%)"		// left and up - why?
            : "translate(-50%, -100%)",		// left and up - why?
        }}
      >
        <Typography variant="h6">
					{/* when *not* dashboard, include this value: */}
          {!isDashboard && "Total:"} ${data.yearlySalesTotal}
        </Typography>
      </Box>
    </Box>
  );
};

export default BreakdownChart;