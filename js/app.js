
const usernameEl = document.querySelector('#nombre');
const apellidoEl = document.querySelector('#apellido');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#confirm-password');
const phoneEl = document.querySelector('#phone');

const form = document.querySelector('#Formulario');


const checkUsername = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'Nombre no puede estar en blanco.');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Nombre debe contener ${min} y ${max} de caracteres.`)
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};

const checkApellido = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const apellido = apellidoEl.value.trim();

    if (!isRequired(apellido)) {
        showError(apellidoEl, 'Apellido no puede estar en blanco.');
    } else if (!isBetween(apellido.length, min, max)) {
        showError(apellidoEl, `Apellido debe contener ${min} y ${max} de caracteres.`);
    } else {
        showSuccess(apellidoEl);
        valid = true;
    }
    return valid;
};
const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email no pueder estar en blanco.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email no es válido.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;


    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'Password no puede estar en blanco');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Password debe ser de minimo 8 caracteres e incluir 1 caracter en mayuscula, 1 caracter en minuscula, 1 numbero, y 1 un caracter especial (!@#$%^&*)');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};

const checkConfirmPassword = () => {
    let valid = false;
    // check confirm password
    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordEl, 'Please enter the password again');
    } else if (password !== confirmPassword) {
        showError(confirmPasswordEl, 'The password does not match');
    } else {
        showSuccess(confirmPasswordEl);
        valid = true;
    }

    return valid;
};

const checkPhone = () => {
    let valid = false;
    //const confirmPhone = confirmPhoneEl.value.trim();
    const phone = phoneEl.value.trim();
    const min = 9,
        max = 12;
    if (!isRequired(phone)) {
        showError(phoneEl, 'Número de telefóno no puede estar en blanco');
    } else if (!isPhoneValid(phone)){
        showError(phoneEl,'El número de teléfono debe ser Númerico');
    }else if (!isBetween(phone.length, min, max)) {
        showError(phoneEl, 'Número de teléfono debe tener un mínimo 9 carácteres (9 99999999)');
    }else {
        showSuccess(phoneEl);
        valid = true;
    }

    return valid;
};

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const isPhoneValid = (phone) => {
    const re = /^[0-9]+$/;
    return re.test(phone);
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';

    //window.location.reload();
}


form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isUsernameValid = checkUsername(),
        isApellidoValid = checkApellido(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();
        //isPhoneValid = checkPhone();

    let isFormValid = isUsernameValid &&
        isApellidoValid &&
        isEmailValid; //&&
        //isPasswordValid &&
        //isPhoneValid &&
        //isConfirmPasswordValid;

    // submit to the server if the form is valid
    if (isFormValid) {
        //window.location.reload();
        

    }
});


const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'apellido':
            checkApellido();
                break;    
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'phone':
            checkPhone();
            break;    
        case 'confirm-password':
            checkConfirmPassword();
            break;
    }
}));