const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// showing the input error message 

function showError (input, message) { 
    const formControl = input.parentElement;
    formControl.className = 'form-control error';

    const small = document.querySelector('small');
    small.innerText = message;
}

// showing success 

function showSuccess (input) { 
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// checking if the input email is valid 

function checkEmail (input) { 
    const re = '/^';   // todo what are the strings that have been included in the re constant. remember to review while online 
    if (re.test(input.value.trim())) { 
        showSuccess(input);
    } else { 
        showError('The email you have entered is not valid')
    }
}

// checking all the requirements of the input fields are met 

function checkRequired (inputArr) { 
    let isRequired = false;
    inputArr.forEach( function (input) {
        if (input.value.trim() === '') { 
            showError(input, `${getFieldName(input)} is required`);

            isRequired = true;
        } else { 
            showSuccess(input);
        }
    });

    return isRequired;
}

// checking input length 

function checkLength (input, max, min) { 
    if (input.value.length < min) { 
        showError(input, `${getFieldName(input)} must be at least ${min} characters`)
    } else if (input.value.length > max) { 
        showError(input, `${getFieldName(input)} must be at most ${max} characters`)
    } else { 
        showSuccess(input);
    }
}

// checking if the entered passwords match 

function checkPasswordMatch (input1, input2) { 
    if (input1.value !== input2.value) { 
        showError(input2, 'Passwords do not match')
    }
}

// getting the field name 

function getFieldName(input) { 
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// event listeners 

form.addEventListener( 'submit', function(e) { 
    e.preventDefault();

    if(checkRequired([username, email, password, password2])) { 
        checkLength (username, 3, 15);
        checkLength (password, 8, 25);
        checkEmail(email);
        checkPasswordMatch(password, password2);
    }
});
