
const express = require('express')
const axios = require('axios')
const crypto = require('crypto')

const app = express()
const port = 3000;


// Fonction lancée eu démarrage du service
const start = async () => {

    // Envoie d'une requete
    let body = {}
    let config = {
        headers: {}
    }
    let response;
    try {
        response = await axios.post("http://<host>:<port>", body, config);
    }catch(e){
        console.error(e.response ? e.response.data : e)
        return
    }
    console.log(response.data);

}

// Création d'un endpoint en GET
app.get('/url_du_endpoint_en_get', async (req, res) => {
    let headers = req.headers;
    res.json()
})

// Création d'un endpoint en POST
app.post('/url_du_endpoint_en_post', async (req, res) => {
    let body = req.body;
    let headers = req.headers;
    res.json()
})


// Lancement du service
app.listen(port, () => {
    console.log(`Service listening at http://localhost:${port}`)
    start();
})



/**
 * Fonction de chiffrement
 * @param secretKey
 * @param publicKey
 * @returns {string}
 */
function encrypt(secretKey , publicKey){
    return crypto.createHmac('sha256', secretKey)
        .update(publicKey)
        .digest('hex');
}
