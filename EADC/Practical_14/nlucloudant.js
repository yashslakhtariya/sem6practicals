var Cloudant = require('@cloudant/cloudant');
require('dotenv').config();

// Initialize Cloudant with settings from .env
var url = process.env.cldntURL;
var username = process.env.cldntUSER;
var password = process.env.cldntPSWD;
var cloudant = Cloudant({ url: url, username: username, password: password });

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 6432;
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const axios = require('axios');
const { IamAuthenticator } = require('ibm-watson/auth');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');

// Initialize Watson NLU
const nlu = new NaturalLanguageUnderstandingV1({
    authenticator: new IamAuthenticator({ apikey: process.env.NLU_apikey }), // Replace 'YOUR_API_KEY' with your actual API key
    version: '2021-03-25',
    serviceUrl: process.env.NLU_serviceURL, // Replace 'YOUR_INSTANCE_ID' with your actual instance ID
});

// Check if database exists, if not, create it
async function checkOrCreateDatabase() {
    try {
        const dbList = await cloudant.db.list();
        if (!dbList.includes('ysleadc14')) {
            await cloudant.db.create('ysleadc14');
            console.log("Database 'ysleadc14' created successfully");
        } else {
            console.log("Database 'ysleadc14' already exists");
        }
    } catch (error) {
        console.error("Error checking/creating database:", error);
    }
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/', urlencodedParser, async (req, res) => {
    console.log('Got body:', req.body);
    const term = req.body.dictionary_word;

    const options = {
        method: 'GET',
        url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
        params: { term: term },
        headers: {
            'X-RapidAPI-Key': process.env.RapidAPI_key,
            'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com'
        }
    };

    try {
        const axiosResponse = await axios.request(options);
        const example = axiosResponse.data.list[1].example;
        console.log("Axios response:", axiosResponse.data);

        // Perform NLU analysis
        const analyzeParams = {
            text: example,
            features: {
                sentiment: {},
                emotion: {}
            },
        };

        const nluResponse = await nlu.analyze(analyzeParams);
        console.log("NLU response:", nluResponse.result);

        // Insert data into the database
        await cloudant.use('ysleadc14').insert({ axiosResponse: axiosResponse.data, nluResponse: nluResponse.result });
        console.log("Data inserted into 'ysleadc14' database successfully");

        res.send(nluResponse.result.sentiment.document.label);
    } catch (error) {
        console.error("Error:", error);
    }
});

app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
    await checkOrCreateDatabase();
});
