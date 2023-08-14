import { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useGetProductsQuery } from "state/api";

// display element for each product:
// *must be above 'Products'* - because is referenced by it
const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) => {
  const theme = useTheme();		// initialize MUI color theme
  const [isExpanded, setIsExpanded] = useState(false);	// used by 'see more' button

  return (
		// each item's info is displayed in a <Card>
    <Card
      sx={{
        backgroundImage: "none",	// why do we need to set this???? Is there a default?
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          {/* 'toFixed(2)' = change to number with 2 decimal places */}
					${Number(price).toFixed(2)}
        </Typography>
				{/* MaterialUI's <Rating> component: */}
				{/* 'readOnly' = so you can't try to update it */}
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions> 
        <Button
          variant="primary" // other options = 'outlined', 'contained'
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
			{/* <Collapse> = hide/display additional <CardContent>: */}
      <Collapse
        in={isExpanded}	// triggered when 'isExpanded' is true
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
	// get 'Product' data from backend:
  const { data, isLoading } = useGetProductsQuery();	// 'isLoading' provided through by api query
  console.log('data: ', data)
	const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />
      {data || !isLoading ? (	// will only display if one of these is true
        <Box
          mt="20px"
          display="grid"
					// grid of 4 columns, each taking a maximum of 1 fraction
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"		// = vertical gap
          columnGap="1.33%"		// = horizontal gap = 1.33% of width
          sx={{
						// will be 4 columns until breakpoint, then only 1 column:
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },	// span 4 = entire width 
          }}
        >
          {data.map(
            ({
              _id,		// desctructure these items:
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => (
							// display <Product> for each 'data' item:
							// <Product> contains all of the <Card> formatting
              <Product
                key={_id}		// React requires a unique key
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>	// shows until 'data' finishes loading
      )}
    </Box>
  );
};

export default Products;