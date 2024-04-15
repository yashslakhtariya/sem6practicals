const axios = require('axios');
const { IamAuthenticator } = require('ibm-watson/auth');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');

// Initialize Watson NLU
const nlu = new NaturalLanguageUnderstandingV1({
    authenticator: new IamAuthenticator({ apikey: '525_IRJ1zd1sGmM4Ga-yGEekmqUeLw5NPg-HLHVT24_I' }), // Replace 'YOUR_API_KEY' with your actual API key
    version: '2021-03-25',
    serviceUrl: 'https://api.eu-gb.natural-language-understanding.watson.cloud.ibm.com/instances/47885ddf-d3c1-4ca0-a438-57be5bb5e6f3', // Replace 'YOUR_INSTANCE_ID' with your actual instance ID
});

const options = {
    method: 'GET',
    url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
    params: {
        term: 'devotion'
    },
    headers: {
        'X-RapidAPI-Key': 'd971976965msh86c63f664a1ca02p10db23jsne5dd51351a67',
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
