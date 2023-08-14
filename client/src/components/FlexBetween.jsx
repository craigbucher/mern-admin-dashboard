const { Box } = require("@mui/material");
const { styled } = require("@mui/system");


// 'styled' = re-use styles/css in component-like manner
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",	// equal space between elements
  alignItems: "center",	// center items vertically in container
});

export default FlexBetween;