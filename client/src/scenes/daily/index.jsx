import { useMemo, useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { ResponsiveLine } from "@nivo/line";
import { useGetSalesQuery } from "state/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";	// must also import css

// not making a separate 'component' for this page, becuase it's not included 
// in the dashbar; component specification is included below
// uses same api endpoint as OverviewChart, Monthly and Breakdown charts

const Daily = () => {
	// all data in database is from 2021:
  const [startDate, setStartDate] = useState(new Date("2021-02-01"));
  const [endDate, setEndDate] = useState(new Date("2021-03-01"));
  const { data } = useGetSalesQuery();	// make api call
  const theme = useTheme();		// initialize MUI color theme

	// useMemo = perform this calculation only when 'data', 'startDate' or 'endDate' changes
  // very similar to overviewChart:
	const [formattedData] = useMemo(() => {
    if (!data) return [];		// if no data, return empty array to prevent error

    const { dailyData } = data;
    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: [],
    };
    const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: [],
    };

		// using 'forEach' as opposed to 'reduce' in overviewChart:
    Object.values(dailyData).forEach(({ date, totalSales, totalUnits }) => {
      const dateFormatted = new Date(date);		// convert date to proper format
      if (dateFormatted >= startDate && dateFormatted <= endDate) {		// if date is between startDate and endDate:
        const splitDate = date.substring(date.indexOf("-") + 1);	// grab part of date after the dash, "-" (just the relevant date info)

        totalSalesLine.data = [			
          ...totalSalesLine.data,		// to the existing 'totalSalesLine' data:
          { x: splitDate, y: totalSales },	// add data for this specific date
        ];
        totalUnitsLine.data = [
          ...totalUnitsLine.data,		// to the existing 'totalUnitsLine' data:
          { x: splitDate, y: totalUnits },	// add data for this specific date
        ];
      }
    });

    const formattedData = [totalSalesLine, totalUnitsLine];	// return the line arrays
    return [formattedData];
		// only update useMemo when 'data', 'startDate' or 'endDate' changes
  }, [data, startDate, endDate]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
		// margin top/bottom=1.5rem, left/right=2.5rem
    <Box m="1.5rem 2.5rem">
      <Header title="DAILY SALES" subtitle="Chart of daily sales" />
      {/* use 75% of screen height */}
			<Box height="75vh">
				{/* flex-end = The items are packed flush to each other toward the 
				edge of the alignment container depending on the flex container's 
				main-end side (right/bottom) */}
        <Box display="flex" justifyContent="flex-end">
          {/* <DatePicker> has width of 100%, so needs own <Box> to allow */}
          {/* flex-end to align properly: */}
          <Box>
						{/* https://reactdatepicker.com/#example-date-range */}
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </Box>
          <Box>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </Box>
        </Box>

				{/* essentially the same as overviewChart: */}
				{/* configuration generated on nivo site for lineChart: */}
        {data ? (			// if there's data:
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
            colors={{ datum: "color" }}	// to use custom colors, but not explained well
            margin={{ top: 50, right: 70, bottom: 70, left: 65 }} // modified
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-$.2d"   // changed to currency
            curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,		// modified
              legend: "Month",
              legendOffset: 60,		// modified - moves it down
              legendPosition: "middle",
            }}
            axisLeft={{
              format: " >-$d",  // chaged to currency
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Total",
              legendOffset: -55,		// modified
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
                anchor: "top-right",		// modified
                direction: "column",
                justify: false,
                translateX: 50,		// modified
                translateY: 0,		// modified
                itemsSpacing: 5,  // modified
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
        ) : (	// if there's no data:
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};

export default Daily;