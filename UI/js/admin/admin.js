const getAccounts = () => {
    const user = JSON.parse(localStorage.getItem('AdminUser'));
    const fetchData2 = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.data.token}`
      },
    }
  const url2 = `http://localhost:3000/api/v1/admin/${user.data.id}/accounts`;
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
        label1.innerHTML = `${account.firstname.toUpperCase()} ${account.lastname.toUpperCase()}`;
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
        label4.innerHTML = `Delete`;
        label4.addEventListener('click', () => {showModal('manageUsers', 'delete', account)})
        li.classList.add('shadow', 'bgrd-gray', 'txt-sm');
        div1.classList.add('container', 'mg-default')
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
        divDr2.appendChild(label4)
        document.getElementById('acctList').appendChild(li);
      })
    }
  })
  .catch(function(error) {
    console.log(error)
  })
}

// const deleteAccountNumber = (accountNumber, callback) => {
//   const user = JSON.parse(localStorage.getItem('AdminUser'));
//   const fetchData2 = {
//     method: 'DELETE',
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${user.data.token}`
//     },
//   }
// const url2 = `http://localhost:3000/api/v1/admin/${user.data.id}/accounts/${accountNumber}`;
// fetch(url2, fetchData2)
// .then((res) => res.json())
// .then(function(data) {
//   if (data.status === 200 ) {
//     document.location.reload(); 
//     callback();
//   }
// })
// .catch(function(error) {
//   console.log(error)
// })
// }

window.onload = getAccounts();