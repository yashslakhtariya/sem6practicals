
const axios = require('axios');
require('dotenv').config();

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


async function getData(){
    try {
        const response = await axios.request(options);
        console.log('\n\t Definition : ' + response.data.list[0].definition);
        console.log('\n\t Example : ' + response.data.list[0].example);
    } catch (error) {
        console.error(error);
    }
}

getData();