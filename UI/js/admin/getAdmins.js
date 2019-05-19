const getStaffs = () => {
  document.querySelector('#loader').style.display = 'block';
  const user = JSON.parse(localStorage.getItem('AdminUser'));
  const fetchData2 = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user.data.token}`
    },
  }
  let url = `https://mighty-retreat-71326.herokuapp.com/api/v1/admin/${user.data.id}/users?type=admin`;

  let accountListDiv = document.querySelector('#adminList');
  const accountList = accountListDiv.childNodes;
  const length = accountList.length;
  for (let i = 0; i < length; i++) {
    accountListDiv.removeChild(accountList[0]);
  }
  const emailFilter = document.getElementById('emailFilter').value;
  const idFilter = document.getElementById('idFilter').value;
    if (emailFilter) {
      url = url.concat(`&email=${emailFilter}`);
    }
    if (idFilter) {
      url = url.concat(`&id=${idFilter}`);
    }
  fetch(url, fetchData2)
  .then((res) => res.json())
  .then(function(data) {
    document.querySelector('#loader').style.display = 'none';
    if (data.status === 200 ) {
      localStorage.setItem('admins', JSON.stringify(data));
      const admins = JSON.parse(localStorage.getItem('admins'));
    
      admins.data.forEach((admin, index) => {
        const li = document.createElement('li');
        li.addEventListener('click', () => {showAdminDetails(admin)});
        const div1 = document.createElement('div');
        const div2 = document.createElement('div');
        const div3 = document.createElement('div');
        const div4 = document.createElement('div');
        const label1 = document.createElement('label');
        label1.innerHTML = `${admin.firstname } ${admin.lastname }`;
        const div5 = document.createElement('div');
        const div6 = document.createElement('div');
        const div7 = document.createElement('div');
        const divDr = document.createElement('div');
        const divDr2 = document.createElement('div');
        const icon = document.createElement('i');
        const label2 = document.createElement('label');
        label2.innerHTML = 'Admin';
        const label3 = document.createElement('label');
        label3.innerHTML = `Admin ID: ${admin.id}`;
        const label4 = document.createElement('label');
        const label5 = document.createElement('label');
        label4.innerHTML = `Delete`;
        label4.addEventListener('click', () => {showModal('manageAdmins', 'delete', admin)});
        li.classList.add('shadow', 'bgrd-gray', 'txt-sm');
        div1.classList.add('container', 'mg-default', 'no_padLeft');
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
        document.getElementById('adminList').appendChild(li);
      })
      if (data.message){
        showErrMessModal('adminDetails', 'Message', data.message);
      } 
    }
    else if (data.status === 401) {
      showErrMessModal('adminDetails', 'Error', data.error);
      setTimeout(() => {
        window.location.href = '../../pages/signup.html'
      }, 2000)
    }
    else {
      showErrMessModal('adminDetails', 'Error', data.error);
    }
  })
  .catch(function(error) {
    console.log(error)
  });
};

const enableAdminFields = ()  => {
  const adminDetails = document.querySelector('#adminDetailsForm');
  adminDetails[0].disabled = false;
  adminDetails[1].disabled = false;
  adminDetails[5].value = "Update";
}

const editUser = () => {
  document.querySelector('#loader').style.display = 'block';
  const adminDetails = document.querySelector('#adminDetailsForm');
  if (adminDetails[5].value === 'Edit') {
    enableAdminFields();
    return;
  }
  const user = JSON.parse(localStorage.getItem('AdminUser'));
  const userEmail = JSON.parse(localStorage.getItem('adminAccountDetails')).email
  const body = {
    userEmail,
    firstName: adminDetails[0].value,
    lastName: adminDetails[1].value,
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
  adminDetails[0].disabled = true;
  adminDetails[1].disabled = true;
  adminDetails[5].value = "Edit";
  if (data.status === 200 ) {
    adminDetails[0].value = data.data.firstName;
    adminDetails[1].value = data.data.lastName;
    if (data.message) {
      showErrMessModal('adminDetails', 'Message', data.message);
    }
  }
  else if (data.status === 401) {
    showErrMessModal('adminDetails', 'Error', data.error);
    setTimeout(() => {
      window.location.href = '../../pages/signup.html'
    }, 2000)
  }
  else {
    let errorDiv = document.querySelector('#admanAdErrors');
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
  const staffemail = localStorage.getItem('staffemailDetails');
  const body = {
    staffemail
  }
  const fetchData2 = {
    method: 'DELETE',
    body: JSON.stringify(body), 
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user.data.token}`
    },
  }
const url2 = `https://mighty-retreat-71326.herokuapp.com/api/v1/admin/${user.data.id}/users`;
fetch(url2, fetchData2)
.then((res) => res.json())
.then(function(data) {
  document.querySelector('#loader').style.display = 'none';
  if (data.status === 200 ) {
    document.location.reload(); 
    callback();
  }
})
.catch(function(error) {
  console.log(error)
})
}
window.onload = getStaffs();