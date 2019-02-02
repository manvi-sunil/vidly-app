const Joi = require('joi');
const express = require('express');
const app = express();
const genres = [
    {id:1, name:"ACTION"},
    {id:1, name:"COMEDY"}
];
//Default server response
app.get('/', (req, res)=>{
    res.send('<H1>VIDLY HOME PAGE</H1>');
});

app.get('/api/genres', (req, res)=>{
    res.send(genres);
});

//Get list of all genres details
app.get('/api/genres/:id', (req, res)=>{
    if(req.params.id) {
        const genresItem = genres.find(item=>item.id === parseInt(req.params.id,10))
        if(genresItem){ 
            res.send(genresItem);
        } else  {
            res.status(404).send("Invalid Genres item");            
        }
        
    } else {
        res.send(genres);
    }    
});

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    const { error } = validateGenres(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    console.log(req.body);
    genre.name = req.body.name; 
    res.send(genre);
  });

app.post('/api/genres/genres', (req, res)=>{
    const { error } = validateGenres(req.body);
    if (error) {
        return res.status(400).send(error);
    }
    const newGenres = {
        id: genres.length =1,
        name: req.body.name        
    };
    genres.push(newGenres);
    res.send(genres);
});

const validateGenres = (genres)=> {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genres, schema)
}

// PORT number
const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`Listening on the ${port}`));