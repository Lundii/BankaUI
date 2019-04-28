const populate = () => {
    const form = document.querySelector('#createNewAccount').elements;
    const user = JSON.parse(localStorage.getItem('user'));

    form[0].value = user.data.firstName;
    form[1].value = user.data.lastName;
    form[2].value = user.data.email;
    form[0].disabled = true;
    form[1].disabled = true;
    form[2].disabled = true;
}

const createBankAccount = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const url = `https://mighty-retreat-71326.herokuapp.com/api/v1/user/${user.data.id}/accounts`;
  const form = document.querySelector('#createNewAccount').elements;
  const data = {
    type: form[3].value,
  };
  const fetchData = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user.data.token}`
    },
  }
  fetch(url, fetchData)
  .then((res) => res.json())
  .then(function(data) {
    if (data.status === 200) {
      window.location.href = '../userPages/dashboard.html';
    }
  })
  .catch(function(error) {
      console.log(error)
  })
}
window.onload = populate();