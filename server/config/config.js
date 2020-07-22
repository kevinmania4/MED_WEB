//=====================
//puerto
//=====================

process.env.PORT = process.env.PORT || 3001;

//=====================
//Vencimiento
//=====================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//=====================
//Semilla
//=====================
process.env.SEED = process.env.SEED || "secret";