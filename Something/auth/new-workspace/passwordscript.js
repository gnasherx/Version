$(document).ready(function() {
  //validatio for password
  var typingTimer;
  var doneTypingInterval = 5000;
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
  $('#signup_email').focusout(function() {
    doneTyping();
  });

});

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
