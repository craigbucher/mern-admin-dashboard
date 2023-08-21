import passport from "passport";
import validator from "validator";
// https://www.npmjs.com/package/validator
// import User from "../models/User.js";

// must be POST request:
export const postLogin = (req, res, next) => {
  
  // validate login information:
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    errors = validationErrors.reduce((acc, err) => acc + `${err.msg}, `, "");
    res.send({ error: errors.slice(0, -2) });
    return;
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });


// The primary “Passport JS” library is always required, and is used to 
// maintain session information for authenticated users
// The secondary “strategy” library is dependent on the methodology you plan 
// to use to authenticate a user. eg. “passport-local (in this case)”

  // The 'local' authentication strategy authenticates users using a username and password
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log('error', err);
      return next(err); // if error, pass error to next middleware
    }
    if (!user) {
      res.send({ error: "Invalid user/password" });
      console.log('Invalid username/password')
      return;
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err); // if error, pass error to next middleware
      }
      console.log('session: ',req.user.session);
      res.json(req.user); // return authenticated user info in json format (?)
    });
  })(req, res, next);
};

export const logout = (req, res) => {
  console.log(req.user)
  console.log(req.session)
  req.session.destroy((err) => {  // destroy the current session and all of its data
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
  });
  req.logout(() => {  // remove the req.user property and clear the login session (if any)
    console.log("User has logged out.");
    res.clearCookie("connect.sid", { path: "/" });  // clear session cookie; redirect to root route
    res.send("logged out"); // sends as reponse, but what do we do with it???????
  })
};


export const test = (req, res) => {
  res.json("CONNECTED")
  return;
};