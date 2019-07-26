const createSummary = () => {
  document.querySelector('#loader').style.display = 'block';
  const user = JSON.parse(localStorage.getItem('ClientUser'));
  const fetchData2 = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user.data.token}`
    },
  }
  const url2 = `https://mighty-retreat-71326.herokuapp.com/api/v1/user/${user.data.id}/accounts`;
  fetch(url2, fetchData2)
    .then((res) => res.json())
    .then(function (data) {
      document.querySelector('#loader').style.display = 'none';
      if (data.status === 200 && data.data.length) {
        localStorage.setItem('accountSummary', JSON.stringify(data));
        const accountSummary = JSON.parse(localStorage.getItem('accountSummary'));
        getPassport();
        document.querySelector('#firstNameLabel').innerHTML = accountSummary.data[0].firstname;
        document.querySelector('#lastNameLabel').innerHTML = accountSummary.data[0].lastname;
        document.querySelector('#emailLabel').innerHTML = accountSummary.data[0].owneremail;

        accountSummary.data.forEach((account) => {
          const li = document.createElement('li');
          li.addEventListener('click', () => { transactionDetails(account) })
          const div1 = document.createElement('div');
          const div2 = document.createElement('div');
          const div3 = document.createElement('div');
          const div4 = document.createElement('div');
          const label1 = document.createElement('label');
          label1.innerHTML = `${(account.type).charAt(0).toUpperCase() + account.type.slice(1)} account`;
          const div5 = document.createElement('div');
          const div6 = document.createElement('div');
          const div7 = document.createElement('div');
          const label2 = document.createElement('label');
          label2.innerHTML = account.accountnumber;
          const label3 = document.createElement('label');
          label3.innerHTML = `&#x20A6 ${account.balance}`;
          const label4 = document.createElement('label');
          label4.innerHTML = `${account.status}`;
          li.classList.add('shadow', 'bgrd-gray', 'txt-sm');
          if (account.status == 'dormant') {
            li.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.24)';
            li.style.backgroundColor = 'rgb(195, 189, 189)';
          }
          div1.classList.add('container', 'mg-default', 'no_padLeft')
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
          document.getElementById('sumList').appendChild(li);
        })
      }
      else if (data.status === 200 && data.message) {
        showErrMessModal('accountHistory', 'Message', data.message);
      }
      else if (data.status === 401) {
        showErrMessModal('accountHistory', 'Error', data.error);
        setTimeout(() => {
          window.location.href = '../../pages/signup.html'
        }, 2000)
      }
      else {
        showErrMessModal('accountHistory', 'Error', data.error);
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

const transactionDetails = (accountDe) => {
  document.querySelector('#loader').style.display = 'block';
  const user = JSON.parse(localStorage.getItem('ClientUser'));
  const fetchData2 = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user.data.token}`
    },
  }
  const url2 = `https://mighty-retreat-71326.herokuapp.com/api/v1/user/${user.data.id}/accounts/${accountDe.accountnumber}/transactions`;
  fetch(url2, fetchData2)
    .then((res) => res.json())
    .then(function (data) {
      document.querySelector('#loader').style.display = 'none';
      if (data.status === 200) {
        document.querySelector('#accountHistory').style.display = 'block';
        document.querySelector('#accountSummary').style.display = 'none';
        localStorage.setItem('transactionHistory', JSON.stringify(data));
        const transactionHistory = JSON.parse(localStorage.getItem('transactionHistory'));
        if (transactionHistory.data) {
          transactionHistory.data.forEach((account) => {
            const li = document.createElement('li');
            li.addEventListener('click', () => { showModal2('accountHistory', account) });
            document.querySelector("#transListNum").innerHTML = account.accountnumber;
            document.querySelector("#transListBal").innerHTML = `&#x20A6 ${accountDe.balance}`;
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
            document.getElementById('transList').appendChild(li);
          })
        }
        if (data.message) {
          showErrMessModal('accountHistory', 'Message', data.message);
        }
      }
      else if (data.status === 401) {
        showErrMessModal('accountHistory', 'Error', data.error);
        setTimeout(() => {
          window.location.href = '../../pages/signup.html'
        }, 2000)
      }
      else {
        showErrMessModal('accountHistory', 'Error', data.error);
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

let uploadPassport = (file) => {
  document.querySelector('#loader').style.display = 'block';
  const user = JSON.parse(localStorage.getItem('ClientUser'));
  let formData = new FormData();
  formData.append('passport', file);
  // const data = {
  //   creditAmount: file,
  // };
  const fetchData2 = {
    method: 'POST',
    body: formData,
  }
  const url2 = `https://mighty-retreat-71326.herokuapp.com/api/v1/user/${user.data.id}/upload`;
  fetch(url2, fetchData2)
    .then((res) => res.json())
    .then(function (data) {
      console.log(data);
      getPassport(data.file.file);
      document.querySelector('#loader').style.display = 'none';
    })
    .catch(function (error) {
      console.log(error)
    })
}

let getPassport = (file) => {
  console.log('i am in pas')
  const avatar = JSON.parse(localStorage.getItem('accountSummary'));
  console.log(avatar);
  fetch(`https://mighty-retreat-71326.herokuapp.com/${file || avatar.data[0].avatar}`)
    .then((res) => res.blob())
    .then(blob => {
      var url = URL.createObjectURL(blob);
      document.querySelector('#pass').src = url;
      console.log(blob);
      console.log('done');
    })
}
window.onload = createSummary();
