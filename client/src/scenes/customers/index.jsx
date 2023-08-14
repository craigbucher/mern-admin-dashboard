import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";

// Uses client-side formatting/pagination
// server sends information for *all* items to client, which could be overwhelming

const Customers = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetCustomersQuery();	// 'isLoading' is provided by api query
  console.log("data", data);

	// columns provide the header and the field we get the data from:
  const columns = [
    {
      field: "_id",					// data.id
      headerName: "ID",
      flex: 1,							// proportion of space to use
    },
    {
      field: "name",				// data.name
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",				// data.email
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",	// data.phoneNumber
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
				// convert value to phone number format: (explained at 3:16:00 in video)
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
      },
    },
    {
      field: "country",			// data.country
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",	// data.occupation
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "role",				// data.role
      headerName: "Role",
      flex: 0.5,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="List of Customers" />
      <Box
				// need to explicitly set these parameters for DataGrid (in this parent element)
        mt="40px"
        height="75vh"	// = 75% of screen height
        sx={{
					// identify the classes to modify by 'inspecting' the element on the rendered page
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
            color: `${theme.palette.secondary[200]} !important`,	// need '!important', otherwise it doesn't override
          },
        }}
      >
				{/* <DataGrid> is MUI's data table component */}
				{/* https://mui.com/x/react-data-grid/ */}
				{/* "creating custom tables takes *significant* effort" */}
        <DataGrid
					// 'loading' provides a spinning circle while data is loading
          loading={isLoading || !data}	// true when data = 'unavailable' or 'isLoading' is true
          getRowId={(row) => row._id}	// every row needs an ID; default = '*.id', but in our case, it's actually '*._id'
          rows={data || []}		// use data *or* and empty array (needed to prevent errors)
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Customers;