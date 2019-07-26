
let changePassword = () => {
  document.querySelector('#loader').style.display = 'block';
  const user = JSON.parse(localStorage.getItem('StaffUser'));
  let passwordForm = document.querySelector('#changePasswordForm');
  const body = {
    oldPassword: passwordForm[0].value,
    newPassword: passwordForm[1].value,
    confirmPassword: passwordForm[2].value,
  };
  const fetchData2 = {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user.data.token}`,
    },
  };
  const url2 = `https://mighty-retreat-71326.herokuapp.com/api/v1/staff/${user.data.id}/changePassword`;
  fetch(url2, fetchData2)
    .then((res) => res.json())
    .then(function (data) {
      document.querySelector('#loader').style.display = 'none';
      if (data.status === 200) {
        if (data.message) {
          showErrMessModal('sfChPassword', 'Message', data.message);
        }
      }
      else if (data.status === 401) {
        showErrMessModal('sfChPassword', 'Error', data.error);
        setTimeout(() => {
          window.location.href = '../../pages/signup.html'
        }, 2000)
      }
      else {
        let errorDiv = document.querySelector('#staffpassErrors');
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