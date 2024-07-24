const express = require ('express');
const admin = express.Router();
const db = require ("../config/database");
const jwt = require('jsonwebtoken');




admin.post ('/login', async (req, res, next) =>{
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


admin.post('/new-employee', async (req, res, next)=>{
    const {name, last_name, phone, mail, address} = req.body;
    if(name && last_name && phone && mail && address){
        let query = `INSERT INTO employees (name, last_name, phone, mail, address)`;
        query += `VALUES ('${name}', '${last_name}', '${phone}','${mail}', '${address}');`;

        const rows = await db.query(query);
        
        if (rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: "Usuario registrado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ha ocurrido un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});



admin.delete("/:id([0-9]{1,3})", async (req, res, next)=>{
    const query = `DELETE FROM employees WHERE employee_id = ${req.params.id} `;
    const rows = await db.query(query);

    
        if(rows.affectedRows == 1){
            return res.status(200).json({code:200, message:"Empleado borrado correctamente"});
    
        }

    
    return res.status(404).json({code:404, message:"Empleado no encontrado"});


});


admin.put("/:id([0-9]{1,3})", async(req, res, next)=>{

    const {name, last_name, phone, mail, address} = req.body;
    if(name && last_name && phone && mail && address){
        let query = `UPDATE employees SET name='${name}', last_name ='${last_name}',`;
        query += `phone = '${phone}', mail= '${mail}', address = '${address}'`;

        const rows = await db.query(query);

        if(rows.affectedRows == 1){
            return res.status(200).json({code: 200, message:"Empleado actualizado"});
        }
        return res.status(500).json({code: 500, message:"Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});


module.exports = admin;
