<h1> AuthentificationJWTToken </h1>
Creation de serveur avec express et d'un systeme d'authentification complet en utilisant vue js et les JWTToken
authentification, inscription, deconnexion, création de token, rafraichissement du token, verification de la validité du token, expiration du token, page de profile, mise en place de garde et d'interceptors...

<h3> use npm install for install the dependances </h3>

enter in ./client and use npm install
enter in ./server and use npm install

in ./server create a folder config.
in ./server/config create file JWT_SECRET.js

const JWT_SECRET = "{enter your secret here}"
module.exports = JWT_SECRET ;

in ./server/config create file mongoAccess.js

const mongoAccess = "{enter your database URL}"
module.exports = mongoAccess ;

dependances : axios, vue-router, vuex, express, express-generator, nodemon, bcrypt, jsonwebtoken, moment
