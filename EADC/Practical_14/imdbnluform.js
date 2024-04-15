const express = require('express');
const bodyParser = require('body-parser');
const app = express();


const port = 8080;
var urlencodedParser = bodyParser.urlencoded({ extended: false }) 
const axios = require('axios');
const { IamAuthenticator } = require('ibm-watson/auth');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');

// Initialize Watson NLU
const nlu = new NaturalLanguageUnderstandingV1({
    authenticator: new IamAuthenticator({ apikey: 'DOp1iM-8lo9FisfBw5_FHl-g8dsiFZ3RhrdoXBebjNpy' }), // Replace 'YOUR_API_KEY' with your actual API key
    version: '2021-03-25',
    serviceUrl: 'https://api.eu-gb.natural-language-understanding.watson.cloud.ibm.com/instances/8a660346-4386-4458-8e11-23f367e1ab13', // Replace 'YOUR_INSTANCE_ID' with your actual instance ID
});


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
    
app.post('/', urlencodedParser, (req, res) => {
    console.log('Got body:', req.body);
x=req.body.dictionary_word;
console.log(x);
///////
const options = {
    method: 'GET',
    url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
    params: {
        term: req.body.dictionary_word
    },
    headers: {
        'X-RapidAPI-Key': 'd28dceda32msh54fb43633711ea9p101e78jsn03d0c5903b4d',
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
                sentiment:{},
                emotion:{}
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
  console.log(`Server running on port${port}`);
});
