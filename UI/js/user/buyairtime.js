
let buyAirtime = () => {
  document.querySelector('#loader').style.display = 'block';
  const user = JSON.parse(localStorage.getItem('ClientUser'));
  const form = document.querySelector('#airtimeForm').elements;
  const data = {
    phoneNumber: form[2].value,
    network: form[1].value,
    airtimeAmount: form[3].value,
  };
  const fetchData2 = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user.data.token}`
    },
  }
  console.log(form[0].value);
  const url2 = `https://mighty-retreat-71326.herokuapp.com/api/v1/user/${user.data.id}/transactions/${form[0].value}/airtime`;
  fetch(url2, fetchData2)
    .then((res) => res.json())
    .then(function (data) {
      document.querySelector('#loader').style.display = 'none';
      if (data.status === 200) {
        if (data.message) {
          showErrMessModal('userAirtime', 'Message', data.message);
        }
      }
      else if (data.status === 401) {
        showErrMessModal('userAirtime', 'Error', data.error);
        setTimeout(() => {
          window.location.href = '../../pages/signup.html'
        }, 2000)
      }
      else if (data.status === 404) {
        showErrMessModal('userAirtime', 'Error', 'Please enter valid inputs');
      }
      else {
        let errorDiv = document.querySelector('#airtimeErrors');
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
      console.log(error)
    })
}
