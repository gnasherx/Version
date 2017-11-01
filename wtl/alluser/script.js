// Initialize Firebase
var config = {
  apiKey: "AIzaSyCWhQO2E5I4i4hM31eAzGm1LCplNdTDpPw",
  authDomain: "version-49085.firebaseapp.com",
  databaseURL: "https://version-49085.firebaseio.com",
  projectId: "version-49085",
  storageBucket: "version-49085.appspot.com",
  messagingSenderId: "983401663857"
};
firebase.initializeApp(config)


$(document).ready(function() {
  var username, usernameclick, name, recentProjectKey, recentProjectName;

  var userRef = firebase.database().ref('users');
  var projectRef = firebase.database().ref('projects');
  var usergroups = firebase.database().ref('usergroups');
  var groups = firebase.database().ref('groups');

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      currentuser = user.uid;
      console.log(currentuser);

    }
  });

  userRef.on('child_added', function(snapshot) {
    username = snapshot.val().username;
    name = snapshot.val().name;
    console.log(`username: ${username} name:${name}`);
    renderData(username, name);
  });

  $("#showallusers").on("click", 'a', function(event) {
    usernameclick = $(this).text();
    $(this).css("color", "#2ab27b");
    console.log(usernameclick);
    userRef.orderByChild("username").equalTo(usernameclick).on('child_added', function(snap) {
      if (snap.val() !== null) {
        var useruid = snap.val().uid;
        console.log(useruid);

        userRef.child(currentuser).child("recentproject").once('value', function(s) {
          recentProjectKey = s.val().projectkey;
          recentProjectName = s.val().projectname;
          console.log(recentProjectName);
        });

        // make group with recentproject key======1=======
        projectRef.child(currentuser+"/"+recentProjectName).once('value', function(snap) {
          groups.child(recentProjectKey + "/"+ useruid).child(recentProjectName).set(snap.val());
          groups.child(recentProjectKey + "/"+ currentuser).child(recentProjectName).set(snap.val());
        });


        //  add user to the grouop
        var usergroupmodel = {
          groupname : recentProjectName,
          groupkey : recentProjectKey
        }
        usergroups.child(currentuser+"/"+recentProjectKey).set(usergroupmodel);///worng
        usergroups.child(useruid+"/"+recentProjectKey).set(usergroupmodel);


      }
    });
  });






});


function renderData(username, name) {
  var a = document.createElement("a");
  a.style.color = '#717274';
  a.style.height = "46px";
  a.style.fontWeight = "600";
  a.style.lineHeight = "4rem";
  a.style.fontSize = "36px";
  a.style.display = "flex";
  a.style.cursor = "pointer";
  a.style.alignItems = "center";
  a.style.background = "#fff";
  a.style.boxShadow = "0 1px 0 regba(0,0,0,0.25)";
  a.style.border = "1px solid #e8e8e8";
  a.style.padding = "0 0.75rem 0 0.75rem";
  a.style.marginBottom = "8px";
  a.innerText = username;

  document.getElementById('showallusers').appendChild(a);

  return true;

}
