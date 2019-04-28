const createAccount = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const url = `http://localhost:3000/api/v1/user/${user.data.id}/accounts`
    const data = {
      type: "savings",
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
        console.log(data);
        if (data.status === 200) {
          console.log(data);
        }
    })
    .catch(function(error) {
        console.log(error)
    })
  }