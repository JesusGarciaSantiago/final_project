window.onload = init;
var url = "http://localhost:3000/admin";
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
        let conf = confirm ("¿Estás seguro de querer borrar a este empleado?");
        console.log(id);
        (conf) ? deleteEmployee () : window.location.href = 'admin.html';
    }else{
        window.location.href = 'index.html';
    }
}


function deleteEmployee(){
    axios.delete(url + `/${id}`, headers).then(res =>{
        alert(res.data.message);
        window.location.href = "admin.html"
    }).catch(err => console.log(err));
    window.location.href = "admin.html";
}