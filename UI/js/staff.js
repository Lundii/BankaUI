const getAccounts = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const fetchData2 = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.data.token}`
      },
    }
  const url2 = `https://mighty-retreat-71326.herokuapp.com/api/v1/staff/${user.data.id}/accounts`;
  fetch(url2, fetchData2)
  .then((res) => res.json())
  .then(function(data) {
    if (data.status === 200 ) {
      localStorage.setItem('allAccounts', JSON.stringify(data));
      const allAccounts = JSON.parse(localStorage.getItem('allAccounts'));
    
      allAccounts.data.forEach((account) => {
        const li = document.createElement('li');
        li.addEventListener('click', () => {transactionDetails(account.accountnumber)})
        const div1 = document.createElement('div');
        const div2 = document.createElement('div');
        const div3 = document.createElement('div');
        const div4 = document.createElement('div');
        const label1 = document.createElement('label');
        label1.innerHTML = `${account.firstname.toUpperCase()} ${account.lastname.toUpperCase()}`;
        const div5 = document.createElement('div');
        const div6 = document.createElement('div');
        const div7 = document.createElement('div');
        const label2 = document.createElement('label');
        label2.innerHTML = account.accountnumber;
        const label3 = document.createElement('label');
        label3.innerHTML = `&#x20A6 ${account.balance}`;
        const label4 = document.createElement('label');
        label4.innerHTML = `${account.status.toUpperCase()}`;
        li.classList.add('shadow', 'bgrd-gray', 'txt-sm');
        div1.classList.add('container', 'mg-default')
        div2.classList.add('row');
        div3.classList.add('col-6', 'lf-align', 'pd-default', 'bgrd-primary', 'col-default');
        div7.classList.add('col-6', 'rt-align', 'pd-default', 'bgrd-primary', 'col-default');
        div4.classList.add('row');
        div5.classList.add('col-6', 'lf-align', 'pd-default', 'col-primary');
        div6.classList.add('col-6', 'rt-align', 'pd-default', 'col-primary');
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
        div7.appendChild(label4);
        document.getElementById('acctList').appendChild(li);
      })
    }
  })
  .catch(function(error) {
    console.log(error)
  })
}

window.onload = getAccounts();