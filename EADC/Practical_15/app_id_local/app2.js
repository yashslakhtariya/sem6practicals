const express = require('express'); 						
const passport = require('passport');						
const APIStrategy = require('ibmcloud-appid').APIStrategy;	
require('dotenv').config();	
const app = express();
app.use(passport.initialize());
passport.use(new APIStrategy({
	oauthServerUrl: process.env.oAuthURL,
}));

// Protect the whole app
app.use(passport.authenticate(APIStrategy.STRATEGY_NAME, {
	session: false
}));

// The /api/data API used to retrieve protected data
app.get('/api/data', (req, res) => {
	res.json({
		data: 12345
	});
});
app.listen(3000, () => {
    console.log('Listening on http://localhost:3000');
});
