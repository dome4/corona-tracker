// toast config
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 4000,
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
      addGesturesToRecords();
    },
    error: function (err) {
      console.log('error: ', err);
    },
  });
}

function updateRecordingList(records) {
  $('#recordTableBody').empty();

  records.forEach((record) => {
    $('#recordTableBody').append(
      `<tr><td id="${record.id}">${record.user_name}</td></tr>`
    );
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

    if (user && user.avatar) {
      userString += `<img src="data:image/png;base64,${user.avatar}" alt="User Image" />`;
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

function deleteRecordById(id) {
  if (!id) {
    throw new Error('delete record - id not found');
  }

  $.ajax({
    type: 'DELETE',
    url: `/recordings/${id}`,
    success: function () {
      // reload records list
      loadRecordings();

      Toast.fire({
        icon: 'success',
        title: 'Record successfully deleted',
      });
    },
    error: function (err) {
      console.log('error: ', err);

      Toast.fire({
        icon: 'error',
        title: 'Record could not be deleted',
      });
    },
  });
}

/************************************************************/
/************************* Gestures *************************/
/************************************************************/

function addGesturesToRecords() {
  var records = document.getElementById('recordTableBody').childNodes;
  for (const record of records) {
    var hammertime = new Hammer(record);
    hammertime.on('press', (event) => {
      if (!event || !event.target || !event.target.id) {
        throw new Error('record pressed - invalid event');
      }

      // open confirmation modal
      if (confirm('Are you sure that you want to delete the record?')) {
        // delete record
        const idToDelete = event.target.id;
        deleteRecordById(idToDelete);
      }
    });
  }
}
