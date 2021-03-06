function loginSignup(login) {
  if (login) {
    document.querySelector('#login').style.display = 'block';
    document.querySelector('#loginCont').style.backgroundColor = 'white';
    document.querySelector('#signup').style.display = 'none';
    document.querySelector('#signupCont').style.backgroundColor = 'rgb(240, 240, 240)';
  } else {
    document.querySelector('#login').style.display = 'none';
    document.querySelector('#loginCont').style.backgroundColor = 'rgb(240, 240, 240)';
    document.querySelector('#signup').style.display = 'block';
    document.querySelector('#signupCont').style.backgroundColor = 'white';
  }
}

function showAcctHistory() {
  document.querySelector('#accountHistory').style.display = 'block';
  document.querySelector('#accountSummary').style.display = 'none';
}

function showStaffDetails(staff) {
  document.querySelector('#manageStaffs').style.display = 'none';
  document.querySelector('#staffDetails').style.display = 'block';
  let staffDetails = document.querySelector('#staffDetailsForm')
  staffDetails[0].value = staff.firstname;
  staffDetails[1].value = staff.lastname;
  staffDetails[2].value = staff.email;
  staffDetails[3].value = staff.id;
  staffDetails[4].value = 'Cashier';
  document.querySelector('#staffIDHead').innerHTML = `Staff ID: ${staff.id}`;
  document.querySelector('#staffNameHead').innerHTML = `${staff.firstname} ${staff.lastname}`;
  localStorage.setItem('staffAccountDetails', JSON.stringify(staff));
}

function showUserDetails(account) {
  document.querySelector('#manageUsers').style.display = 'none';
  document.querySelector('#userDetails').style.display = 'block';
  let accountDetails = document.querySelector('#accountDetailsForm');
  accountDetails[0].value = account.firstname;
  accountDetails[1].value = account.lastname;
  accountDetails[2].value = account.accountnumber;
  accountDetails[3].value = account.owneremail;
  document.querySelector('#headAcctNum').innerHTML = account.accountnumber;
  document.querySelector('#headAcctName').innerHTML = `${account.firstname} ${account.lastname}`;
  localStorage.setItem('clientAccountDetails', JSON.stringify(account));
}

function showAdminDetails(admin) {
  document.querySelector('#manageAdmins').style.display = 'none';
  document.querySelector('#adminDetails').style.display = 'block';
  let adminDetails = document.querySelector('#adminDetailsForm');
  adminDetails[0].value = admin.firstname;
  adminDetails[1].value = admin.lastname;
  adminDetails[2].value = admin.email;
  adminDetails[3].value = admin.id;
  adminDetails[4].value = 'Admin';
  document.querySelector('#adminIDHead').innerHTML = `Admin ID: ${admin.id}`;
  document.querySelector('#adminNameHead').innerHTML = `${admin.firstname} ${admin.lastname}`;
  localStorage.setItem('adminAccountDetails', JSON.stringify(admin));
}

function createNewAdmin() {
  document.querySelector('#manageAdmins').style.display = 'none';
  document.querySelector('#adminDetails').style.display = 'block';
  document.querySelector('#createNewAdmin').style.display = 'block';
}

window.addEventListener('resize', getWidth);

function getWidth() {
  const width = document.documentElement.clientWidth;
  if (width >= '720') {
    toggleMenu('hide');
  }
}
function toggleMenu(src) {
  if (src == 'hide') {
    if (document.querySelector('.nav-resp-vert') != null) {
      document.querySelector('.nav-resp-vert').style.display = 'none';
    } else if (document.querySelector('.nav-vert-cont') != null) {
      document.querySelector('.nav-vert-cont').style.display = 'none';
    }
    return;
  }
  if (src) {
    const toggle = document.querySelector('.nav-vert-cont');
    if (toggle.style.display.length == 0 || toggle.style.display == 'none') {
      toggle.style.display = 'block';
    } else {
      toggle.style.display = 'none';
    }
  } else {
    const toggle = document.querySelector('.nav-resp-vert');
    if (toggle.style.display.length == 0 || toggle.style.display == 'none') {
      toggle.style.display = 'block';
    } else {
      toggle.style.display = 'none';
    }
  }
}

function showDrowndown(event, id) {
  document.getElementById(`${id}`).classList.toggle("show");
  event.stopPropagation();
}

function showModal(container, message, account) {
  document.querySelector("#modal").style.display = "block";
  document.querySelector('#modalMessage').innerHTML = `Are you sure you want to ${message} this account`;
  localStorage.setItem('modalAction', message);
  document.querySelector(`#${container}`).style.pointerEvents = "none";
  document.querySelector(`#${container}`).style.filter = "blur(1px)";
  if (account.accountnumber) localStorage.setItem('clientAccountDetails', JSON.stringify(account));
  if (account.type === 'staff') localStorage.setItem('staffemailDetails', account.email);
}
function hideModal(container, action) {
  if (action === 'YES') {
    switch (localStorage.getItem('modalAction')) {
      case 'delete':
        deleteAccount(() => {
          document.location.reload();
        });
        break;
      case 'activate':
        activate_deactivateAccount(JSON.parse(localStorage.getItem('clientAccountDetails')).accountnumber, 'active', () => {
          document.location.reload();
        })
        break;
      case 'deactivate':
        activate_deactivateAccount(JSON.parse(localStorage.getItem('clientAccountDetails')).accountnumber, 'dormant', () => {
          document.location.reload();
        })
        break;
    }
  }
  else {
    document.querySelector("#modal").style.display = "none";
    document.querySelector(`#${container}`).style.filter = "blur(0px)";
    document.querySelector(`#${container}`).style.pointerEvents = "all";
    document.querySelector(`#${container}`).style.opacity = "1";
  }
}

function showModal2(container, data) {
  document.querySelector('#transAmount').innerHTML = data.amount
  document.querySelector('#transDate').innerHTML = data.createdon
  document.querySelector('#transType').innerHTML = data.type
  document.querySelector('#transNum').innerHTML = `&#x20A6 ${data.accountnumber}`
  document.querySelector("#modal2").style.display = "block";
  document.querySelector(`#${container}`).style.pointerEvents = "none";
  document.querySelector(`#${container}`).style.filter = "blur(1px)";
}
function hideModal2(container) {
  document.querySelector("#modal2").style.display = "none";
  document.querySelector(`#${container}`).style.pointerEvents = "all";
  document.querySelector(`#${container}`).style.filter = "blur(0px)";
  document.querySelector(`#${container}`).style.opacity = "1";
}

function showErrMessModal(container, errMess, value) {
  document.querySelector('#errMessModal').style.display = "block";
  document.querySelector('#mess').innerHTML = value;
  document.querySelector('#messHeader').innerHTML = errMess;
  document.querySelector(`#${container}`).style.pointerEvents = "none";
  document.querySelector(`#${container}`).style.filter = "blur(1px)";
}

function hideerrMessModal(container) {
  document.querySelector('#errMessModal').style.display = "none";
  document.querySelector(`#${container}`).style.filter = "blur(0px)";
  document.querySelector(`#${container}`).style.opacity = "1";
  document.querySelector(`#${container}`).style.pointerEvents = "all";
}

function preview(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.querySelector('#pass').src = e.target.result;
    }
    reader.readAsDataURL(input.files[0]);
    uploadPassport(input.files[0]);
    console.log(input.files[0])
  }
}