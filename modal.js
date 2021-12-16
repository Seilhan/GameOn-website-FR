function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formDatas = document.querySelectorAll(".formData");
const modalClose = document.querySelectorAll(".closebtn");
const form = document.getElementById('form');
const validMsg = document.getElementById('valid');

// REGEX
const regexEmail = /^([a-z0-9_\.-]+\@[\da-z\.-]+\.[a-z\.]{2,6})$/; // email check
const regexquantity = /[0-9]{1,9}/; // quantity chek

// Error messages
const msgError = {
    "firstName": "Veuillez indiquer votre prénom",
    "lastName": "Veuillez indiquer votre nom",
    "email": "Veuillez entrer une adresse email valide.",
    "birthDate": "Veuillez entrer une date de naissance respectant le format JJ/MM/AAAA.",
    "quantity": "Veuillez entrer un nombre valide.",
    "location1": "Veuillez choisir une ville.",
    "checkbox1": "Veuillez accepter les conditions.",
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));


// Open modal form
function launchModal() {
    form.reset();
    form.style.display = "block";
    valid.classList.remove("show");
    modalbg.style.display = "block";
}

// close modal event
modalClose.forEach((btn) => btn.addEventListener("click", closeModal));


// close modal form
function closeModal() {
    modalbg.style.display = "none";
}

function setMesgError(er, formData, id) {
    if (er) {
        formData.setAttribute("data-error-visible", "true");
        formData.setAttribute("data-error", msgError[id]);
        return false;
    } else {
        formData.removeAttribute("data-error-visible");
        return true;
    }
}


// validate modal form
function validate() {

    const inputArray = new Array();
    formDatas.forEach(formData => {

        const id = formData.querySelector('input').getAttribute('id');

        switch (id) {
            case 'firstName':
                inputArray.push(setMesgError(formData.querySelector('input').value.trim().length < 2, formData, id));
                break;

            case 'lastName':
                inputArray.push(setMesgError(formData.querySelector('input').value.trim().length < 2, formData, id));
                break;

            case 'email':
                inputArray.push(setMesgError(!regexEmail.test(formData.querySelector('input').value), formData, id));
                break;

            case 'birthDate':
                inputArray.push(setMesgError(new Date(formData.querySelector('input').value) > new Date(), formData, id));
                break;

            case 'quantity':
                inputArray.push(setMesgError(!formData.querySelector('input').value, formData, id));
                break;

            case 'location1':
                inputArray.push(setMesgError(!formData.querySelector('input:checked'), formData, id));
                break;

            case 'checkbox1':
                inputArray.push(setMesgError(!formData.querySelector('input').checked, formData, id));
                break;

            default:
                break;
        }
    });

    if (inputArray.filter(e => !e).length === 0) {
        form.style.display = "none";
        valid.classList.add("show");
    }

    return false;
}