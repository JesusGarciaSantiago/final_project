window.onload = init;
var url = "http://localhost:3000";

function init (){
    if(!localStorage.getItem('token')){
        document.querySelector('.btn-primary').addEventListener('click', login);

    }else{
        window.location.href = "admin.html";
    }
}

function login(){
    var user_mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value;



    axios({
        method: 'post',
        url: url + '/admin/login',
        data: {
            mail: user_mail,
            user_pass: pass
        }
    }).then(function (res){
        if (res.data.code === 200){
            localStorage.setItem("token", res.data.message);
            window.location.href = "admin.html";
        }else {
            alert ("Correo y/o contraseña incorrectos");
        }
    }).catch(function(err){

    })
}