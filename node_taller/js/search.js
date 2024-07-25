window.onload = init;
const eCT = document.querySelector("[data-user-template]"); 
const eCC = document.querySelector("[data-user-cards-container]");
const sInput = document.querySelector("[data-search]");

let employees = [];

function init(){
    if(localStorage.getItem('token')){
        headers = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        searchEmployee();

        sInput.addEventListener("input", input => {
            const value = input.target.value.toLowerCase();

            employees.forEach(employee => {
                const isVisible = 
                    employee.name.toLowerCase().includes(value) ||
                    employee.last_name.toLowerCase().includes(value) ||
                    employee.mail.toLowerCase().includes(value) ||
                    employee.phone.includes(value) ||
                    employee.address.toLowerCase().includes(value) ||
                    employee.employee_id == value;
                employee.element.classList.toggle("hide", !isVisible);    
            });
        });
    } else {
        window.location.href = 'index.html';
    }
}

function searchEmployee(){
    axios.get("http://localhost:3000/admin/", headers).then(res => {
        employees = res.data.message.map(input => {

            const card  = eCT.content.cloneNode(true).children[0];
            const data_id = card.querySelector("[data-id]");
            const data_name = card.querySelector("[data-name]");
            const data_last_name = card.querySelector("[data-last-name]");
            const data_number = card.querySelector("[data-number]");
            const data_mail = card.querySelector("[data-email]");
            const data_address = card.querySelector("[data-address]");
            let data_operations = card.querySelector("[data-operations]");
            let operations;

            data_id.textContent = input.employee_id;
            data_name.textContent = input.name;
            data_last_name.textContent = input.last_name;
            data_number.textContent = input.phone;
            data_mail.textContent = input.mail;
            data_address.textContent = input.address;

            operations = `<a href="edit.html?id=${input.id}" class="btn btn-secondary"><i class="fas fa-marker"></i></a>`;
            operations += `<a href="delete.html?id=${input.id}" class="btn btn-danger" id="delete"><i class="fas fa-trash-alt"></i></a>`;
            data_operations.innerHTML = operations;

            eCC.append(card);

            return {
                employee_id: input.id,
                name: input.name,
                last_name: input.last_name,
                phone: input.phone,
                mail: input.mail,
                address: input.address,
                element: card 
            };
        });
    });
}
