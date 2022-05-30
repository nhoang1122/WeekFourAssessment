const dreamer = require('./db.json')
const fortune = require('./fortune.json')

let globalID = 11; //11 BC ARRAY ENDED AT 10

module.exports = {
    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar.", "You are BEAUTIFUL!", "Hey, I like your smile.", "Keep it G."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },
    getFortune: (req, res) => {
        let index = Math.floor(Math.random() * fortune.length);
        let fortuneCookie = fortune[index].fortune;
        res.status(200).send(fortuneCookie)
    },
    getDreamers: (req, res) => {
        res.status(200).send(dreamer);
    },
    deleteDreamer: (req, res) => {
        let index = dreamer.findIndex((elem) => elem.id === +req.params.id);
        dreamer.splice(index, 1);
        // console.log(movies);
        res.status(200).send(dreamer);
    },
    createDreamer: (req,res) => {
        // console.log("HITTA")
        let {name,goals,ratings} = req.body;
        // console.log(title, rating, imageURL)
        let newDreamer = {
            id: globalID,
            name: name,
            goals: goals,
            ratings: ratings
        };
        dreamer.push(newDreamer);
        globalID++;
        res.status(200).send(dreamer);
    },
    updateDreamer: (req,res) => {
        // console.log(req.params, req.body, req.query);
        let {id} = req.params;
        let {type} = req.body;
        
        let index = dreamer.findIndex(elem => Number(elem.id) === Number(id))

        if (dreamer[index].ratings === 5 && type === 'plus') {
            res.status(400).send('cannot go above 5')
        } else if (dreamer[index].ratings === 0 && type === 'minus') {
            res.status(400).send('cannot go below 0')
        } else if (type === 'plus') {
            dreamer[index].ratings++
            res.status(200).send(dreamer)
        } else if (type === 'minus') {
            dreamer[index].ratings--
            res.status(200).send(dreamer)
        } else {
            res.sendStatus(400)
        }
    }
};