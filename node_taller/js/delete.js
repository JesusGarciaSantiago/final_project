window.onload = init;
var url = "http://localhost:3000/admin/";
var headers = {};
var paramsURL = new URLSearchParams(window.location.search);
var id = paramsURL.get('employee_id');  // Cambiado a 'employee_id'

function init() {
    if (localStorage.getItem('token')) {
        headers = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        // Verificar el valor de id
        console.log("Valor de employee_id antes de la verificación:", id);
        if (id === null || id.trim() === "") {
            alert("Employee ID no encontrado en la URL");
            window.location.href = 'admin.html';
            return;
        }

        let conf = confirm("¿Estás seguro de querer borrar a este empleado?");
        if (conf) {
            deleteEmployee();
        } else {
            window.location.href = 'admin.html';
        }
    } else {
        window.location.href = 'index.html';
    }
}

function deleteEmployee() {
    axios.delete(url + id, headers).then(res => {
        alert(res.data.message);
        window.location.href = "admin.html";
    }).catch(err => {
        console.log(err);
        alert("Error al borrar el empleado");
        window.location.href = "admin.html";
    });
}
