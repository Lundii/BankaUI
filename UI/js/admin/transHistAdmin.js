const transactionDetails = () => {
  document.querySelector('#loader').style.display = 'block';
  const user = JSON.parse(localStorage.getItem('AdminUser'));
  const accountDet = JSON.parse(localStorage.getItem('clientAccountDetails'));
  const fetchData2 = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user.data.token}`
    },
  }
  const url2 = `https://mighty-retreat-71326.herokuapp.com/api/v1/admin/${user.data.id}/accounts/${accountDet.accountnumber}/transactions`;
  fetch(url2, fetchData2)
    .then((res) => res.json())
    .then(function (data) {
      document.querySelector('#loader').style.display = 'none';
      if (data.status === 200) {
        localStorage.setItem('transactionHistoryAdmin', JSON.stringify(data));
        const transactionHistory = JSON.parse(localStorage.getItem('transactionHistoryAdmin'));
        if (transactionHistory.data) {
          transactionHistory.data.forEach((account) => {
            const li = document.createElement('li');
            li.addEventListener('click', () => { showModal2('transactionHistory', account) });
            document.querySelector("#transListName").innerHTML = `${accountDet.firstname} ${accountDet.lastname}`;
            document.querySelector("#transListNum").innerHTML = account.accountnumber;
            document.querySelector("#transListBal").innerHTML = `&#x20A6 ${account.newbalance}`;
            const div1 = document.createElement('div');
            const div2 = document.createElement('div');
            const div3 = document.createElement('div');
            const div4 = document.createElement('div');
            const label1 = document.createElement('label');
            label1.innerHTML = account.createdon;
            const div5 = document.createElement('div');
            const div6 = document.createElement('div');
            const label2 = document.createElement('label');
            label2.innerHTML = account.type;
            const label3 = document.createElement('label');
            if (account.type === 'debit') {
              label3.innerHTML = `- &#x20A6 ${account.amount}`;
              label3.style.color = 'red';
            }
            else {
              label3.innerHTML = `&#x20A6 ${account.amount}`;
            }
            li.classList.add('shadow', 'bgrd-gray', 'txt-sm');
            div1.classList.add('container', 'mg-default', 'no_padLeft')
            div2.classList.add('row');
            div3.classList.add('col-12', 'lf-align', 'pd-default', 'bgrd-primary', 'col-default');
            div4.classList.add('row');
            div5.classList.add('col-6', 'lf-align', 'pd-default', 'col-primary');
            div6.classList.add('col-6', 'rt-align', 'pd-default', 'col-primary');
            li.appendChild(div1);
            div1.appendChild(div2);
            div2.appendChild(div3);
            div3.appendChild(label1);
            div1.appendChild(div4);
            div4.appendChild(div5);
            div5.appendChild(label2);
            div4.appendChild(div6);
            div6.appendChild(label3);
            document.getElementById('transHistList').appendChild(li);
          })
        }
        if (data.message) {
          showErrMessModal('acctHistory', 'Message', data.message);
        }
      }
      else if (data.status === 401) {
        showErrMessModal('acctHistory', 'Error', data.error);
        setTimeout(() => {
          window.location.href = '../../pages/signup.html'
        }, 2000)
      }
      else {
        showErrMessModal('acctHistory', 'Error', data.error);
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}
window.onload = transactionDetails();