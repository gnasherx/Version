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
var projectref, userRef, taskRef,usergroupRef, collaboratewithRef, messageRef;
var recentprojectname, recentprojectkey,taskClick;
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
      collaboratewithRef = firebase.database().ref('collaboratewith');
      messageRef = firebase.database().ref('messages');
      groupRef = database.ref('groups');
      // usergroupRef = database.ref('usergroups');
      userRef = database.ref('users').child(currentuser);
      taskRef = database.ref('tasks');
      // recentTaskref = database.ref('tasks').child(currentuser

      recentprojectDetails();
      showAllTask();
      showAllMessages();

    }
  });

  function recentprojectDetails(){
    /*Project name and usesname*/
    userRef.child('recentproject').once('value', function(snapshot) {
      recentprojectname = snapshot.val().projectname;
      recentprojectkey = snapshot.val().projectkey;
      document.getElementById('team_name').innerText = recentprojectname;
    });

    userRef.once('value', function(snap) {
      document.getElementById('team_menu_user_name').innerText = snap.val().username;
    });

  }



  document.getElementById('save_channel').addEventListener('click', function() {
    console.log('click');
    taskname = document.getElementById('channel_create_title').value;
    taskpurpose = document.getElementById('channel_purpose_input').value;
    taskpushkey = taskRef.child(recentprojectkey + "/" + currentuser).push().key;

    taskRef.child(recentprojectkey+"/"+currentuser+"/"+taskpushkey).set({
      taskname: taskname,
      taskpushkey: taskpushkey,
      taskpurpose: taskpurpose,
      taskstartat: new Date().getTime()
    });

    collaboratewithRef.child(recentprojectkey).on('value', function(s){
      console.log(s.val().member);
      taskRef.child(recentprojectkey+"/"+s.val().member+"/"+taskpushkey).set({
        taskname: taskname,
        taskpushkey: taskpushkey,
        taskpurpose: taskpurpose,
        taskstartat: new Date().getTime()
      });
    });


    userRef.child('recenttask').set({
      tasknamekey: taskpushkey,
    });
    $('#fs_modal').hide();
    $('#client_ui').show();

  });


  function showAllTask() {
    userRef.child('recentproject').on('value', function(snapshot) {
      recentprojectkey = snapshot.val().projectkey;
      console.log(recentprojectkey);
      taskRef.child(recentprojectkey + "/" + currentuser).on('child_added', function(snap) {
        var tasknamevalue = snap.val().taskname;
        console.log(tasknamevalue);
        renderTask(tasknamevalue);
      });
    });
    return true;
  }

  function showAllMessages(){
    // console.log('all msgs');
    userRef.child('recenttask').on('value',function(snap){
      // console.log(snap.val().tasknamekey);
      // console.log(messageRef.child(recentprojectkey+"/"+currentuser+"/"+snap.val().tasknamekey ));
      messageRef.child(recentprojectkey+"/"+currentuser+"/"+snap.val().tasknamekey).on('child_added',function(snapshot){
        console.log(snapshot.val());
        renderMessage(snapshot.val());
      });
    });

  }



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
    a.setAttribute("href", "#msgs_scroller_div");
    var tasklist = document.getElementById('task_list');
    tasklist.appendChild(a);

    return true;
  }

  function renderMessage(message){

     var a = document.createElement('a');
     a.style.color = "#000";
     a.style.height = "26px"
     a.style.fontSize = "22px";
    //  a.style.border = "1px solid #e8e8e8";
    //  a.style.borderRadius = "5px";
     a.style.fontWeight = "500";
     a.style.marginBottom = "8px";
     a.style.alignItems  ="center";
     a.style.lineHeight = "1.2rem";
     a.style.position = "relative";
     a.style.display = "flex";
     a.style.cursor = "pointer";
     a.style.padding = "0 0 0 16px";
      a.innerText = message;
      var messageList = document.getElementById('msgs_scroller_div');
      messageList.appendChild(a);

  }

  // all users
  $('#invite_people').on('click', function() {
    window.location.href = '../alluser/index.html';
  });





  $("#task_list").on("click", 'a', function(event) {
    event.preventDefault();
    var yourRecentTaskName = $(this).text();
    console.log(yourRecentTaskName);
    document.getElementById('taskname').innerText = yourRecentTaskName
    taskRef.child(recentprojectkey+"/"+currentuser).orderByChild('taskname').equalTo(yourRecentTaskName).on("value", function(snapshot) {
      snapshot.forEach((function(child) {
         console.log(child.key);
         taskClick = child.key;
         userRef.child('recenttask').set({
           tasknamekey: taskClick,
         });
        //
       }));
    });


  });


}); //ready



// send message
document.getElementById('sendmessagebtn').addEventListener('click', function() {
    console.log(document.getElementById('textmessage').value);
    var thismessage = document.getElementById('textmessage').value;

    messageRef.child(recentprojectkey+"/"+currentuser+"/"+taskClick).push().set(thismessage);
    collaboratewithRef.child(recentprojectkey).on('value', function(s){
      messageRef.child(recentprojectkey+"/"+s.val().member+"/"+taskClick).push().set(thismessage);
    });
      $('input[type="text"]').val('');
});
