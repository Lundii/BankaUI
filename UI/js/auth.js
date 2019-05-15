let signup = () => {
  const url = 'https://mighty-retreat-71326.herokuapp.com/api/v1/auth/signup'
  const form = document.querySelector('#signupForm').elements;
  const data = {
    firstName: form[0].value,
    lastName: form[1].value,
    email: form[2].value,
    password: form[3].value,
    confirmPassword: form[4].value
  };
  console.log(data);
  const fetchData = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }
  fetch(url, fetchData)
  .then((res) => res.json())
  .then(function(data) {
    localStorage.setItem('ClientUser', JSON.stringify(data));
      if (data.status === 200) {
      window.location.href = '../pages/userPages/createNewAccount.html';
      }
      else {
        let errorDiv = document.querySelector('#errors2');
        const errorNodes = errorDiv.childNodes;
        const length = errorNodes.length;
        for (let i = 0; i < length; i++) {
            errorDiv.removeChild(errorNodes[0]);
        }
        const errors = data.error.split('|  ');
        errors.forEach((error, index) => {
          const para = document.createElement('p');
          para.classList.add('txt-sm', 'col-danger', 'lf-align', 'error');
          para.innerHTML = error;
          errorDiv.appendChild(para);
        });
      }
  })
  .catch(function(error) {
      console.log(error)
  })
}

let signin = () => {
  const url = 'https://mighty-retreat-71326.herokuapp.com/api/v1/auth/signin'
  const form = document.querySelector('#loginForm').elements;
  const data = {
    email: form[0].value,
    password: form[1].value,
  };
  const fetchData = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }
  fetch(url, fetchData)
  .then((res) => res.json())
  .then(function(data) {
      if (data.status === 200) {
        switch (data.data.type) {
          case 'client': {
            localStorage.setItem('ClientUser', JSON.stringify(data));
            break;
          }
          case 'staff': {
            if (data.data.isadmin)
              localStorage.setItem('AdminUser', JSON.stringify(data));
            else 
              localStorage.setItem('StaffUser', JSON.stringify(data));
            break;
          }
        }
        switch (data.data.type) {
          case 'client' :
            if(data.data.createdanaccount === false)
              window.location.href = '../pages/userPages/createNewAccount.html';
            else
              window.location.href = '../pages/userPages/dashboard.html';
            break;

          case 'staff' :
            if (data.data.isadmin) {
              window.location.href = '../pages/adminPages/manageUsers.html';
            }
            else 
              window.location.href = '../pages/Staff(Cashier) pages/manageUsers.html';
            break;
        }
      } 
      else {
        let errorDiv = document.querySelector('#errors');
        const errorNodes = errorDiv.childNodes;
        const length = errorNodes.length;
        for (let i = 0; i < length; i++) {
            errorDiv.removeChild(errorNodes[0]);
        }
        const errors = data.error.split('|  ');
        errors.forEach((error, index) => {
          const para = document.createElement('p');
          para.classList.add('txt-sm', 'col-danger', 'lf-align', 'error');
          para.innerHTML = error;
          errorDiv.appendChild(para);
        });
      }
  })
  .catch(function(error) {
      console.log(error)
  })
}

let passwordreset = ()=>  {
  window.location.href = `https://mighty-retreat-71326.herokuapp.com/api/v1/passwordreset`;
}

