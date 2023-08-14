import {
  GridColumnMenuContainer,
  GridFilterMenuItem,
  HideGridColMenuItem,
} from "@mui/x-data-grid";

// removes "Sort by ASC", "Sort by DESC" and "Show columns" from column menu items:

const CustomColumnMenu = (props) => {
  const { hideMenu, currentColumn, open } = props;	// destructure from props
  return (
    <GridColumnMenuContainer
      hideMenu={hideMenu}		// "default props you need to pass in"
      currentColumn={currentColumn}
      open={open}
    >
			{/* specifying that only these two items are column menu options: */}
      <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
      <HideGridColMenuItem onClick={hideMenu} column={currentColumn} />
    </GridColumnMenuContainer>
  );
};

export default CustomColumnMenu;