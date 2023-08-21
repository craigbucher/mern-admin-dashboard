import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Alert from '@mui/material/Alert';
// import API_URL from '../config/config';
import {
  Box,
  Button,
  Typography,
  useTheme,
  Grid,
  TextField,
} from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
	const theme = useTheme();	// initialize MUI color theme

  // States for registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // States for checking the errors
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handling the email field change (as user is typing)
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // Handling the password field change (as user is typing)
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const user = {
    email,
    password,		// in the clear
  };
  console.log(user);

  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();		// don't refresh the page
    if (email === "" || password === "") {
      setError(true);
      setErrorMessage("Please fill-in both fields");
      return;
    } else {
      console.log("DONE")
			// const response = await fetch(`${REACT_APP_BASE_URL}/general/login`, {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/general/login`, {
        method: "POST",		// login api requires POST method
        withCredentials: true,	// send with cookie
        credentials: 'include',	// valid values are include, same-origin, and omit
        headers: {
          "Content-Type": "application/json",	// value for the content type header
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();	// format response as json
      console.log(data);
      if (data.error) {
        setError(true);
        setErrorMessage(data.error);
      } else {
        setError(false);
        console.log("loggedIn");
        localStorage.setItem("DashBoardUserLoggedIn", true);	// boolean login indicator
        localStorage.setItem("DashBoardUser", JSON.stringify(data));	// stringified user info
        navigate("/dashboard");	// go to dashboard
      }
    }
  }

  const DisplayErrorMessage = () => {
    return (
			// MUI <Alert> component:
			// https://mui.com/material-ui/react-alert/
      error ?  <Alert severity="error" sx={{ background: "white",
        color:"black",
        fontWeight: "bold"
        }}>
          {errorMessage}
        </Alert> : ""		// empty string if no error
    );
  };

  const DisplayCredentials = () => {
    return (
        <Alert severity="success">FOR TESTING PURPOSES USE
				{/* 'Shelly' in Users: */}
        Email: hpyrah3@bbc.co.uk, Password: password
        </Alert> 
    );
  };

  return (
		// overall page container:
    <Box
      m="1.5rem 2rem"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",	// components displayed in columns:
        height: "100%",
        gap: "3rem"
      }}
    >
			{/* doesn't display if no error: */}
      <DisplayErrorMessage />
      <Box
        pt="2rem"
        sx={{
          backgroundColor: theme.palette.background.alt,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "0.2rem",
        }}
      >
        <Header title="WELCOME" subtitle="Sign In to your dashboard" />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "theme.palette.secondary" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box
            m="1rem"
            component="form"
            noValidate
            //onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
						{/* Spacing of '2' between elements: */}
            <Grid container spacing={2}>
							{/* Use entire viewport width no matter the size */}
              <Grid item xs={12}>
                <TextField
                  inputProps={{
                    autoComplete: "new-email",  // autocomplete is a normal text input enhanced by a panel of suggested options
                    form: {
                      autoComplete: "off",
                    },
                  }}
                  onChange={handleEmail}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handlePassword}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>
            </Grid>
            <Button
              onClick={handleSubmit}
              type="submit"
              fullWidth
              variant="contained"	// button style
              sx={{ mt: 3, mb: 2, p: "0.5rem 0", background: theme.palette.primary[400],
                "&:hover": { backgroundColor: theme.palette.primary[300]} 
                  }}
            >
              Sign In
            </Button>
          </Box>
					{/* Display testing credentials below login form */}
          <DisplayCredentials />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;