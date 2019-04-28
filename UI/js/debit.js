let disable = () => {
    const form = document.querySelector('#debitForm').elements;
    form[1].disabled = true;
    form[2].disabled = true;
    document.querySelector('#debitButton').disabled = true;
}


let getAccountDetails = ()=>  {
    const user = JSON.parse(localStorage.getItem('user'));
    const form = document.querySelector('#debitForm').elements;
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
      if (data.status === 200 ) {
          console.log(data);
         form[1].value = `${data.data[0].firstname} ${data.data[0].lastname}`;
         form[2].value = `${data.data[0].balance}`;
         document.querySelector('#debitButton').disabled = false;
      }
    })
    .catch(function(error) {
      console.log(error)
    })
  }

  let debitAccount = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const form = document.querySelector('#debitForm').elements;
    const data = {
      debitAmount: form[3].value,
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
    const url2 = `https://mighty-retreat-71326.herokuapp.com/api/v1/staff/${user.data.id}/transactions/${form[0].value}/debit`;
    fetch(url2, fetchData2)
    .then((res) => res.json())
    .then(function(data) {
      if (data.status === 200 ) {
          console.log(data);
      }
    })
    .catch(function(error) {
      console.log(error)
    })
  }

  window.onload = disable();