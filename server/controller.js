const fortune = require('./fortune.json')
const dreamers = require('./goals.json')

let globalID = 6;

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
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
        res.status(200).send(dreamers);
    },

    createDreamer: (req, res) => {
        let {name, goals, ratings} = req.body;
        let newDreamer = {
            id: globalID,
            name: name,
            goals : goals,
            ratings : ratings
        }
        dreamers.push(newDreamer);
        globalID++;
        res.status(200).send(dreamers)
    },
    deleteDreamer: (req, res) => {
        let index = dreamers.findIndex((el) => el.id === Number(req.params.id));
        dreamers.splice(index, 1)
        res.status.send(dreamers);
    },
    updateDreamer: (req, res) => {
        let {id} = req.params
        let {type} = req.body
        let index = dreamers.findIndex(el => Number(el.id) === Number(id))

        if(dreamers[index].ratings === 5 && type === 'plus') {
            res.status(400).send('cannot go above 5')
        } else if (dreamers[index].ratings === 0 && type === 'minue') {
            res.status(400).send('cannot go below 0')
        } else if (type === 'plus') {
            dreamers[index].rating++
            res.status(200).send(dreamers)
        } else if (type === 'minus') {
            dreamers[index].rating--
            res.status(200).send(dreamers)
        } else {
            res.sendStatus(400)
        }
    }

}