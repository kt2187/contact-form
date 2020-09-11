const container = document.querySelector('.container');
const btns = document.querySelectorAll('.tab-btn');
const content = document.querySelectorAll('.content');

// Add and remove active class to show or hide form when tab is clicked
container.addEventListener('click', e => {
  const id = e.target.dataset.id;
  if (id) {
    // Remove selected from other buttons
    btns.forEach(btn => {
      btn.classList.remove('active');
    });
    e.target.classList.add('active');
    // Hide other form
    content.forEach(content => {
      content.classList.remove('active');
    });
    const element = document.getElementById(id);
    element.classList.add('active');
  }
});

// Add and remove active/highlight classes to input labels on keyup, blur, and focus 
document.querySelectorAll('form .field-wrap').forEach(field => {
  const fieldInput = field.querySelector('input');
  const fieldLabel = field.querySelector('label');

  fieldInput.addEventListener('keyup', event => {
    const value = event.target.value;

    if (value === '') {
      fieldLabel.classList.remove('active', 'highlight');
    } else {
      fieldLabel.classList.add('active', 'highlight');
    }
  });

  fieldInput.addEventListener('blur', event => {
    const value = event.target.value;

    if (value === '') {
      fieldLabel.classList.remove('active', 'highlight');
    } else {
      fieldLabel.classList.remove('highlight');
    }
  });
});

// Validate submit form data
const validateSubmitForm = e => {
  e.preventDefault();

  const firstName = document.querySelector('#first-name');
  const lastName = document.querySelector('#last-name');
  const submitEmail = document.querySelector('#submit-email');
  const submitPassword = document.querySelector('#submit-password');

  if (firstName.value === '') {
    setErrorFor(firstName, 'First name cannot be blank');
  } else {
    setSuccessFor(firstName);
  }

  if (lastName.value === '') {
    setErrorFor(lastName, 'Last name cannot be blank');
  } else {
    setSuccessFor(lastName);
  }

  if (submitPassword.value === '') {
    setErrorFor(submitPassword, 'First name cannot be blank');
  } else {
    setSuccessFor(submitPassword);
  }

  if (submitPassword.value.length < 6) {
    setErrorFor(submitPassword, 'Password must be at least 6 characters');
  } else {
    setSuccessFor(submitPassword);
  }

  if (submitEmail.value === '') {
    setErrorFor(submitEmail, 'Email cannot be blank');
  } else {
    setSuccessFor(submitEmail);
  }

  if (!emailIsValid(submitEmail.value)) {
    setErrorFor(submitEmail, 'Please enter a valid email address');
  } else {
    setSuccessFor(submitEmail);
  }
}

const emailIsValid = email => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setErrorFor(input, message) {
  const fieldWrap = input.parentElement;
  const small = fieldWrap.querySelector('small');
  fieldWrap.className = 'field-wrap error';
  small.innerText = message;
}

function setSuccessFor(input) {
  const fieldWrap = input.parentElement;
  fieldWrap.className = 'field-wrap success';
}

document.querySelector('#submit-signup').addEventListener('click', validateSubmitForm);

// Validate login form data
const validateLoginForm = e => {
  e.preventDefault();

  const loginEmail = document.querySelector('#login-email');
  const loginPassword = document.querySelector('#login-password');

  if (loginEmail.value === '') {
    setErrorFor(loginEmail, 'Email cannot be blank');
  } else {
    setSuccessFor(loginEmail);
  }

  if (!emailIsValid(loginEmail.value)) {
    setErrorFor(loginEmail, 'Please enter a valid email');
  } else {
    setSuccessFor(loginEmail);
  }

  if (loginPassword.value === '') {
    setErrorFor(loginPassword, 'Please enter a password');
  } else {
    setSuccessFor(loginPassword);
  }

  if (loginPassword.value.length < 6) {
    setErrorFor(loginPassword, 'Password must be at least 6 characters');
  } else {
    setSuccessFor(loginPassword);
  }
}

document.querySelector('#login-submit').addEventListener('click', validateLoginForm);

// Signup form data 

const signupForm = [];

const addSignupData = e => {
  e.preventDefault();

  const signupFormData = {
    id: Date.now(),
    firstName: document.querySelector('#first-name').value,
    lastName: document.querySelector('#last-name').value,
    submitEmail: document.querySelector('#submit-email').value,
    submitPassword: document.querySelector('#submit-password').value
  }
  signupForm.push(signupFormData);
  document.querySelector('#form-one').reset();// Clear form for next entry

  console.log(JSON.stringify(signupForm, '\t', 2));

  // Save to local storage
  localStorage.setItem('#SignupFormData', JSON.stringify(signupForm));
}

document.querySelector('#submit-signup').addEventListener('click', addSignupData);


// Login form data 

let loginForm = [];

const addLoginData = e => {
  e.preventDefault();

  let loginFormData = {
    id: Date.now(),
    loginEmail: document.querySelector('#login-email').value,
    loginPassword: document.querySelector('#login-password').value
  }
  loginForm.push(loginFormData);
  document.querySelector('#form-two').reset();// Clear form for next entry

  console.log(JSON.stringify(loginForm, '\t', 2));

  // Save to local storage
  localStorage.setItem('LoginFormData', JSON.stringify(loginForm));
}

document.querySelector('#login-submit').addEventListener('click', addLoginData);