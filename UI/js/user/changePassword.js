
let changePassword = () => {
    const user = JSON.parse(localStorage.getItem('ClientUser'));
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
  const url2 = `http://localhost:3000/api/v1/user/${user.data.id}/changePassword`;
  fetch(url2, fetchData2)
  .then((res) => res.json())
  .then(function(data) {
    if (data.status === 200 ) {
      console.log('Password successfully changed')
    }
  })
  .catch(function(error) {
    console.log(error)
  })
}