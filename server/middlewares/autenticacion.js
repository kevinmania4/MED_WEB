const jwt = require("jsonwebtoken");

//==========
//Verificar Tokeb
//=====

let verificaToken = (req, res, next) => {
    let token = req.get("token");

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err,
            });
        }

        req.usuario = decoded.usuario;
    });

    //next(); //obtener toda la informacion
    //console.log(token);
};
//==========
//Verificar Medico
//=====
let ver_doc = (req, res, next) => {
    let usuario = req.usuario;
    console.log(usuario);
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
};

module.exports = { verificaToken, ver_doc };