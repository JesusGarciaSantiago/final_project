window.onload = init;
var headers = {};
var url = "http://localhost:3000";


function init(){
    if(localStorage.getItem('token')){
        headers = {
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('token')
            }
        }
        loadEmployee();

        document.getElementById("new-user").addEventListener('click', () => window.location.href = 'new-employee.html');
        document.getElementById("log-out").addEventListener('click', logout);

    }else{
        window.location.href = 'index.html';
    }
}


function loadEmployee(){
    axios.get(url +"/admin/", headers).then(function(res){
        displayEmployee(res.data.message);
    }).catch (function(err){
        console.log(err);
    });
}

function displayEmployee(employee) {
    var table = document.getElementById("table");
    let stringTable = "<thead class=\"table-dark\"><tr><th>Id</th><th>Name</th><th>Last names</th>";
    stringTable += "<th>Phone number</th><th>Email</th><th>Address</th><th>Operations</th></tr></thead><tbody>";
    for (let e of employee) {
        let row = `<tr><td>${id}</td>`;
        row += `<td>${name}</td>`;
        row += `<td>${last_name}</td>`;
        row += `<td>${phone}</td>`;
        row += `<td>${mail}</td>`;
        row += `<td>${address}</td>`;
        row += `<td><a href=\"edit.html?id=${id}\" class=\"btn btn-secondary\">`;
        row += `<i class=\"fas fa-marker\"></i></a>`;
        row += `<a href=\"delete.html?id=${id}\" class=\"btn btn-danger\" id=\"delete\">`;
        row += `<i class=\"fas fa-trash-alt\"></i></a></td></tr>`;
        stringTable += row;
    }
    table.innerHTML = stringTable + '</tbody>';
}
function logout() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}