const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai");
const { reset } = require('nodemon');

const app = express();
const port = 3001;

const apiKey = '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'

app.use(express.json())
app.use(cors());

app.post('/createQuery', async (req, res) => {
    var query = req;
    query = query.body;
    query = query['query']
    response = await askQuestion(query)
    if(response){
        res.send(response)
        console.log('sent!')
    }
})

app.post('/createImage', async(req, res) =>{
    var query = req
    query = query.body
    query = query['query']
    response = await createImage(query)
    if(response){
        res.send(response)
        console.log('sent!')
    }
})

app.listen(port, ()=>{
    console.log('listening on port ' + port);
})

async function askQuestion(query){
    const configuration = new Configuration({
        apiKey: apiKey,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: query,
        max_tokens: 4000,
        temperature: 0,
    });
    console.log(response.data.choices)
    return response.data.choices
}

async function fix(){
    const configuration = new Configuration({
        apiKey: apiKey,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createEdit({
        model: "text-davinci-edit-001",
        input: "What day of the wek is it?",
        instruction: "Fix the spelling mistakes",
    });
    console.log(response.data.choices)
}

async function createImage(query){
    const configuration = new Configuration({
        apiKey: apiKey,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
        prompt: query,
        n: 2,
        size: "1024x1024",
    });
    console.log(response.data)
    return response.data
}

