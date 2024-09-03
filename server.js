//importer notre application BE app.js
const app = require('./backend/app') ;



//ecouter toutes requette ayant l'adreese http://localhost:3000 par notre server //ecouter les req venant du FE
app.listen(3000,()=>{
console.log('Express server is running on port 3000.... ')}); 