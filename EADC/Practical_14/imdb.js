
const axios = require('axios');

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