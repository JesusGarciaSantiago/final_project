window.onload = init;
var headers = {};
var url = "http://localhost:3000/admin";

function init() {
    if (localStorage.getItem('token')) {
        headers = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };

        document.getElementById('back').addEventListener('click', () => window.location.href = "admin.html");
        document.getElementById('register').addEventListener('click', registrar);
    } else {
        window.location.href = "index.html";
    }
}

function registrar() {
    var name = document.getElementById('input-name').value;
    var last_name = document.getElementById('input-last-name').value;
    var phone = document.getElementById('input-phone').value;
    var mail = document.getElementById('input-mail').value;
    var address = document.getElementById('input-address').value;

    if (name !== "" && last_name !== "" && mail !== "" && phone !== "" && address !== "") {
        axios.post("http://localhost:3000/admin/new-employee", {
            "name": name,
            "last_name": last_name,
            "phone": phone,
            "mail": mail,
            "address": address
        }).then(res => {
            console.log(res.data);
            console.log(res.data); // Verifica la respuesta completa
            if (res.data.code === 200) {
                alert(`${res.data.message}`);
                window.location.href = "admin.html";
            } else {
                alert(`${res.data.message}`);
            }
        }).catch(err => {
            console.log(err);
        });

    } else {
        alert("Valores incompletos");
    }
}
