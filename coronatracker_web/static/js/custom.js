// toast config
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
});

function addRecordForUser(userId) {
  if (!userId) {
    throw new Error('addRecordForUser - no user id');
  }

  $.ajax({
    type: 'POST',
    url: '/recordings/',
    data: {
      user: `/recordable-users/${userId}/`,
    },
    success: function (data) {
      loadRecordings();

      Toast.fire({
        icon: 'success',
        title: 'Record successfully created',
      });
    },
    error: function (err) {
      const errorText = 'duplicate key';

      if (err.status === 500 && err.responseText.includes(errorText)) {
        Toast.fire({
          icon: 'error',
          title: 'User is already present today',
        });
      }

      Toast.fire({
        icon: 'error',
        title: 'Record could not be created',
      });
    },
  });
}

function loadRecordings() {
  $.ajax({
    type: 'GET',
    url: '/recordings-today/',
    success: function (data) {
      updateRecordingList(data);
    },
    error: function (err) {
      console.log('error: ', err);
    },
  });
}

function updateRecordingList(records) {
  $('#recordTableBody').empty();

  records.forEach((record) => {
    $('#recordTableBody').append(`<tr><td>${record.user_name}</td></tr>`);
  });
}

function loadUsers() {
  $.ajax({
    type: 'GET',
    url: '/recordable-users/',
    success: function (data) {
      updateUserList(data);
    },
    error: function (err) {
      console.log('error: ', err);
    },
  });
}

function updateUserList(records) {
  $('#users-list').empty();

  records.forEach((user) => {
    var userString = `<li><a href="javascript:addRecordForUser(${user.id})">`;

    if (user && user.img_url) {
      userString += `<img src="${user.img_url}" alt="User Image" />`;
    } else {
      userString += `<img src="/static/dist/img/user1-128x128.jpg" alt="User Image" />`;
    }

    userString += `<p class="users-list-name"><b>${user.name}</b></p></a></li>`;

    $('#users-list').append(userString);
  });
}

// initial loading
loadRecordings();
loadUsers();

function onAddUserCancel() {
  $('#add-user-form').trigger('reset');
}

// add user
$(document).ready(function () {
  $('#add-user-form').submit(function (e) {
    e.preventDefault();

    $.ajax({
      type: 'POST',
      url: '/recordable-users/',
      data: {
        name: $('#add-user-name').val(),
        img_url: $('#add-user-img_url').val(),
      },
      success: function (data) {
        console.log('users: ', data);

        $('#modal-default').modal('hide');
        $('#add-user-form').trigger('reset');

        loadUsers();

        Toast.fire({
          icon: 'success',
          title: 'User successfully created',
        });
      },
      error: function (err) {
        console.log('error: ', err);

        Toast.fire({
          icon: 'error',
          title: 'User could not be created',
        });
      },
    });
  });
});

function updateTodayString() {
  $('#today-string').text(moment().format('ddd, D.M.YY'));
}
updateTodayString();

// update data every 15 mins
setInterval(function () {
  loadRecordings();
  updateTodayString();
}, 15 * 60 * 1000);
