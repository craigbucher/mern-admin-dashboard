import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";

const StatBox = ({ title, value, increase, icon, description }) => {
  const theme = useTheme();
  return (
    <Box
      gridColumn="span 2" // takes 2 columns (of 12 in dashboard)
      gridRow="span 1"  // 1 row in height
      display="flex"
      flexDirection="column"  // align as column in <Box>
      justifyContent="space-between"  // equal space between elements
      p="1.25rem 1rem"
      flex="1 1 100%" // = flex-grow: 1; flex-shrink: 1; flex-basis: 100%;
      // flex-grow : 1;    ➜ The div will grow in same proportion as the window-size
      // flex-shrink : 1;  ➜ The div will shrink in same proportion as the window-size 
      // flex-basis: 100%; ➜ Starting value is 100% of container width
      backgroundColor={theme.palette.background.alt}
      borderRadius="0.55rem"
    >
      <FlexBetween>
        <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
          {title}
        </Typography>
        {icon}
      </FlexBetween>

      <Typography
        variant="h3"
        fontWeight="600"
        sx={{ color: theme.palette.secondary[200] }}
      >
        {value}
      </Typography>
      <FlexBetween gap="1rem">
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: theme.palette.secondary.light }}
        >
          {increase}
        </Typography>
        <Typography>{description}</Typography>
      </FlexBetween>
    </Box>
  );
};

export default StatBox;