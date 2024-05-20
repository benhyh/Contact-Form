/*

*/

// Initializations (in order)
const form = document.querySelector('.container');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const generalEnquiry = document.getElementById('general-enquiry');
const supportRequest = document.getElementById('support-request');
const message = document.getElementById('message');
const consent = document.getElementById('consent');

// Errors (in order)
const firstNameError = document.querySelector('.first-name-error');
const lastNameError = document.querySelector('.last-name-error');
const emailError = document.querySelector('.email-error');
const queryError = document.querySelector('.query-error');
const messageError = document.querySelector('.message-error');
const consentError = document.querySelector('.consent-error');

// Radio active state
document.querySelectorAll('input[type="radio"]').forEach(function(radio){
    radio.addEventListener('change', function(){
        document.querySelectorAll('.radio-option').forEach(function(option){
            option.style.backgroundColor = '';
            option.style.borderColor = '';
        })
        this.parentNode.style.backgroundColor = 'var(--light-green)';
        this.parentNode.style.borderColor = 'var(--green)';
    })
})

// Function to check for empty fields
function checkEmpty(field, error) {
    if (field.value == "") {
        error.classList.remove('hidden');
        field.style.borderColor = 'var(--red)';
        setTimeout(function(){
            error.classList.add('hidden');
            field.style.borderColor = '';
        }, 3000);
        return false;
    }
    return true;
}

// Function to check for valid email address
function checkEmail(email, error) {
    if(email.value == "") {
        error.classList.remove('hidden');
        email.style.borderColor = 'var(--red)';
        setTimeout(function(){
            error.classList.add('hidden');
            email.style.borderColor = '';
        }, 3000);
        return false;
    } else if (email.value.indexOf('@') == -1 || 
               email.value.indexOf('.') == -1 ||
               email.value.indexOf(',') != -1 ||
               email.value.indexOf('/') != -1 ||
               email.value.indexOf(':') != -1 ||
               email.value.indexOf(';') != -1 ||
               email.value.indexOf('?') != -1 ||
               email.value.indexOf('!') != -1 ||
               email.value.indexOf('{') != -1 || 
               email.value.indexOf('}') != -1 ||
               email.value.indexOf('[') != -1 ||
               email.value.indexOf(']') != -1 ||
               email.value.indexOf('(') != -1 ||
               email.value.indexOf(')') != -1 ||
               email.value.indexOf('<') != -1 ||
               email.value.indexOf('>') != -1 ||
               // The list goes on, I'm sure there's a better way to do this.
               email.value.indexOf('@') > email.value.lastIndexOf('.') ||
               email.value.lastIndexOf('.') == email.value.length - 1 ||
               /\.{2,}/.test(email.value)) {
        error.classList.remove('hidden');
        email.style.borderColor = 'var(--red)';
        error.textContent = 'Please enter a valid email address';
        setTimeout(function(){
            error.classList.add('hidden');
            email.style.borderColor = '';
        }, 3000);
        return false;
    }
    return true;
}

// Function to check if a query type is selected
function checkQuery(queries, error) {
    let checked = false;
    queries.forEach(query => {
        if (query.checked) {
            checked = true;
            return;
        }
    });
    if (!checked) {
        error.classList.remove('hidden');
        setTimeout(function(){
            error.classList.add('hidden');
        }, 3000);
        return false;
    }
    return true;
}

// Function to check for consent checkbox
function checkCheckbox(checkbox, error) {
    if (!checkbox.checked) {
        error.classList.remove('hidden');
        setTimeout(function(){
            error.classList.add('hidden');
        }, 3000);
        return false;
    }
    return true;
}

// Toast message upon submission
form.addEventListener('submit', function(e){
    // if Statement with all validation checks (checkEmpty, checkEmail, checkQuery, checkCheckbox)
    if (!checkEmpty(firstName, firstNameError) || 
        !checkEmpty(lastName, lastNameError) || 
        !checkEmail(email, emailError) || 
        !checkQuery([generalEnquiry, supportRequest], queryError) ||
        !checkEmpty(message, messageError) ||
        !checkCheckbox(consent, consentError)){
            e.preventDefault();
        } else {
            e.preventDefault();
            e.target.reset();
            e.target.querySelector('.radio-option').style.backgroundColor = '';
            e.target.querySelector('.radio-option').style.borderColor = '';
            var toastBox = document.querySelector('.toastBox');
            toastBox.classList.remove('toastHidden');
            setTimeout(function(){
                toastBox.classList.add('toastHidden');
            }, 3000);
        }
});

