window.onload = init;
var headers = {};
var paramsURL = new URLSearchParams(window.location.search);
var id = paramsURL.get ('id');



function init(){
    if(localStorage.getItem('token')){
        headers = {
            headers:{
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        }
        let conf = confirm ("¿Estás seguroo de querer borrar a este empleado?");
        if(conf){
            deleteEmployee(); 


        }else {
            window.location.href = 'admin.html';
        }
    }
}


function deleteEmployee(){
    axios.delete(`http://localhost:3000/'${id}'`, headers).then(res =>{
        alert(res.data.message);
        window.location.href = "admin.html"
    }).catch(err => console.log(err));
    window.location.href = "admin.html";
}