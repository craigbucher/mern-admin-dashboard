import { Search } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import {
  GridToolbarDensitySelector,	// options to customize toolbar:
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";

const DataGridCustomToolbar = ({ searchInput, setSearchInput, setSearch }) => {
  return (
    // Create custom toolbar container:
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          {/* MUI Components imported above */}
          <GridToolbarColumnsButton /> 
          {/* <GridToolbarFilterButton /> */}
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
        {/* Search field: */}
        <TextField
          label="Search (userID ad Cost)..."
          sx={{ mb: "0.5rem", width: "15rem" }}
          onChange={(e) => setSearchInput(e.target.value)}  // update the value of the field/variable; does *not* initiate the search (otherwise would search on every change) ("could also de-bounce it")
          value={searchInput}
          variant="standard"  // 'filled' | 'outlined' | 'standard'
          InputProps={{
            // add 'search' icon at end/right of search box:
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setSearch(searchInput); // perform the actual search
                    setSearchInput("");   // clear the search input
                  }}
                >
                  {/* search icon: */}
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;