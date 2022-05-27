const express = require("express");
const cors = require("cors");
const axios = require("axios")

const app = express();

app.use(cors());

app.use(express.json());

const { getCompliment } = require('./controller')
const controllerFile = require('./controller')

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", controllerFile.getFortune)

app.get("/api/dreamers", controllerFile.getDreamers);
app.post("/api/dreamers", controllerFile.createDreamer)
app.delete("/api/dreamers", controllerFile.deleteDreamer);
app.put("/api/dreamers", controllerFile.updateDreamer)


app.listen(4000, () => console.log("Server running on 4000"));
