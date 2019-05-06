const createStaff = () => {
  const user = JSON.parse(localStorage.getItem('AdminUser'));
  let newStaff = document.querySelector('#createStaffForm')
  const body = {
    firstName: newStaff[0].value,
    lastName: newStaff[1].value,
    email: newStaff[2].value,
    isadmin: newStaff[3].value === 'admin' ? true : false,
  }
  const fetchData2 = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user.data.token}`
    },
    }
  const url2 = `http://localhost:3000/api/v1/admin/${user.data.id}/users`;
  fetch(url2, fetchData2)
  .then((res) => res.json())
  .then(function(data) {
    if (data.status === 200 ) {

    }
  })
  .catch(function(error) {
    console.log(error)
  });
};
