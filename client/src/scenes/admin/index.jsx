import { Box, useTheme } from "@mui/material";
import { useGetAdminsQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";

const Admin = () => {
  const theme = useTheme();		// initialize MUI color theme
  const { data, isLoading } = useGetAdminsQuery();	// make api call; 'isLoading' comes from api query

	// datagrid columns; specify header name and field to use:
	// similar to 'customers' component
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,		// flex = proportion of width to use (total = 4.9)
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
				// format to telephone number format:
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ADMINS" subtitle="Managing admins and list of admins" />
      <Box
        mt="40px"
        height="75vh"		// 75% of page height
        // can't style <DataGrid> directly, but can through (this) parent component:
				// to find appropriate css classes, 'inspect' rendered page and select the item
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
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
				{/* MUI's data table component */}
				{/* https://mui.com/x/react-data-grid/ */}
        <DataGrid
          loading={isLoading || !data}	// display loading circle if no data or 'isLoading' is true
          getRowId={(row) => row._id}
          rows={data || []}		// if no data, use empty array to prevent an error
          columns={columns}		// defined above
					// create a custom column menu
					components={{		// "deprecated — Use slots instead"
            ColumnMenu: CustomColumnMenu,	// = components/DataGridCustomColumnMenu
          }}
        />
      </Box>
    </Box>
  );
};

export default Admin;