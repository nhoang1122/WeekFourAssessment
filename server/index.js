const express = require("express");
const cors = require("cors");

const app = express();

const { getCompliment } = require('./controller')
const controllerFile = require("./controller");

app.use(express.json());
app.use(cors());

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", controllerFile.getFortune)

app.get("/api/dreamer", controllerFile.getDreamers);
app.delete("/api/dreamer/:id", controllerFile.deleteDreamer);
app.post("/api/dreamer", controllerFile.createDreamer);
app.put("/api/dreamer/:id", controllerFile.updateDreamer);

app.listen(4004, () => console.log(`running on 4004`));
