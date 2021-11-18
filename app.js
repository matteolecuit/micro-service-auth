const express = require("express");
const axios = require("axios");
const bodyparser = require("body-parser");
const crypto = require("crypto");

const REGISTRY = "http://10.8.0.2:1338";
let token;
const app = express();
app.use(bodyparser.json());
const port = 3000;

// Fonction lancée eu démarrage du service
const start = async () => {
  // Envoie d'une requete
  let response;
  try {
    response = await getKey();
    console.log(response.data);
    token = response.data;
    response = await getRegistry(token.token);
    console.log(response.data);
  } catch (e) {
    console.error(e.response ? e.response.data : e);
    return;
  }
};

const getKey = async () => {
  const response = await axios.post(
    `${REGISTRY}/register`,
    { host: "http://10.8.0.13:3000", code: "matteo.lecuit" },
    { auth: { username: "ynovset", password: "tHuds4752_525@" } }
  );
  return response;
};

const getRegistry = async (token) => {
  let response;
  try {
    response = await axios.get(`${REGISTRY}/registry`, {
      headers: {
        "X-Auth-Token": token,
      },
    });
  } catch (error) {
    console.log(error);
  }
  return response;
};
// Création d'un endpoint en GET
app.get("/ping", async (req, res) => {
  res.json(200);
});

app.get("/getkey", async (req, res) => {
  // Récuperer les headers
  let headers = req.headers;
  const response = await axios.post(
    `${REGISTRY}/validate`,
    { data_key: "" },
    { headers: { "my-custom-header": "xxx" } }
  );
  res.json(200);
});

// Création d'un endpoint en POST
app.post("/url_du_endpoint_en_post", async (req, res) => {
  // Récuération du body
  let body = req.body;
  let headers = req.headers;
  console.log(body);
  console.log(headers);
  res.json();
});

// Lancement du service
app.listen(port, () => {
  console.log(`Service listening at http://localhost:${port}`);
  start();
});

/**
 * Fonction de chiffrement
 * @param secretKey
 * @param publicKey
 * @returns {string}
 */
function encrypt(secretKey, publicKey) {
  return crypto.createHmac("sha256", secretKey).update(publicKey).digest("hex");
}
