const express = require('express')
const cors = require("cors");
const {getTemplate, getOneTemplate, createTemplate, deleteTemplate} = require("./sql");

const app = express()
const port = 3000

app.use(express.json());
app.use(cors());

app.get('/template', async (req, res) => {
    const template = await getTemplate();
    res.json(template);
})

app.get('/template/:id', async (req, res) => {
    const template = await getOneTemplate(req.params.id);
    res.json(template);
})

app.post("/template", async (req, res) => { 
    console.log();
    if(!req.body.title || !req.body.data || !req.body.user_id || !req.body.token){
        res.status(400).json({error: "title, data, pseudo and token is required "});
        return;
    }
    const gestionErrorTemplate = await createTemplate(req.body.title, req.body.data, req.body.user_id, req.body.token);
    res.json({status: "template added", template: {
      title: req.body.title,
      data:req.body.data,
      user_id: req.body.user_id,
      token: req.body.token
    }});
})

app.delete("/template/:id", async (req, res) => {
    const template = await deleteTemplate(req.params.id);
    res.json({ status : 'deleted', template});
})

app.listen(port, () => console.log(`API listening on port ${port}!`));