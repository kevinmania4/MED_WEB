const jwt = require("jsonwebtoken");

//==========
//Verificar Tokeb
//=====

let verificaToken = (req, res, next) => {
    let tokennn = req.get("token4");
    console.log("En el HEAD--------->", tokennn);
    let token = req.query.token;
    console.log("validacion-->", token);

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).send(err);
        }

        req.usuario = decoded.usuario;
        req.prueba = decoded.usuario._id;
        req.token = token

    });
    next();
    //console.log(token);
};
//==========
//Verificar Medico
//=====
let ver_doc = (req, res, next) => {
    let token = req.get("token");
    let usuario = req.usuario;
    console.log("U->", usuario);
    console.log('T->', token);
    /*
    if (usuario.perfil == "USER_MEDICO") {
        next();
    } else {
        return res.status(400).json({
            ok: false,
            err: {
                message: "El usuario no es medico",
            },
        });
    }
    res.send("metodo vec_doc");
    */
    next();
};

module.exports = { verificaToken, ver_doc };