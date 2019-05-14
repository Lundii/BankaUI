const getAccounts = () => {
    const user = JSON.parse(localStorage.getItem('StaffUser'));
    const fetchData2 = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.data.token}`
      },
    }
  const url2 = `http://localhost:3000/api/v1/staff/${user.data.id}/accounts`;
  fetch(url2, fetchData2)
  .then((res) => res.json())
  .then(function(data) {
    if (data.status === 200 ) {
      localStorage.setItem('allAccounts', JSON.stringify(data));
      const allAccounts = JSON.parse(localStorage.getItem('allAccounts'));
    
      allAccounts.data.forEach((account, index) => {
        const li = document.createElement('li');
        li.addEventListener('click', () => {showUserDetails(account)});
        const div1 = document.createElement('div');
        const div2 = document.createElement('div');
        const div3 = document.createElement('div');
        const div4 = document.createElement('div');
        const label1 = document.createElement('label');
        label1.innerHTML = `${account.firstname } ${account.lastname }`;
        const div5 = document.createElement('div');
        const div6 = document.createElement('div');
        const div7 = document.createElement('div');
        const divDr = document.createElement('div');
        const divDr2 = document.createElement('div');
        const icon = document.createElement('i');
        const label2 = document.createElement('label');
        label2.innerHTML = account.accountnumber;
        const label3 = document.createElement('label');
        label3.innerHTML = `&#x20A6 ${account.balance}`;
        const label4 = document.createElement('label');
        const label5 = document.createElement('label');
        label4.innerHTML = `Delete`;
        label5.innerHTML = account.status === 'active' ? 'Deactivate' : 'Activate';
        label4.addEventListener('click', () => {showModal('manageUsers', 'delete', account)});
        label5.addEventListener('click', () => {showModal('manageUsers', account.status === 'active' ? 'deactivate' : 'activate', account)});
        li.classList.add('shadow', 'bgrd-gray', 'txt-sm');
        if (account.status == 'dormant') {
          li.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.24)';
          li.style.backgroundColor = 'rgb(195, 189, 189)';
        }
        div1.classList.add('container', 'mg-default', 'no_padLeft')
        div2.classList.add('row');
        div3.classList.add('col-10', 'lf-align', 'pd-default', 'bgrd-primary', 'col-default');
        div7.classList.add('col-2', 'rt-align', 'pd-default', 'bgrd-primary', 'col-default');
        div7.addEventListener('click', () => {showDrowndown(event, `dropdown${index}`)})
        div4.classList.add('row');
        div5.classList.add('col-6', 'lf-align', 'pd-default', 'col-primary');
        div6.classList.add('col-6', 'rt-align', 'pd-default', 'col-primary');
        divDr.classList.add('dropdown');
        divDr2.classList.add('dropdown-content');
        divDr2.setAttribute('id', `dropdown${index}`);
        icon.classList.add('material-icons', 'lg');
        icon.innerHTML = 'more_vert';
        li.appendChild(div1);
        div1.appendChild(div2);
        div2.appendChild(div3);
        div2.appendChild(div7);
        div3.appendChild(label1);
        div1.appendChild(div4);
        div4.appendChild(div5);
        div5.appendChild(label2);
        div4.appendChild(div6);
        div6.appendChild(label3);
        div7.appendChild(divDr);
        divDr.appendChild(icon);
        divDr.appendChild(divDr2);
        divDr2.appendChild(label4);
        divDr2.appendChild(label5);
        document.getElementById('acctList').appendChild(li);
      })
      if (data.message){
        showErrMessModal('manageUsers', 'Message', data.message);
      } 
    }
    else if (data.status === 401) {
      showErrMessModal('manageUsers', 'Error', data.error);
      setTimeout(() => {
        window.location.href = '../../pages/signup.html'
      }, 2000)
    }
    else {
      showErrMessModal('manageUsers', 'Error', data.error);
    }
  })
  .catch(function(error) {
    console.log(error)
  })
}

const enableUserFields = ()  => {
  const accountDetails = document.querySelector('#accountDetailsForm');
  accountDetails[0].disabled = false;
  accountDetails[1].disabled = false;
  accountDetails[4].disabled = false;
  accountDetails[5].value = "Update";
}

const editAccount = () => {
  const accountDetails = document.querySelector('#accountDetailsForm');
  if (accountDetails[5].value === 'Edit') {
    enableUserFields();
    return
  }
  const user = JSON.parse(localStorage.getItem('StaffUser'));
  const clientEmail = JSON.parse(localStorage.getItem('clientAccountDetails')).owneremail
  const body = {
    clientEmail,
    firstName: accountDetails[0].value,
    lastName: accountDetails[1].value,
  }
  const fetchData = {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user.data.token}`
    },
  }
const url = `http://localhost:3000/api/v1/staff/${user.data.id}/users`;
fetch(url, fetchData)
.then((res) => res.json())
.then(function(data) {
  accountDetails[0].disabled = true;
  accountDetails[1].disabled = true;
  accountDetails[4].disabled = true;
  accountDetails[5].value = "Edit";
  if (data.status === 200 ) {
    accountDetails[0].value = data.data.firstName
    accountDetails[1].value = data.data.lastName
    if (data.message) {
      showErrMessModal('userDetails', 'Message', data.message);
    }
  }
  else if (data.status === 401) {
    showErrMessModal('Error', data.error);
    setTimeout(() => {
      window.location.href = '../../pages/signup.html'
    }, 2000)
  }
  else {
    let errorDiv = document.querySelector('#sfmanUserErrors');
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

const deleteAccount = (callback) => {
  const user = JSON.parse(localStorage.getItem('StaffUser'));
  const accountNumber = JSON.parse(localStorage.getItem('clientAccountDetails')).accountnumber;
  const fetchData2 = {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user.data.token}`
    },
  }
const url2 = `http://localhost:3000/api/v1/staff/${user.data.id}/accounts/${accountNumber}`;
fetch(url2, fetchData2)
.then((res) => res.json())
.then(function(data) {
  if (data.status === 200 ) {
    callback();
  }
})
.catch(function(error) {
  console.log(error)
})
}


const activate_deactivateAccount = (accountNumber, status, callback) => {
  const user = JSON.parse(localStorage.getItem('StaffUser'));
  const body2 = {
    status
  }
  const fetchData2 = {
    method: 'PATCH',
    body: JSON.stringify(body2),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user.data.token}`
    },
  }
const url2 = `http://localhost:3000/api/v1/staff/${user.data.id}/account/${accountNumber}`;
fetch(url2, fetchData2)
.then((res) => res.json())
.then(function(data) {
  if (data.status === 200 ) {
    callback();
  }
})
.catch(function(error) {
  console.log(error)
})
}
window.onload = getAccounts();