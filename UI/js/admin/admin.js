const getAccounts = () => {
  document.querySelector('#loader').style.display = 'block';
  const user = JSON.parse(localStorage.getItem('AdminUser'));
  const fetchData2 = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user.data.token}`
    },
  }
  let url = `https://mighty-retreat-71326.herokuapp.com/api/v1/admin/${user.data.id}/accounts`;

  let accountListDiv = document.querySelector('#acctList');
  const accountList = accountListDiv.childNodes;
  const length = accountList.length;
  for (let i = 0; i < length; i++) {
    accountListDiv.removeChild(accountList[0]);
  }
  const statusFilter = document.getElementById('statusFilter').value;
  const emailFilter = document.getElementById('emailFilter').value;
  const numberFilter = document.getElementById('accountNumberFilter').value;
  if (statusFilter !== 'all' || emailFilter || numberFilter ) {
    url = url.concat('?')
  }
  if (statusFilter !== 'all') {
    url = url.concat(`status=${statusFilter}`);
    if (emailFilter) {
      url = url.concat(`&email=${emailFilter}`);
    }
    if (numberFilter) {
      url = url.concat(`&accountNumber=${numberFilter}`);
    }
    }
    else if (statusFilter === 'all' && emailFilter) {
    url = url.concat(`email=${emailFilter}`);
    if (numberFilter) {
      url = url.concat(`&accountNumber=${numberFilter}`);
    }
    }
    else if (statusFilter === 'all' && numberFilter) {
      url = url.concat(`accountNumber=${numberFilter}`);
    }
  fetch(url, fetchData2)
  .then((res) => res.json())
  .then(function(data) {
    if (data.status === 200 ) {
      document.querySelector('#loader').style.display = 'none';
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
        label1.innerHTML = `${account.firstname} ${account.lastname}`;
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
        showErrMessModal('userDetails', 'Message', data.message);
      } 
    }
    else if (data.status === 401) {
      showErrMessModal('userDetails', 'Error', data.error);
      setTimeout(() => {
        window.location.href = '../../pages/signup.html'
      }, 2000)
    }
    else {
      showErrMessModal('userDetails', 'Error', data.error);
    }
  })
  .catch(function(error) {
    console.log(error)
  })
}

const enableAccountFields = ()  => {
  const accountDetails = document.querySelector('#accountDetailsForm');
  accountDetails[0].disabled = false;
  accountDetails[1].disabled = false;
  accountDetails[4].disabled = false;
  accountDetails[5].value = "Update";
}

const editUser = () => {
  document.querySelector('#loader').style.display = 'block';
  const accountDetails = document.querySelector('#accountDetailsForm');
  if (accountDetails[5].value === 'Edit') {
    enableAccountFields();
    return
  }
  const user = JSON.parse(localStorage.getItem('AdminUser'));
  const userEmail = JSON.parse(localStorage.getItem('clientAccountDetails')).owneremail;
  const body = {
    userEmail,
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
const url = `https://mighty-retreat-71326.herokuapp.com/api/v1/admin/${user.data.id}/users`;
fetch(url, fetchData)
.then((res) => res.json())
.then(function(data) {
  document.querySelector('#loader').style.display = 'none';
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
    let errorDiv = document.querySelector('#admanUserErrors');
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
  document.querySelector('#loader').style.display = 'block';
  const user = JSON.parse(localStorage.getItem('AdminUser'));
  const accountNumber = JSON.parse(localStorage.getItem('clientAccountDetails')).accountnumber;
  const fetchData2 = {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user.data.token}`
    },
  }
const url2 = `https://mighty-retreat-71326.herokuapp.com/api/v1/admin/${user.data.id}/accounts/${accountNumber}`;
fetch(url2, fetchData2)
.then((res) => res.json())
.then(function(data) {
  document.querySelector('#loader').style.display = 'none';
  if (data.status === 200 ) {
    callback();
  }
})
.catch(function(error) {
  console.log(error)
})
}


const activate_deactivateAccount = (accountNumber, status, callback) => {
  document.querySelector('#loader').style.display = 'block';
  const user = JSON.parse(localStorage.getItem('AdminUser'));
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
const url2 = `https://mighty-retreat-71326.herokuapp.com/api/v1/admin/${user.data.id}/account/${accountNumber}`;
fetch(url2, fetchData2)
.then((res) => res.json())
.then(function(data) {
  document.querySelector('#loader').style.display = 'none';
  if (data.status === 200 ) {
    callback();
  }
})
.catch(function(error) {
  console.log(error)
})
}

window.onload = getAccounts();