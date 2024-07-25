window.onload = init;
var headers = {};
var url = "http://localhost:3000/admin/";
var paramsURL = new URLSearchParams(window.location.search);
var id = paramsURL.get('employee_id');

function init() {
    if (localStorage.getItem('token')) {
        headers = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
        loadValues();
        document.getElementById('back').addEventListener('click', () => window.location.href = "admin.html");
        document.getElementById("update").addEventListener('click', update);
    } else {
        window.location.href = "index.html";
    }
}

function loadValues() {
    axios.get(url + id, headers)
    .then(res => displayValue(res.data.message))
    .catch(err => console.error(err));
}

function displayValue(value) {
    let name = document.getElementById('input-name');
    let last_name = document.getElementById('input-last-name');
    let phone = document.getElementById('input-phone');
    let mail = document.getElementById('input-mail');
    let address = document.getElementById('input-address');
    name.value = value[0].name;
    last_name.value = value[0].last_name;
    phone.value = value[0].phone;
    mail.value = value[0].mail;
    address.value = value[0].address;
}

function update() {
    var name = document.getElementById('input-name').value;
    var last_name = document.getElementById('input-last-name').value;
    var phone = document.getElementById('input-phone').value;
    var mail = document.getElementById('input-mail').value;
    var address = document.getElementById('input-address').value;

    axios.put(url + id, {
        name: name,
        last_name: last_name,
        phone: phone,
        mail: mail,
        address: address
    }, headers)
    .then(res => {
        if (res.data.code === 200) {
            alert(`${res.data.message}`);
            window.location.href = "admin.html";
        } else {
            alert(`${res.data.message}`);
        }
    })
    .catch(err => {
        console.log(err);
        alert("Error al actualizar el empleado");
    });
}
