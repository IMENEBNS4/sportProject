// 1)import
// 2)traitement
// 3)export
// 1) importer le module installé dans une constante('nom de module' :express)
const express = require('express');

// importer le module installé body-parser
const bodyParser = require('body-parser');

// importer le module installé mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/sportDB');

// importer le module installé bcrypt
const bcrypt = require('bcrypt');

// importer le module installé jsonwebtoken
const jwt = require('jsonwebtoken');

// importer le module installé express session
const session = require('express-session');

// importer le module installé déja path
const path = require('path');

// importer le module installé multer
const multer = require('multer');

// 2)creates express application : app
const app = express();
// 3)app configuration : en utilisant use
// format de donnees json
app.use(bodyParser.json());
// recupere les objets from input: post et put
app.use(bodyParser.urlencoded({ extended: true }));
// Security configuration
app.use((req, res, next) => {
    // au lieu de permettre * au pls FE denvoyer des requetes , on peut utiliser le port du FE qu'on veut recevoir les requetes from.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, Accept, Content-Type, X-Requested-with, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, DELETE, OPTIONS, PATCH, PUT'
    );
    // il faut respecter tout pour passer a l'etape suivante: traitement
    next();
});

//Session Configuration (encodage decodage de resultat de retour)
const secretKey = 'croco24YT'; // clé permetant l'encodage
app.use(session({
    secret: secretKey,
}));


app.use('/shortcut', express.static(path.join('backend/images')))
const MIME_TYPE = // tt type de fichier que je peux accepter
 { 'image/png': 'png', 'image/jpeg': 'jpg',
'image/jpg': 'jpg' }
const storageConfig = multer.diskStorage({ 
    // destination
    destination: (req, file, cb) => {//multer lui vient req il doit repondre cb
    const isValid = MIME_TYPE[file.mimetype]; //mime type : fichier file contient cet attribut
    //is valid contient l'extension du cichier si le type de mon fchier selectionné appartient au type MIME TYPE déclaré précedemment
  
    if (isValid) {
    cb(null, 'backend/images')
    }
    },

    //rendre unique le nom
    filename: (req, file, cb) => { //req contient file
    const name = file.originalname.toLowerCase().split(' ').join('-');// file.originalName : nom réél du fichier maj+min==>miniscule 
    //+ espace devient -
    const extension = MIME_TYPE[file.mimetype];//tester le type de mon fichier et nsobbou fi extension
    const imgName = Date.now() + name + '-' + '-crococoder-' + '.' + extension; //concaténer
   
    cb(null, imgName);
    }
    });
    

//Models importation
const Match = require("./models/match");
const Player = require("./models/player");
const Team = require("./models/team");
const User = require("./models/user");



let matchesTab = [
    { id: 1, scoreOne: 2, scoreTwo: 3, teamOne: "CA", teamTwo: "EST" },
    { id: 2, scoreOne: 2, scoreTwo: 3, teamOne: "CA", teamTwo: "CAB" },
    { id: 3, scoreOne: 2, scoreTwo: 3, teamOne: "CA", teamTwo: "CSS" },
    { id: 4, scoreOne: 2, scoreTwo: 3, teamOne: "CA", teamTwo: "CSS" },
];

let players = [
    { id: 1, name: "Ahmed", position: "MK", number: 12, age: 25 },
    { id: 2, name: "Ahmed", position: "MK", number: 12, age: 25 },
    { id: 3, name: "Ahmed", position: "MK", number: 12, age: 25 }
];
let teams = [
    { id: 1, name: "CA", owner: "CA", foundation: 1960 },
    { id: 1, name: "EST", owner: "EST", foundation: 1850 },
    { id: 1, name: "CAB", owner: "CAB", foundation: 1970 }
];


//4) Traitement logique des requetes: business logic
////Match////
// business logic : Add Match
app.post("/matches", (req, res) => {
    console.log("here into BL: Add Match", req.body); //req.body==objet venant du FE
    let match = new Match(req.body);// match instance de type: Match (le model crée)
    //une fois le model Match est crée la collection matches sera crée

    // Insert /save match into matches(collection name)
    match.save(); //.save methode mongoose qui insere l'objet dans la collection adequate
    //send a response to the service sous format json
    res.json({ msg: "Added with success" });



});
// business logic : Edit Match 
app.put("/matches", (req, res) => {
    console.log("here into BL:Edit Match", req.body);
    let newMatch = req.body;
    // let pos = matchesTab.findIndex((elt) => elt.id == newMatch.id);
    // matchesTab[pos] = newMatch;
    // res.json({ msg: "Edited with success" });
    Match.updateOne({ _id: req.body._id }, newMatch).then( //celui qui a id recupéré du path,on lui update par nouvelle valeur
        (result) => { //reponse venant de bd 
            console.log("here result after update", result);
            if (result.nModified == 1) {
                // reponse au service
                res.json({ msg: true })
            }
            else {
                res.json({ msg: false })
            }
        }

    )
});
// business logic : Get All Matches
app.get("/matches", (req, res) => {
    console.log("here into BL:Get All Matches");
    Match.find().then( //meth predef mongoose retour soit tab de tt les obj des la collection matches soit null et son resultat recupéré par .then
        (docs) => { //docs tableau d'objet
            console.log("here all matches from collection", docs);
            res.json({ T: docs })
        })
});


// business logic : Delete Match By Id
//(/matches/:id) c'est un path paramétree
app.delete("/matches/:id", (req, res) => {// : car id dynamic changeant
    console.log("here into BL: Delete Match By Id", req.params.id);
    let matchId = req.params.id;
    // let pos = matchesTab.findIndex((elt) => elt.id == matchId);
    // console.log(pos);
    // matchesTab.splice(pos, 1);
    // res.json({ msg: 'Match is deleted with success' });
    Match.deleteOne({ _id: matchId }).then(
        (result) => {
            console.log("here result after delete", result);
            if (result.deleteCount == 1) {
                res.json({ isDeleted: true })
            }
            else {
                res.json({ isDeleted: false })
            }

        }

    )

});


// business logic : Get Match By Id
app.get("/matches/:id", (req, res) => {
    console.log("here into BL: Get  Match By Id", req.params.id);
    let matchId = req.params.id;
    // let data = matchesTab.find((elt) => elt.id == matchId);
    // console.log({ data: data });
    // res.json({ data: data });
    //recherche par id par methode pred mongoose 
    //Match.findOne(_id)
    Match.findById(matchId).then((doc) => {
        console.log(doc);
        res.json({ match: doc })
    })

});
// business logic : Search Match 
app.post("/matches/search", (req, res) => {
    console.log("here into BL: Search  Match By Id", req.body);
    let obj = req.body;
    let data = matchesTab.filter((elt) =>
        elt.scoreOne == obj.scoreOne &&
        elt.scoreTwo == obj.scoreTwo);
    res.json({ tab: data });
});

////Player////
// business logic : Get All Players
app.get("/players", (req, res) => {
    console.log("here into BL:Get All Players");
    Player.find().then(
        (docs) => {
            console.log("Here all Plyers from collection...", docs);
            res.json({players: docs })
        }
    )
});
// business logic : Delete Player
app.delete("/players/:id", (req, res) => {
    console.log("here into BL: Delete Player By Id", req.params.id);
    let playerId = req.params.id;
    let pos = matchesTab.findIndex((elt) => elt.id == playerId);
    console.log(pos);
    players.splice(pos, 1);
    res.json({ msg: 'Player is deleted with success' });

});
// business logic : Add Player
app.post("/players", (req, res) => {
    console.log("here into BL: Add Player", req.body);
    // let playerObj = new Player(req.body);
    // playerObj.save();
    // res.json({ msg: "Added with success" });
Team.findById(req.body.teamId).then (
    (doc)=> {
        console.log("here team:",doc)
    }
)
});
// business logic : Get Player By Id
app.get("/players/:id", (req, res) => {
    console.log("here into BL: Get Player By Id", req.params.id);
    let playerId = req.params.id;
    let data = players.find((elt) => elt.id == playerId);
    console.log({ data: data });
    res.json({ data: data });
});
// business logic : Edit Player
app.put("/players", (req, res) => {
    console.log("here into BL:Edit Player", req.body);
    let newPlayer = req.body;
    let pos = players.findIndex((elt) => elt.id == newPlayer.id);
    players[pos] = newPlayer;
    res.json({ msg: "Edited with success" });
});
// business logic : Search Player 
app.post("/players/search", (req, res) => {
    console.log("here into BL: Search  Player", req.body);
    let obj = req.body;
    let data = players.filter((elt) =>
        elt.age == obj.age);
    res.json({ tab: data });
});

////Team////
// business logic : Get All Teams
app.get("/teams", (req, res) => {
    console.log("here into BL:Get All Teams");
    Team.find().then(
        (docs) => {
            console.log("Here all teams from collections", docs);
            res.json({ teams: docs });
        }
    )
});

// business logic : Delete team
app.delete("/teams/:id", (req, res) => {
    console.log("here into BL: Delete Teams By Id", req.params.id);
    let teamId = req.params.id
    let pos = teams.findIndex((elt) => elt.id == teamId);
    console.log(pos);
    teams.splice(pos, 1);
    res.json({ isDeleted: 'Team is deleted with success' });
});


// business logic : Add team
app.post("/teams", (req, res) => {
    console.log("here into BL: Add Team", req.body);
    let teamObj = new Team(req.body);
    teamObj.save();
    res.json({ msg: "Added with success" });

});
// business logic : Get Team By Id
app.get("/teams/:id", (req, res) => {
    console.log("here into BL: Get Team By Id", req.params.id);
    let teamId = req.params.id;
    let data = teams.find((elt) => elt.id == teamId);
    console.log({ data: data });
    res.json({ data: data });
});
// business logic : Edit Team
app.put("/teams", (req, res) => {
    console.log("here into BL:Edit Team", req.body);
    let newTeam = req.body;
    // let pos = teams.findIndex((elt) => elt.id == newTeam.id);
    // teams[pos] = newTeam;
    // res.json({ msg: "Edited with success" });
    Team.updateOne({ _id: newTeam._id }, newTeam).then(
        (result) => {
            if (result.nModified == 1) {
                res.json({ msg: true });
            } else {
                res.json({ msg: false });
            }
        }
    )
});

// business logic : Signup
app.post("/users",multer({storage:storageConfig}).single('img'), (req, res) => {
    console.log("here into BL: Add User", req.body);
    //chercher un user par son email
    User.findOne({ email: req.body.email }).then( // si user avec cet email found il affiche l obj sinon affiche null dans le terminal
        (doc) => { //si user found  **** doc resultat de la rech de finone soit null si pas email similaire ancien sinon affihce l'objet en console
            console.log("here email", doc);
            if (doc) { //docs contient un objet signé avec email en parametre
                res.json({ msg: "User already exists" });
            }
            else { //docs = null
                bcrypt.hash(req.body.pwd, 10).then(// crypter le mdp
                    (cryptedPwd) => { //resulta dans cryptedPwd
                        console.log("here crypted pwd", cryptedPwd);
                        req.body.pwd = cryptedPwd; //retourner le mdp crypté dans req.body
                        // if (req.file) {
                        //     req.body.avatar=`http://localhost:3000/shortcut/${req.file.filename}`
                        // }
                        // else {
                        //     req.body.avatar=`http://localhost:3000/shortcut/avatar.jpg`
                        // }
                        (req.file)?
                        req.body.avatar=`http://localhost:3000/shortcut/${req.file.filename}`:
                        req.body.avatar=`http://localhost:3000/shortcut/avatar.jpg`;
                        
                        let userObj = new User(req.body);
                        userObj.save();
                        res.json({ isSaved: true });
                    }
                )
            }
        })
})


// business logic : Login
app.post("/users/login", (req, res) => {
    console.log("here into BL: login", req.body);
    //search user by email:
    User.findOne({ email: req.body.email }).then(
        (doc) => {
            console.log("here doc by email: ", doc);
            if (!doc) //pas d'object trouvé
            {
                res.json({ msg: "email does not exists" })
            }
            else {
                //compare password :
                bcrypt.compare(req.body.pwd, doc.pwd).then(
                    (result) => {
                        console.log("here result from bcrypt", result);
                        if (result) {
                            let userToSend = {
                                id: doc._id,
                                fName: doc.firstName,
                                lName: doc.lastName,
                                role: doc.role,
                                img:doc.avatar

                            }
                            //secretkey : chaine  généré automatiquement par le module JsonWebTokenError==usertosend encodé et mis dans token
                            let token = jwt.sign(userToSend, secretKey, { expiresIn: '1h' })
                            console.log("here token", token);
                            // retour de usertosend sous forme de token car déja encodé
                            res.json({ msg: "welcome", user: token });
                        }
                        else {
                            res.json({ msg: "plz check pwd" });
                        }

                    }

                )
            }
        }
    )
}
)




// 5) cette  application est exporté : sera importé dans d'autres fichiers : importable
module.exports = app;
