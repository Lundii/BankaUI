let disable = () => {
    const form = document.querySelector('#creditForm').elements;
    form[1].disabled = true;
    form[2].disabled = true;
    document.querySelector('#creditButton').disabled = true;
}


let getAccountDetails = ()=>  {
  document.querySelector('#loader').style.display = 'block';
    const user = JSON.parse(localStorage.getItem('StaffUser'));
    const form = document.querySelector('#creditForm').elements;
    const fetchData2 = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.data.token}`
      },
    }
    console.log(form[0].value);
    const url2 = `https://mighty-retreat-71326.herokuapp.com/api/v1/staff/${user.data.id}/accounts/${form[0].value}`;
    fetch(url2, fetchData2)
    .then((res) => res.json())
    .then(function(data) {
      document.querySelector('#loader').style.display = 'none';
      if (data.status === 200 ) {
        form[1].value = `${data.data[0].firstname} ${data.data[0].lastname}`;
        form[2].value = `${data.data[0].balance}`;
        document.querySelector('#creditButton').disabled = false;
        if (data.message) {
        showErrMessModal('sfCredit', 'Message', data.message);
        }
      }
      else if (data.status === 401) {
        showErrMessModal('sfCredit', 'Error', data.error);
        setTimeout(() => {
          window.location.href = '../../pages/signup.html'
        }, 2000)
      }
      else {
        let errorDiv = document.querySelector('#creditErrors');
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

  let creditAccount = () => {
    document.querySelector('#loader').style.display = 'block';
    const user = JSON.parse(localStorage.getItem('StaffUser'));
    const form = document.querySelector('#creditForm').elements;
    const data = {
      creditAmount: form[3].value,
    };
    const fetchData2 = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.data.token}`
      },
    }
    const url2 = `https://mighty-retreat-71326.herokuapp.com/api/v1/staff/${user.data.id}/transactions/${form[0].value}/credit`;
    fetch(url2, fetchData2)
    .then((res) => res.json())
    .then(function(data) {
      document.querySelector('#loader').style.display = 'none';
      if (data.status === 200 ) {
        if (data.message) {
        showErrMessModal('sfCredit', 'Message', data.message);
        }
      }
      else if (data.status === 401) {
        showErrMessModal('sfCredit', 'Error', data.error);
        setTimeout(() => {
          window.location.href = '../../pages/signup.html'
        }, 2000)
      }
      else {
        let errorDiv = document.querySelector('#creditErrors');
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

  window.onload = disable();