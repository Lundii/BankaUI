
let changePassword = () => {
    const user = JSON.parse(localStorage.getItem('AdminUser'));
    const body = {
      oldPassword: document.querySelector('#oldPassword').value,
      newPassword: document.querySelector('#newPassword').value,
      confirmPassword: document.querySelector('#confirmPassword').value,
    };
    const fetchData2 = {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.data.token}`,
      },
    };
  const url2 = `http://localhost:3000/api/v1/admin/${user.data.id}/changePassword`;
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