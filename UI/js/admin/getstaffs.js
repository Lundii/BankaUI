const getStaffs = () => {
    const user = JSON.parse(localStorage.getItem('AdminUser'));
    const fetchData2 = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.data.token}`
      },
    }
  const url2 = `http://localhost:3000/api/v1/admin/${user.data.id}/users?type=staff`;
  fetch(url2, fetchData2)
  .then((res) => res.json())
  .then(function(data) {
    if (data.status === 200 ) {
      localStorage.setItem('staffs', JSON.stringify(data));
      const staffs = JSON.parse(localStorage.getItem('staffs'));
    
      staffs.data.forEach((staff, index) => {
        const li = document.createElement('li');
        li.addEventListener('click', () => {showStaffDetails(staff)});
        const div1 = document.createElement('div');
        const div2 = document.createElement('div');
        const div3 = document.createElement('div');
        const div4 = document.createElement('div');
        const label1 = document.createElement('label');
        label1.innerHTML = `${staff.firstname.toUpperCase()} ${staff.lastname.toUpperCase()}`;
        const div5 = document.createElement('div');
        const div6 = document.createElement('div');
        const div7 = document.createElement('div');
        const divDr = document.createElement('div');
        const divDr2 = document.createElement('div');
        const icon = document.createElement('i');
        const label2 = document.createElement('label');
        label2.innerHTML = 'Staff(Cashier)';
        const label3 = document.createElement('label');
        label3.innerHTML = `Staff ID: ${staff.id}`;
        const label4 = document.createElement('label');
        const label5 = document.createElement('label');
        label4.innerHTML = `Delete`;
        label4.addEventListener('click', () => {showModal('manageStaffs', 'delete', staff)})
        li.classList.add('shadow', 'bgrd-gray', 'txt-sm');
        div1.classList.add('container', 'mg-default')
        div2.classList.add('row');
        div3.classList.add('col-10', 'lf-align', 'pd-default', 'bgrd-primary', 'col-default');
        div7.classList.add('col-2', 'rt-align', 'pd-default', 'bgrd-primary', 'col-default');
        div7.addEventListener('click', () => {showDrowndown(event, `dropdown${index}`)})
        div4.classList.add('row');
        div5.classList.add('col-6', 'lf-align', 'pd-default', 'col-primary');
        div6.classList.add('col-6', 'rt-align', 'pd-default', 'col-primary');
        divDr.classList.add('dropdown');
        divDr2.classList.add('dropdown-content');
        divDr2.setAttribute('id', `dropdown${index}`);
        icon.classList.add('material-icons', 'lg');
        icon.innerHTML = 'more_vert';
        li.appendChild(div1);
        div1.appendChild(div2);
        div2.appendChild(div3);
        div2.appendChild(div7);
        div3.appendChild(label1);
        div1.appendChild(div4);
        div4.appendChild(div5);
        div5.appendChild(label2);
        div4.appendChild(div6);
        div6.appendChild(label3);
        div7.appendChild(divDr);
        divDr.appendChild(icon);
        divDr.appendChild(divDr2);
        divDr2.appendChild(label4)
        document.getElementById('staffList').appendChild(li);
      })
    }
  })
  .catch(function(error) {
    console.log(error)
  });
};

const edit_updateStaffDetails = () => {
  let staffDetails = document.querySelector('#staffDetailsForm');
    staffDetails[0].disabled = false;
    staffDetails[1].disabled = false;
    staffDetails[2].disabled = false;
    staffDetails[3].disabled = false;
    staffDetails[4].disabled = false;
    document.querySelector('#staffButton').value = 'Update';
}

const deleteAccount = (callback) => {
  const user = JSON.parse(localStorage.getItem('AdminUser'));
  const staffemail = localStorage.getItem('staffemailDetails');
  const body = {
    staffemail
  }
  const fetchData2 = {
    method: 'DELETE',
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
    document.location.reload(); 
    callback();
  }
})
.catch(function(error) {
  console.log(error)
})
}
window.onload = getStaffs();