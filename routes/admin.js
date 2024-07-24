const express = require ('express');
const admin = express.Router();
const db = require ("../config/database");
const jwt = require('jsonwebtoken');




admin.post ("/login", async (req, res, next) =>{
    const {mail, user_pass} = req.body;
    const query = `SELECT * FROM admin WHERE mail = '${mail}' AND user_pass = '${user_pass}'`;
    const rows = await db.query (query);

    if(mail && user_pass){
        if(rows.length == 1){
            const token = jwt.sign({
                user_id: rows[0].user_id,
                mail: rows[0].mail
            }, "debugkey");
            return res.status(200).json({code:200, message:token});

        }else{

            return res.status(201).json({code:201, message: "Usuario y/o contraseña incorrectos"});
            
        }
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

module.exports = admin;
