// importer le module BE express et le verser dans une constante
const express = require('express');

// importer le module body-parser
const bodyParser = require('body-parser');

// importer le module mongoose 
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/sportDB');


//creer une application express nommée app  dont sec déroule le traitement logic des req
const app = express()

//configuer l'application:
//1- retourner ttes les reponses sous formats JSON
app.use(bodyParser.json());
//2- recuperer un objet d'un req post/put qui envoient des objets
app.use(bodyParser.urlencoded({ extended: true }));


// Security configuration  
app.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", "*"); //tt FE peuvent m'envoyer des req

    res.setHeader(

        "Access-Control-Allow-Headers",// les config du headers des req accepté

        "Origin, Accept, Content-Type, X-Requested-with, Authorization"

    );

    res.setHeader(

        "Access-Control-Allow-Methods",// les methodes http qu'il peut accespter

        "GET, POST, DELETE, OPTIONS, PATCH, PUT"

    );

    next();//si les allow sont respecté alors on vous passe au traitement logique

});

//DB Simulation :
let matchesTab = [
    { id: 1, scoreOne: 2, scoreTwo: 3, teamOne: "CA", teamTwo: "CAB" },
    { id: 2, scoreOne: 0, scoreTwo: 2, teamOne: "CSS", teamTwo: "EST" },
    { id: 3, scoreOne: 2, scoreTwo: 1, teamOne: "CAB", teamTwo: "ESS" },
    { id: 4, scoreOne: 4, scoreTwo: 3, teamOne: "EST", teamTwo: "CSS" }
]

let playersTab = [
    { Name: "alex", Position: "ATK", Number: 23, Age: 26 },
    { Name: "dani", Position: "DEF", Number: 4, Age: 28 },
    { Name: "raoul", Position: "GAO", Number: 12, Age: 23 },
]


let teamsTab = [
    { Name: "EST", id: 1, foundation: 1919, Owner: "X" },
    { Name: "CA", id: 2, foundation: 1920, Owner: "Y" },
    { Name: "ESS", id: 3, foundation: 1923, Owner: "Z" },

]



//Business Logic :
//Business Logic : add Match
app.post("/matches", (req, res) => {
    console.log("here into BL :Add Match", req.body)
    let match = req.body;
    matchesTab.push(match);
    //res.json({msg:"object is added"})
    res.json({ isAdded: true })
})
//Business Logic : edit Match
app.put("/matches", (req, res) => {
    console.log("here into BL: Edit Match", req.body)
    let newMatch = req.body; //req body contient les nouv valeurs
    let pos = matchesTab.findIndex((elt) => elt.id == newMatch.id)
    matchesTab[pos] = newMatch;
    res.json({msg: "ok" })



})




//Business Logic : Get ALL Matches
app.get("/matches", (req, res) => {
    console.log("here into BL: Get All Match")
    res.json({ T: matchesTab }) //reponse sous format json grace a body-parser
})
//Business Logic : Delete Match by id
app.delete("/matches/:id", (req, res) => {  // :id veut dire que l'id est  dynamique
    console.log("here into BL: delete  Match by id", req.params.id)
    let matchId = req.params.id;
    //elt elt du tableau à chercher index ou id dr l'obj de la req= un id dans le tab
    let pos = matchesTab.findIndex((elt) => elt.id == matchId)
    console.log("la position du match à supprimer est : ", pos);
    matchesTab.splice(pos, 1);
    res.json({ isDeleted: true })


    //Business Logic : Delete Team by id
    app.delete('/teams/:id', (res, req) => {
        console.log("la reponse apres suppression du team : delete team", req.params.id)
        let teamId = req.params.id;
        //elt elt du tableau à chercher index ou id dr l'obj de la req= un id dans le tab
        let pos = teamsTab.findIndex((elt) => elt.id == teamId)
        console.log("la position du team à supprimer est : ", pos);
        teamsTab.splice(pos, 1);
        res.json({ isDeleted: true })
    }
    )
})




//Business Logic : get Matches by id
app.get("/matches/:id", (req, res) => {
    console.log("here into BL: Get Match by id", req.params.id)
    //get id from param
    let matchID = req.params.id;
    //.find()
    let match = matchesTab.find((elt) => elt.id == matchID)
    console.log("founded match", match);
    //send res res.json({})
    res.json({ m: match }) //m attribut a pour valeur l'objet match found en recherche(à afficher)
})


//Business Logic : players
//Business Logic :get all players
app.get("/players", (req, res) => {
    console.log("here into BL :get all Players")
    res.json({ P: playersTab })
})


//Business Logic : teams
//Business Logic :get all teams
app.get("/teams", (req, res) => {
    console.log("here into BL :get All Teams")
    res.json({ teams: teamsTab })
})





//rendre notre application importable a partir d'autres fichiers
module.exports = app