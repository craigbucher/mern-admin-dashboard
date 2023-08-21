import {useState} from "react"
import {
	useTheme,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	useMediaQuery,
} from "@mui/material";

const Modal = () => {
	
	const [open, setOpen] = useState(false);
  const theme = useTheme();	// initialize MUI color theme
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
	
	return (
		<div>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        About This Site
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="responsive-dialog-title">
          {"About this site:"}
        </DialogTitle>
        <DialogContent>
					<DialogContentText>
					All coding by Craig Bucher, craig @ craigbucher . com,
					based on site design in tutorial by <span>
					<a href="https://www.youtube.com/watch?v=0cPCMIuDk2I" target="new">Ed Roh</a></span>
					. My code on GitHub <span><a href="https://github.com/craigbucher/mern-admin-dashboard" 
					target="new">here</a></span>. User authentication and login derived from 
					<span> <a href="https://github.com/saira512dev" target="new">Saira Abdulla</a></span>'s implementation.
					Back-end source data hosted on MongoDB Atlas.
					</DialogContentText>
					<DialogContentText>
						<p><samp><u>Front end</u>:<br/>
						React = front-end framework<br/>
						MaterialUI = styling framework<br/>
						nivo charts<br/>
						Redux Toolkit = state management<br/>
						RTK Query = data fetching and caching</samp></p>
					</DialogContentText>
					<DialogContentText>
						<p><samp><u> Back end</u>:<br/>
						Express.js = back-end framework<br/>
						node.js = runtime<br/>
						Mongoose = database abstraction<br/>
						Passport = authentication middleware<br/>
						express-session = session management middleware</samp></p>
					</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="inherit" >
            Close
          </Button>
          {/* <Button onClick={handleClose} autoFocus>
            Agree
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
	)
}

export default Modal