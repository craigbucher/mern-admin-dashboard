import { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

// this component uses *server-side* pagination, so instead of sending all
// items for frontend to format/display, it will only send specific items,
// based on request params (page size, search terms, sort, etc.)

const Transactions = () => {
  const theme = useTheme();		// initialize MUI color theme

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);	// default page size = 20 transactions
  const [sort, setSort] = useState({});		// sort has to be formatted as an object
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetTransactionsQuery({		// make api call; 'isLoading' provided by api query
    page,			// props:
    pageSize,
    sort: JSON.stringify(sort),		// have to stringify, because is an object
    search,
  });

	// 'columns' designate column headers and fields to use for data
  const columns = [
    {
      field: "_id",
      headerName: "Transaction ID",
      flex: 1,	// proportion of width to use (total for all = 4.5)
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
      sortable: false,		// doesn't sort properly
      renderCell: (params) => params.value.length,	// = number of products this transaction has
    },
    {
			// sorting doesn't work properly on this, either because is string in database (should have been number)
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,	// convert to number with 2 decimal places
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
      <Box
        height="80vh" // taller than customers
        // Can't style <DataGrid> directly, so do so here in the parent component:
        // classes determined by 'inspecting' the rendered page and selecting desired component
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
            color: `${theme.palette.secondary[200]} !important`,  // needs !important otherwise won't override
          },
        }}
      >
        {/* MUI's data table component */}
        {/* https://mui.com/x/react-data-grid/pagination/#server-side-pagination */}
        <DataGrid
          loading={isLoading || !data}  // true when 'data' is not present or 'isLoading' = true
          getRowId={(row) => row._id}
          rows={(data && data.transactions) || []}  // empty array if transactions not available because will cause error if unavailable
          columns={columns} // defined above
          rowCount={(data && data.total) || 0}  // total = number of items sent, or '0' if unavalable
          rowsPerPageOptions={[20, 50, 100]}
          // pagination  // we want pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"   // = determined on server
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}  // change from 20, 50, 100
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}  // when change sort order
          // custom toolbar:
          // https://mui.com/x/react-data-grid/components/#toolbar
          // "deprecated — Use slots instead"
          components={{ Toolbar: DataGridCustomToolbar }} // we create 'DataGridCustomToolbar'
          // "deprecated — Use the slotProps prop instead"
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },  // define props to pass into custom toolbar
          }}
        />
      </Box>
    </Box>
  );
};

export default Transactions;