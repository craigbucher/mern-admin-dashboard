import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import { useGetDashboardQuery } from "state/api";
import StatBox from "components/StatBox";

const Dashboard = () => {
  const theme = useTheme();	// initialize MUI color theme
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");	// set breakpoint for responsiveness
  const { data, isLoading } = useGetDashboardQuery();	// make api call; 'isLoading' is provided by api query

	// datagrid columns; provide header name and field to use:
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,			// proportion of width to use (total = 4.5, so use 1/4.5th)
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,	// length of array = # of products
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,	// convert to 2 decimal places
    },
  ];

  return (
		// margin top/bottom=1.5rem, left/right=2.5rem
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your Dashboard" />

        <Box>
					{/* Non-functional download reports button */}
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",	// top/bottom	left/right
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"	// implement grid system
        gridTemplateColumns="repeat(12, 1fr)"	// 12 columns of 1 fraction
        gridAutoRows="160px"	// as many 160px high rows as needed
        gap="20px"	// gap between elements
        sx={{
					// on small screens, component spans all 12 columns (i.e., only one column):
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
				{/* top left: */}
        <StatBox
          title="Total Customers"
          value={data && data.totalCustomers}	// display once 'data.totalCustomers' is available
          increase="+14%"	// hard-coded since we don't have logic on back end to generate
          description="Since last month"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
				{/* top right */}
        <StatBox
          title="Sales Today"
          value={data && data.todayStats.totalSales}	// display once 'data.todayStats.totalSales' is available
          increase="+21%"	// hard-coded since we don't have logic on back end to generate
          description="Since last month"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
				{/* Overview chart = first row, right side */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>
				{/* bottom left: */}
        <StatBox
          title="Monthly Sales"
          value={data && data.thisMonthStats.totalSales}	// display once 'thisMonthStats.totalSales' is available
          increase="+5%"	// hard-coded since we don't have logic on back end to generate
          description="Since last month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
				{/* bottom right */}
        <StatBox
          title="Yearly Sales"
          value={data && data.yearlySalesTotal}	// display once 'data.yearlySalesTotal' is available
          increase="+43%"	// hard-coded since we don't have logic on back end to generate
          description="Since last month"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}
				{/* Performance: */}
        <Box
          gridColumn="span 8"	// = 8/12 width
          gridRow="span 3"  // 3 rows high
					// can't style <DataGrid> directly, so do so here in parent container:
					// to identify css classes, 'inspect' the rendered page and select desired element
          sx={{
            // can't style scrollbars here - must do so in 'index.css'
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}	// show loading circle if no data or 'isLoading' is true
            getRowId={(row) => row._id}
            rows={(data && data.transactions) || []}	// if no 'data.transactions' use empty array to prevent error
            columns={columns}	// defined above
          />
        </Box>
				{/* Sales by category breakdown: */}
        <Box
          gridColumn="span 4" // 4 of 12 columns
          gridRow="span 3"  // 3 rows high
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Sales By Category
          </Typography>
					{/* pie chart: */}
          <BreakdownChart isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of sales revenue by category for the current
            year with total sales in center.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;