const axios = require('axios');
require('dotenv').config();

const { IamAuthenticator } = require('ibm-watson/auth');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');

// Initialize Watson NLU
const nlu = new NaturalLanguageUnderstandingV1({
    authenticator: new IamAuthenticator({ apikey: process.env.NLU_apikey}), // Replace 'YOUR_API_KEY' with your actual API key
    version: '2021-03-25',
    serviceUrl: process.env.NLU_serviceURL, // Replace 'YOUR_INSTANCE_ID' with your actual instance ID
});

const options = {
    method: 'GET',
    url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
    params: {
        term: 'devotion'
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
                entities: {},
                keywords: {},
                sentiment:{},
                emotion:{}
            },
        };

        const nluResponse = await nlu.analyze(analyzeParams);
        console.log(JSON.stringify(nluResponse, null, 2));
    } catch (error) {
        console.error(error);
    }
}

getData();
