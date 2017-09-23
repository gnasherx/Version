$(document).ready(function(){

  //validatio for password
  var typingTimer;
  var doneTypingInterval = 5000;
  var $inputname = $('#name');
  var $inputusername= $('#username');

  // on keyup name,starting countdown;
  $('#name').focusin(function() {
    console.log('focus name');
    $('#name_div').removeClass('error');
    $inputname.on('keyup', function() {
      okayNameUsername();
      $('#name_div').removeClass('error');
      clearTimeout(typingTimer);
      typingTimer = setTimeout(doneTypingName, doneTypingInterval);
    });
    // on keydown, clear the countdown
    $inputname.on('keydow', function() {
      $('#name_div').removeClass('error');
      clearTimeout(typingTimer);
    });
  });
  $('#name').focusout(function() {
    console.log('focus out name');
    doneTypingName();
  });


  // on keyup username,starting countdown;
  $('#username').focusin(function() {
    console.log('focus username');

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
    console.log('focus out username');
    doneTypingUsername();
  });


});

function doneTypingName() {
  console.log('done name');
  if ($('#name').val() != "") {
    $('#name_div').removeClass('error');
    return true;
  } else {
    $('#name_div').addClass('error');
    return false;
  }
}
function doneTypingUsername() {
  console.log('done username');
  if ($('#username').val() != "") {
    $('#username_div').removeClass('error');
    return true;
  } else {
    $('#username_div').addClass('error');
    return false;
  }
}

function okayNameUsername() {
  console.log('okay name pass');
  if ( ($('#name').val() != "") && ($('#username').val() != "") ) {
    $('#continue_to_password').removeClass('disabled');
    document.getElementById('continue_to_password').addEventListener('click', function() {
      window.location.href = "password.html";
    });
  } else {
    $('#continue_to_password').addClass('disabled');
  }
}
