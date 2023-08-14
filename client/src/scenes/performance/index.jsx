import { Box, useTheme } from "@mui/material";
import { useGetUserPerformanceQuery } from "state/api";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";

// essentially the same as Admin page:

const Performance = () => {
  const theme = useTheme();		// initialize MUI color theme:
  const userId = useSelector((state) => state.global.userId);	// retrieve 'userId' from global state (we simulate a login)
  const { data, isLoading } = useGetUserPerformanceQuery(userId);	// make api call; 'isLoading' provided by api query

	// datagrid columns; specify header name and field to use:
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,			// proportion of width to use (total = 4.5, so = 1/4.5th)
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
      renderCell: (params) => params.value.length,	// length of array = # of items
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,	// convert to 2 decimal places
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="PERFORMANCE"
        subtitle="Track Your Affiliate Sales Performance:"
      />
      <Box
        mt="40px"
        height="75vh"	// 75% of screen height
				// can't style <DataGrid> directly, so do so here in parent element:
				// determine css classes by 'inspecting' the rendered page and selecting appropriate element
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
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
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,	// use 'important!' because otherwise wouldn't override
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}	// display loading circle when no data or 'isLoading' is true
          getRowId={(row) => row._id}
          rows={(data && data.sales) || []}	// if no 'data.sales' use empty array to prevent error
          columns={columns}	// defined above
          components={{
            ColumnMenu: CustomColumnMenu,	// components/DataGridCustomColumnMenu
          }}
        />
      </Box>
    </Box>
  );
};

export default Performance;