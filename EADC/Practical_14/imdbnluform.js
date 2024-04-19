const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();


const port = 6432;
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const axios = require('axios');
const { IamAuthenticator } = require('ibm-watson/auth');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');

// Initialize Watson NLU
const nlu = new NaturalLanguageUnderstandingV1({
    authenticator: new IamAuthenticator({ apikey: process.env.NLU_apikey }), // Replace 'YOUR_API_KEY' with your actual API key
    version: '2021-03-25',
    serviceUrl: process.env.NLU_serviceURL, // Replace 'YOUR_INSTANCE_ID' with your actual instance ID
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/', urlencodedParser, (req, res) => {
    console.log('Got body:', req.body);
    x = req.body.dictionary_word;
    console.log(x);
    ///////
    const options = {
        method: 'GET',
        url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
        params: {
            term: req.body.dictionary_word
        },
        headers: {
            'X-RapidAPI-Key': process.env.RapidAPI_key,
            'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com'
        }
    };

    async function getData() {
        try {
            const response = await axios.request(options);
            const example = response.data.list[1].example;
            console.log(example);
            // Perform NLU analysis
            const analyzeParams = {
                text: example,
                features: {
                    // entities: {},
                    //keywords: {},
                    sentiment: {},
                    emotion: {}
                },
            };

            const nluResponse = await nlu.analyze(analyzeParams);
            console.log(JSON.stringify(nluResponse, null, 2));
            // res.send(JSON.stringify(nluResponse, null, 2));
            res.send(nluResponse.result.sentiment.document.label);
            //console.log(nluResponse.result.sentiment.document.label);
        } catch (error) {
            console.error(error);
        }
    }

    getData();
});
/////////




app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
