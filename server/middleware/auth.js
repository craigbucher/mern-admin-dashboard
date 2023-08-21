// https://stackoverflow.com/questions/38820251/how-is-req-isauthenticated-in-passport-js-implemented

export default function (req, res, next) {
	console.log(req.sessionID)
	console.log('authenticated: ', req.isAuthenticated())
	if (req.isAuthenticated()) {
		return next()
	} else {
		res.redirect('/')	// redirect all unauthenticated requests to root route
		console.log("🚀 (not authenticated) ~ file: auth.js:8 ~req.user:",req.session)
	}
}
