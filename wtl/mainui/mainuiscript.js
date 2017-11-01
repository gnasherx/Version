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


const database = firebase.database();
var currentuser;
var projectref, userRef, taskRef;
var recentprojectname, recentprojectkey;
var taskname, taskpurpose, taskpushkey;

$(document).ready(function() {
  $('#fs_modal').hide();
  $('#fs_modal_invite').hide();

  $('#add_task').click(function() {
    $('#fs_modal').show();
    $('#client_ui').hide();
  });

  $('#cancel_task').click(function() {
    $('#fs_modal').hide();
    $('#client_ui').show();
  });

  $('#fs_modal_close_btn').click(function() {
    $('#fs_modal').hide();
    $('#client_ui').show();
  });

  // $('#invite_people').click(function() {
  //   $('#fs_modal_invite').show();
  //   $('#client_ui').hide();
  // });

  $('#cancel_task').click(function() {
    $('#fs_modal_invite').hide();
    $('#client_ui').show();
  });

  $('#fs_modal_close_btn_invite').click(function() {
    $('#fs_modal_invite').hide();
    $('#client_ui').show();
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      currentuser = user.uid;
      console.log(currentuser);
      projectref = database.ref('projects').child(currentuser);
      groupprojectref = database.ref('groups')
      userRef = database.ref('users').child(currentuser);
      taskRef = database.ref('tasks').child(currentuser);
      // recentTaskref = database.ref('tasks').child(currentuser);

      recentProjectName();

    }
  });

  /*Project name and usesname*/
  function recentProjectName() {
    userRef.child('recentproject').once('value', function(snapshot) {
      recentprojectname = snapshot.val().projectname;
      recentprojectkey = snapshot.val().projectkey;
      document.getElementById('team_name').innerText = recentprojectname;
    });
    userRef.once('value', function(snap) {
      document.getElementById('team_menu_user_name').innerText = snap.val().username;
    });
    return true;
  }


  document.getElementById('save_channel').addEventListener('click', function() {
    taskname = document.getElementById('channel_create_title').value;
    taskpurpose = document.getElementById('channel_purpose_input').value;
    taskpushkey = taskRef.child(recentprojectkey).push().key;
    taskRef.child(recentprojectkey).child(taskname).set({
      taskname: taskname,
      taskkey: taskpushkey,
      taskpurpose: taskpurpose,
      taskstartat: new Date().getTime()
    });
    userRef.child('recenttask').set({
      tasknamekey: taskpushkey
    });
    $('#fs_modal').hide();
    $('#client_ui').show();
  });


    userRef.child('recentproject').on('value', function(snapshot) {
      recentprojectkey = snapshot.val().projectkey;
      console.log(recentprojectkey);
      taskRef.child(recentprojectkey).on('child_added', function(snap) {
        var tasknamevalue = snap.val().taskname;
        console.log(tasknamevalue);
        renderTask(tasknamevalue);
        // userRef.child('recenttask').on('value',function(snapshot){
        // });
      });
    });

  function renderTask(tasknamevalue) {
    var a = document.createElement('a');
    a.style.color = "#fff";
    a.style.height = "26px"
    a.style.fontWeight = "500";
    a.style.lineHeight = "1.2rem";
    a.style.position = "relative";
    a.style.display = "flex";
    a.style.cursor = "pointer";
    a.style.padding = "0 0.75rem 0 16px";
    a.innerText = tasknamevalue;
    var tasklist = document.getElementById('task_list');
    tasklist.appendChild(a);

    return true;
  }

  // send message
  document.getElementById('type_a_message').addEventListener('keydown', function(e) {
    if (e.keyCode == 13) {

    }
  });

  $("#").on("click",'a', function(event){
  var yourRecentTaskName=$(this).text();

  });




});

// all users
$('#invite_people').on('click',function(){
  window.location.href = '../alluser/index.html';
});
