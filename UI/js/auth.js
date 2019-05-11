let signup = () => {
  const url = 'http://localhost:3000/api/v1/auth/signup'
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
    console.log(data);
    localStorage.setItem('ClientUser', JSON.stringify(data));
      if (data.status === 200) {
      window.location.href = '../pages/userPages/createNewAccount.html';
      }
  })
  .catch(function(error) {
      console.log(error)
  })
}

let signin = () => {
  const url = 'http://localhost:3000/api/v1/auth/signin'
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
  })
  .catch(function(error) {
      console.log(error)
  })
}

let passwordreset = ()=>  {
  window.location.href = `http://localhost:3000/api/v1/passwordreset`;
}

