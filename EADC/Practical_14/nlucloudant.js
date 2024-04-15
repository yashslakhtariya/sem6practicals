var Cloudant = require('@cloudant/cloudant');

// Initialize Cloudant with settings from .env
var url = "https://apikey-v2-197dnkn3t48agl1wuzpj91l7lo4dkifrzhim8wjf5ykg:0f75c4be5fda84f99a0d4c582ef21b89@3447fb1b-02ae-4331-923a-607d107471ea-bluemix.cloudantnosqldb.appdomain.cloud";
var username = "apikey-v2-197dnkn3t48agl1wuzpj91l7lo4dkifrzhim8wjf5ykg";
var password = "0f75c4be5fda84f99a0d4c582ef21b89";
var cloudant = Cloudant({ url: url, username: username, password: password });

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 8080;
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const axios = require('axios');
const { IamAuthenticator } = require('ibm-watson/auth');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');

// Initialize Watson NLU
const nlu = new NaturalLanguageUnderstandingV1({
    authenticator: new IamAuthenticator({ apikey: 'DOp1iM-8lo9FisfBw5_FHl-g8dsiFZ3RhrdoXBebjNpy' }), // Replace 'YOUR_API_KEY' with your actual API key
    version: '2021-03-25',
    serviceUrl: 'https://api.eu-gb.natural-language-understanding.watson.cloud.ibm.com/instances/8a660346-4386-4458-8e11-23f367e1ab13', // Replace 'YOUR_INSTANCE_ID' with your actual instance ID
});

// Check if database exists, if not, create it
async function checkOrCreateDatabase() {
    try {
        const dbList = await cloudant.db.list();
        if (!dbList.includes('imdbdata')) {
            await cloudant.db.create('imdbdata');
            console.log("Database 'imdbdata' created successfully");
        } else {
            console.log("Database 'imdbdata' already exists");
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
            'X-RapidAPI-Key': 'd28dceda32msh54fb43633711ea9p101e78jsn03d0c5903b4d',
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
        await cloudant.use('imdbdata').insert({ axiosResponse: axiosResponse.data, nluResponse: nluResponse.result });
        console.log("Data inserted into 'imdbdata' database successfully");

        res.send(nluResponse.result.sentiment.document.label);
    } catch (error) {
        console.error("Error:", error);
    }
});

app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
    await checkOrCreateDatabase();
});
