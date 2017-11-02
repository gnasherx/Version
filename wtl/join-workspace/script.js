// Initialize Firebase
var config = {
  apiKey: "AIzaSyCWhQO2E5I4i4hM31eAzGm1LCplNdTDpPw",
  authDomain: "version-49085.firebaseapp.com",
  databaseURL: "https://version-49085.firebaseio.com",
  projectId: "version-49085",
  storageBucket: "version-49085.appspot.com",
  messagingSenderId: "983401663857"
};
firebase.initializeApp(config);



$(document).ready(function() {


  //validatio for email
  var typingTimerEmail;
  var doneTypingIntervalEmail = 5000;

  var $input = $('#signin_email');
  // on keyup,starting countdown;
  $('#signin_email').focusin(function() {
    $('#find_team_flow').removeClass('error');
    $input.on('keyup', function() {
      $('#find_team_flow').removeClass('error');
      okayEmailPassword();
      clearTimeout(typingTimerEmail);
      typingTimerEmail = setTimeout(doneTypingEmail, doneTypingIntervalEmail);
    });
    // on keydown, clear the countdown
    $input.on('keydow', function() {
      $('#find_team_flow').removeClass('error');
      clearTimeout(typingTimerEmail);
    });
  });
  $('#signin_email').focusout(function() {
    doneTypingEmail();
  });

  var typingTimerPass;
  var doneTypingIntervalPass = 5000;

  var $input_pass = $('#signin_password');
  // on keyup,starting countdown;
  $('#signin_password').focusin(function() {
    $('#find_team_flow').removeClass('error_pass');
    $input_pass.on('keyup', function() {
      okayEmailPassword();
      $('#find_team_flow').removeClass('error_pass');
      clearTimeout(typingTimerPass);
      typingTimerPass = setTimeout(doneTypingPass, doneTypingIntervalPass);
    });
    // on keydown, clear the countdown
    $input_pass.on('keydow', function() {
      $('#find_team_flow').removeClass('error_pass');
      clearTimeout(typingTimerPass);
    });
  });
  $('#signin_pass').focusout(function() {
    doneTypingPass();
  });





$('#cancel_btn').on('click',function(){
  window.location.href = "../new-workspace/index.html";
});
var allfirebaseUserRef;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    currentuser = user.uid;
    console.log(currentuser);
    allfirebaseUserRef = firebase.database().ref('users');
  }
});

$('#cancel_btn').on('click',function(){
  console.log('clikc');
});

  // Signin user

  $('#join_btn').on('click', function(){
    console.log('click');

    var signin_email=document.getElementById('signin_email').value;
    var signin_password=document.getElementById('signin_password').value;

    console.log(signin_email);
    console.log(signin_password);

    firebase.auth().signInWithEmailAndPassword(signin_email, signin_password)
      .then(function(){
        console.log('okay....');
        checkUserIsSignedUp(signin_email,signin_password);
        // window.location.href="../app/app.html";
      });
      //   .catch(function(){
      //   alert('SigninError, login failed!');
      // });
});

function checkUserIsSignedUp(signin_email,signin_password){
  console.log('inside checkUserIsSignedUp');
  allfirebaseUserRef.once('value')
  .then(function(snapshot){
      console.log(snapshot);
      if(snapshot.hasChild(currentuser)){
        window.location.href="../app/app.html";
      }
    })
    .catch(function(){
      alert("You are not an autorised person!");
    });
return true;
}


function doneTypingEmail() {
  // $('#submit_btn').prop("disabled", false);
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if ($('#signin_email').val().match(mailformat)) {
    return true;
  } else {
    var emailLetterCount = $('#signin_email').val().length;
    if (emailLetterCount == 0) {
      $('#find_team_flow').removeClass('error');
    } else {
      $('#find_team_flow').addClass('error');
    }
    return false;
  }
}

function doneTypingPass() {
  // $('#submit_btn').prop("disabled", false);
  var passw = /^[A-Za-z]\w{7,20}$/;
  if ($('#signin_password').val().match(passw)) {
    $('#find_team_flow').removeClass('error_pass');
    return true;
  } else {
    $('#find_team_flow').addClass('error_pass');
    return false;
  }
}

function okayEmailPassword() {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var passw = /^[A-Za-z]\w{7,14}$/;
  if ($('#signin_email').val().match(mailformat) && $('#signin_password').val().match(passw)) {
    $('#join_btn').removeClass('disabled');
  } else {
    $('#join_btn').addClass('disabled');
  }
}

});
