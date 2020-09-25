'use strict';
 
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

/** Cria um app express */
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

var corsOrigem = {origin: 'http://localhost:8080'};

/** Adiciona o cors
 * deixando vazio o cors 
 * faz a tradução de qualquer domínio
 */
app.use(cors());

// Adiciona o body-parse
app.use(bodyParser.json());

// Analisa requisições de content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

/** Criando a conexão com o Banco de Dados MongoDB */
db.mongoose
  .connect(dbConfig.HOST_MONGODB_NET, { // `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

  /** Inicializando a coleção de roles */
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// Rotas
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// Seta a porta e fica escutando as requisições
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// O que foi feito apenas no código acima:
// - importação express, body-parsere cors módulos:

// - Express é para construir as apis Rest
// - body-parser ajuda a analisar a solicitação e criar o req.body objeto
// - cors fornece middleware Express para habilitar CORS