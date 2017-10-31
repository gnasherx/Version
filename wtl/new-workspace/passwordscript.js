// firebase connection var
var firebaseRef = firebase.database().ref();
var userRef = firebaseRef.child('users');
var currentUser;

$(document).ready(function() {

  // code var
  var email = localStorage.getItem('email');
  var name = localStorage.getItem('name');
  var username = localStorage.getItem('username');

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      currentUser = user.uid;
      createUser(name, username, email);
      console.log(currentUser);
    }
  });


  $('#make_account').click(function() {
    firebase.auth().createUserWithEmailAndPassword(email, $('#signup_password').val())
      .then(function() {
        window.location.href = "../../app/app.html";

      })
      .catch(function() {
        alert('Error while creating new account!');
      });
  });




  //validatio for password
  var typingTimer;
  var doneTypingInterval = 1000;
  var $input = $('#signup_password');
  // on keyup,starting countdown;
  $('#signup_password').focusin(function() {
    $('#confirm_email_from_body').removeClass('error');
    $input.on('keyup', function() {
      okayPassword();
      $('#confirm_email_from_body').removeClass('error');
      clearTimeout(typingTimer);
      typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });
    // on keydown, clear the countdown
    $input.on('keydow', function() {
      $('#confirm_email_from_body').removeClass('error');
      clearTimeout(typingTimer);
    });
  });
  $('#signup_password').focusout(function() {
    doneTyping();
  });

}); // ready

function doneTyping() {
  // $('#submit_btn').prop("disabled", false);
  var passw = /^[A-Za-z]\w{7,20}$/;
  if ($('#signup_password').val().match(passw)) {
    $('#confirm_email_from_body').removeClass('error');
    return true;
  } else {
    $('#confirm_email_from_body').addClass('error');
    return false;
  }
}

function okayPassword() {
  var passw = /^[A-Za-z]\w{7,14}$/;
  if ($('#signup_password').val().match(passw)) {
    $('#make_account').removeClass('disabled');
  } else {
    $('#make_account').addClass('disabled');
  }
}

function createUser(name, username, email) {
  var user = {
    name: name,
    username: username,
    email: email,
    uid : currentUser
  }
  userRef.child(currentUser).set(user);
  return true;
}
