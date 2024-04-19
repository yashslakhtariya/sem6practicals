const express = require('express');
const session = require('express-session');
const passport = require('passport');
const WebAppStrategy = require('ibmcloud-appid').WebAppStrategy;
require('dotenv').config();

const app = express();
var port = 3000;
app.use(session({
	secret: '123456',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));

passport.use(new WebAppStrategy({
	tenantId: process.env.tenantID,
	clientId: process.env.clientID,
	secret: process.env.secret,
	oauthServerUrl: process.env.oAuthURL,
	redirectUri: "http://localhost:3000/appid/callback"
}));


app.get('/appid/login', passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
	successRedirect: '/',
	forceLogin: true
}));

//
// Handle callback
app.get('/appid/callback', passport.authenticate(WebAppStrategy.STRATEGY_NAME, { keepSessionInfo: true }));
//app.use(passport.authenticate(WebAppStrategy.STRATEGY_NAME));
app.use('/api', (req, res, next) => {
	if (req.user) {
		next();
	} else {
		res.status(401).send("Unauthorized");
	}
});

app.get('/api/user', (req, res) => {
	//console.log(res);
	console.log(req.session[WebAppStrategy.AUTH_CONTEXT]);
	res.json({
		user: {
			name: req.user.name
		}
	});

});


app.get("/appid/logout", function (req, res) {
	req.logout(function (err) {
		if (err) { console.log(err); }
		res.redirect("/");
	});
});




// Serve static resources

app.use(express.static('./public'));
app.listen(port);