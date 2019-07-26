const populate = () => {
  const form = document.querySelector('#createNewAccount').elements;
  const user = JSON.parse(localStorage.getItem('ClientUser'));

  form[0].value = user.data.firstName;
  form[1].value = user.data.lastName;
  form[2].value = user.data.email;
  form[0].disabled = true;
  form[1].disabled = true;
  form[2].disabled = true;
};

const createBankAccount = () => {
  document.querySelector('#loader').style.display = 'block';
  const user = JSON.parse(localStorage.getItem('ClientUser'));
  const url = `https://mighty-retreat-71326.herokuapp.com/api/v1/user/${user.data.id}/accounts`;
  const form = document.querySelector('#createNewAccount').elements;
  const data = {
    type: form[3].value
  };
  const fetchData = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.data.token}`
    }
  };
  fetch(url, fetchData)
    .then(res => res.json())
    .then(function (data) {
      document.querySelector('#loader').style.display = 'none';
      if (data.status === 200) {
        window.location.href = '../userPages/dashboard.html';
        if (data.message) {
          showErrMessModal('ctaccount', 'Message', data.message);
        }
      } else if (data.status === 401) {
        showErrMessModal('ctaccount', 'Error', data.error);
        setTimeout(() => {
          window.location.href = '../../pages/signup.html';
        }, 2000);
      } else if (data.status === 403) {
        showErrMessModal('ctaccount', 'Message', data.message);
      } else {
        let errorDiv = document.querySelector('#createAcctErrors');
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
    .catch(function (error) {
      console.log(error);
    });
};
window.onload = populate();
