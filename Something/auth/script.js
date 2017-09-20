$(document).ready(function(){


  //validatio for email
  var typingTimer;
  var doneTypingInterval=5000;
  var $input=$('#signup_email');
  // on keyup,starting countdown;
  $('#signup_email').focusin(function(){
    $('#email_form_body').removeClass('error');
      $input.on('keyup',function(){
      $('#email_form_body').removeClass('error');
      okayEmail();
      clearTimeout(typingTimer);
      typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });
    // on keydown, clear the countdown
    $input.on('keydow',function(){
      $('#email_form_body').removeClass('error');
      clearTimeout(typingTimer);
    });
  });
  $('#signup_email').focusout(function(){
    doneTyping();
  });

});

function doneTyping(){
  // $('#submit_btn').prop("disabled", false);
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   if($('#signup_email').val().match(mailformat)){
   return true;
  }else{
    var emailLetterCount=$('#signup_email').val().length;
    if(emailLetterCount==0){
      $('#email_form_body').removeClass('error');
    }else {
      $('#email_form_body').addClass('error');
    }
    return false;
  }
}
function okayEmail(){
  console.log('okayEmail');
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if($('#signup_email').val().match(mailformat)){
    $('#submit_btn').removeClass('disabled');
    document.getElementById('submit_btn').addEventListener('click',function(){
    window.location.href="password.html";
  });
  return true;
  }else{
    $('#submit_btn').addClass('disabled');
    return false;
  }
}
