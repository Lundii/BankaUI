let getAccountDetails = () =>  {
    const user = JSON.parse(localStorage.getItem('ClientUser'));
    const form = document.querySelector('#transferForm').elements;
    const fetchData2 = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.data.token}`
      },
    }
    const url2 = `http://localhost:3000/api/v1/user/${user.data.id}/accounts/${form[2].value}`;
    fetch(url2, fetchData2)
    .then((res) => res.json())
    .then(function(data) {
      if (data.status === 200 && !Array.isArray(data) ) {
        form[3].value = `${data.data.firstname} ${data.data.lastname}`;
        document.querySelector('#transferButton').disabled = false;
        if (data.message) {
        showErrMessModal('usTransfer', 'Message', data.message);
        }
      }
      else if (data.status === 401) {
        showErrMessModal('usTransfer', 'Error', data.error);
        setTimeout(() => {
          window.location.href = '../../pages/signup.html'
        }, 2000)
      }
      else {
        let errorDiv = document.querySelector('#transferErrors');
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

  let transferFunds = () => {
    const user = JSON.parse(localStorage.getItem('ClientUser'));
    const form = document.querySelector('#transferForm').elements;
    const body = {
        receiverAcctNum: form[2].value,
        transferAmount: form[4].value
    }
    const fetchData2 = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.data.token}`
      },
    }
    console.log(form[0].value);
    const url2 = `http://localhost:3000/api/v1/user/${user.data.id}/transactions/${form[0].value}/transfer`;
    fetch(url2, fetchData2)
    .then((res) => res.json())
    .then(function(data) {
      if (data.status === 200 ) {
        if (data.message) {
        showErrMessModal('usTransfer', 'Message', data.message);
        }
      }
      else if (data.status === 401) {
        showErrMessModal('usTransfer', 'Error', data.error);
        setTimeout(() => {
          window.location.href = '../../pages/signup.html'
        }, 2000)
      }
      else {
        let errorDiv = document.querySelector('#transferErrors');
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