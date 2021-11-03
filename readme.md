# Client microservice

Ce projet est un template pour l'implémentation d'un service au sein d'une architecture microservice.

## Annuaire

L'annuaire microservice met à disposition les endpoints suivants :

### Enregistrement d'un microservice

Ce endpoint enregistrera votre microservice au sein de l'annuaire à condition que le code soit valide et que le host 
soit joignable.

*Attention, pour pouvoir s'enregistrer, le microservice doit exposer un endpoint GET /ping qui sera appelé régulièrement par l'annuaire afin de vérifier que votre service est toujours disponible. Dans le cas contraire, votre service sera automatiquement supprimé de l'annuaire.*

- URL : **${host_annuaire}/register**
- METHOD : **POST**
- AUTHENTICATION TYPE : **Basic** (Username : ynovset, Password : tHuds4752_525@)

Input :

Type : JSON object

|Name|Description|Type| 
|---|---|---|
| host | Host du microservice (ex : http://192.168.1.23:8080) |  String |
| code | Identifiant du microservice (ex : john.doe) | String |

Output :

Type : JSON object

|Name|Description|Type| 
|---|---|---|
| secret_key | Clef privée |  String |
| public_key | Clef publique | String |
| token | Jeton d'authentification | String |

Response codes :

|Status|Description|
|---|---|
| 200 | Le service a bien été enregistré |  
| 400 | Un des paramètres obligatoires est manquant |
| 401 | Le code du service indiqué est invalide |
| 403 | Authentification invalide |
| 500 | Erreur inconnue (serveur) |
| 502 | Le service ne répond pas à l'adresse GET *${host}/ping* |


### Lister les microservices enregistrés

Ce endpoint permet de récuperer la liste de tous les microservices enregistrés ou en attente d'enregistrement.

- URL : **${host_annuaire}/registry**
- METHOD : **GET**
- AUTHENTICATION TYPE : **Token** (x-auth-token header)

Input :

Type : *None*

Output :

Type : JSON array

|Name|Description|Type| 
|---|---|---|
| host | Host du microservice |  String/null |
| code | Code | Code du microservice |

Response codes :

|Status|Description|
|---|---|
| 200 | OK |  
| 403 | Authentification invalide |
| 500 | Erreur inconnue (serveur) |

### Vérifier un token d'authentification

Ce endpoint permet de verifier qu'un jeton d'authenfification .

- URL : **${host_annuaire}/token/validate**
- METHOD : **POST**
- AUTHENTICATION TYPE : **Token** (x-auth-token header)

Input :

Type : JSON object

|Name|Description|Type| 
|---|---|---|
| token | Token à valider |  String |

Output :

Type : JSON array

|Name|Description|Type| 
|---|---|---|
| host | Host du microservice |  String/null |
| code | Code | Code du microservice |

Response codes :

|Status|Description|
|---|---|
| 200 | OK |  
| 403 | Authentification invalide |
| 500 | Erreur inconnue (serveur) |


### Déverrouiller un lien avec un microservice

Ce endpoint deverrouille un lien avec un microservice.

- URL : **${host_annuaire}/unlock**
- METHOD : **POST**
- AUTHENTICATION TYPE : **Token** (x-auth-token header)

Input :

Type : JSON object

|Name|Description|Type| 
|---|---|---|
| code | Code du microservice emetteur de la clef |  String |
| key | Clef fourni par le microservice |  String |

Output :

Type :  *None*

Response codes :

|Status|Description|
|---|---|
| 200 | OK |  
| 400 | Un des paramètres obligatoires est manquant |
| 402 | Clef fourni invalide |
| 403 | Authentification invalide |





