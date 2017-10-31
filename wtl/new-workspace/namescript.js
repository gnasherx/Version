// firebase connection var
var firebaseRef = firebase.database().ref();
var userRef = firebaseRef.child('users');
var currentUser;

//code var
var username = $('#username').val();
$(document).ready(function() {

  //validatio for password
  var typingTimer;
  var doneTypingInterval = 100;
  var $inputname = $('#name');
  var $inputusername = $('#username');

  // check exits in database or no
  $('#username').focusin(function() {
    $('#username_div').removeClass('error');
    $inputusername.on('keyup', function() {
      okayNameUsername();
      $('#username_div').removeClass('error');
      clearTimeout(typingTimer);
      typingTimer = setTimeout(doneTypingUsername, doneTypingInterval);
    });
    // on keydown, clear the countdown
    $inputusername.on('keydow', function() {
      $('#username_div').removeClass('error');
      clearTimeout(typingTimer);
    });
  });
  $('#username').focusout(function() {
    doneTypingUsername();
  });

});


function doneTypingUsername() {
  if ($('#username').val() != "") {
    $('#username_div').removeClass('error');

    userRef.orderByChild("username").equalTo($('#username').val()).on('value', function(snap) {
      if (snap.val() !== null) {
        $('#username_div').addClass('error');
        $('#continue_to_password').addClass('disabled');

      } else {
        console.log("okay username");
      }
    });
    return true;
  } else {
    if ($('#username').val().length === 0) {
      $('#username_div').removeClass('error');
      return false;
    } else {
      $('#username_div').addClass('error');
      return false;
    }

  }
}

function okayNameUsername() {
  if (($('#name').val() != "") && ($('#username').val() != "")) {
    $('#continue_to_password').removeClass('disabled');

    document.getElementById('continue_to_password').addEventListener('click', function() {
      // store name and username
      var name = $('#name').val();
      var username = $('#username').val();

      if (localStorage.getItem('name') === null && localStorage.getItem('username') === null) {
        localStorage.setItem('name', name);
        localStorage.setItem('username', username);
      }
      window.location.href = "password.html";
    });
  } else {
    $('#continue_to_password').addClass('disabled');
  }
}