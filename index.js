const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')
const _ = require("lodash");
const { v4: uuid } = require("uuid");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const rootHandler = async (req, res) => {
    const url = req.protocol + '://' + req.get('host') + req.originalUrl;
    const data = {
        url,
        body: req.body,
        method: req.method,
    }
    console.log(">>> req:", data);
    await fs.writeFile("req.json", JSON.stringify(data, null, 2));
};

app.get("/", (req, res) => {
    rootHandler(req, res);
    res.status(201).json({ success: true });
});

app.post("/", (req, res) => {
    rootHandler(req, res);
    res.status(201).json({ success: true });
});

app.get("/req", async (req, res) => {
    let content;

    try {
        content = await fs.readFile("req.json", "utf-8");
    } catch (err) {
        return res.sendStatus(404);
    }

    res.json({ content });
})

app.listen(3000, () => console.log("API Server running..."));
