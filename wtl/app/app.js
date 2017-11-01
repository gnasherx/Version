
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

  const database=firebase.database();
  var currentuser;
  var projectname;
  var projectref,userRef,usergroups;
  var newProjectKey;

$(document).ready(function(){



  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    currentuser=user.uid;
    projectref=database.ref('projects').child(currentuser);
    groupprojectref=database.ref('groups');
    userRef=database.ref('users').child(currentuser);
    usergroups = firebase.database().ref('usergroups');

     show();

    } else {
    window.location.href="../join-workspace/index.html";
    }
  });

});



  $('#log_out').click(
    function(){
      firebase.auth().signOut().then(function() {
        localStorage.clear();
         window.location.href="../join-workspace/index.html";
      }).catch(function(error) {
        alert('error occured while signing you out!');
      });
    }
  );

document.getElementById('recent_project_name').addEventListener('click',function(){
  console.log('recent project');
  window.location.href="../mainui/mainuiindex.html";
});
 /*user isoc dropdown*/
 $("#userinfo-Dropdown").hide();
 document.getElementById('user-dropdown-toggle').addEventListener('click' ,openDropdown);
 function openDropdown(){
    $("#userinfo-Dropdown").toggle('fast')
 }

 /*add new project*/
 document.getElementById('submit_project_name').addEventListener('click', function(e){
   e.preventDefault();
   projectname=document.getElementById('project_name').value;
   newProjectKey = projectref.push().key;

   if(projectname !== ""){

     projectref.child(projectname).set({
       name:projectname,
       startdate:new Date().getTime(),
       projectkey:newProjectKey,
      });

     groupprojectref.child(newProjectKey+"/"+currentuser+"/"+projectname).set({
       name:projectname,
       startdate:new Date().getTime(),
       projectkey:newProjectKey
      });

      //  add rcentproject
      var recentprojectinfo = {
        projectname:projectname,
        projectkey:newProjectKey,
      }
      /*Add recent project name to user details*/
      userRef.child('recentproject').set(recentprojectinfo);

      //  add currentuser to the group
      var recentgroupinfo = {
        groupname:projectname,
        groupkey:newProjectKey,
      }
        // add user to group
      usergroups.child(currentuser+"/"+newProjectKey).set(recentgroupinfo);
        // add recentgroup to profile
      userRef.child('recentgroup').set({
      groupname:yourRecentGroupName,                /////////////////////////////////////////////////////////<<<<--------------
      groupkey:groupkey,
    });

     document.getElementById('project_name').value='';
   }else{
     alert("You must enter a new project name!");
   }
   return true;
 });


 function show(){
    //retriveing database values

   projectref.orderByChild('startdate').on('child_added', function(snapshot){
    var nameofproject = snapshot.val().name;
    document.getElementById('recent_project_name').innerText = nameofproject;
    renderui(nameofproject);
    return true;
  });

  usergroups.child(currentuser).on('child_added',function(snap){
    var nameofgroup = snap.val().groupname;
    var keyofgroup = snap.val().groupkey;
    document.getElementById('recent_group_name').innerText = nameofgroup
    rendergroup(nameofgroup, keyofgroup);
    return true;
  });

}


  function rendergroup(groupname, groupkey){
    var a=document.createElement('a');

    a.style.padding="8px 14px 9px";
    a.style.fontSize="15px";
    a.style.backgounrd="#FBFBFA";
    a.style.color="#555459";
    a.style.fontWeight="500";
    a.style.lineHeight="1.2rem";
    a.style.border="1px solid #A0A0A2"
    a.style.borderRadius=".25rem";
    a.style.boxShadow="none";
    a.style.position="relative";
    a.style.display="flex";
    a.style.textAlign="center";
    a.style.justifyContent="center";
    a.style.cursor="pointer";
    a.style.marginRight="4px";
    a.style.flexWrap="wrap";
   a.innerText=groupname;
   var grouplist = document.getElementById('group-list-name');
   grouplist.appendChild(a);

   $("#group-list-name").on("click",'a', function(event){
   var yourRecentGroupName=$(this).text();
   document.getElementById('recent_group_name').innerText=yourRecentGroupName;
       /*Add recent project name to user details*/
       userRef.child('recentgroup').set({
       groupname:yourRecentGroupName,
       groupkey:groupkey,
     });
     /*top recenet project name for easy acces*/
 });


    return true;
  }

  function renderui(project){
    var a=document.createElement('a');

    a.style.padding="8px 14px 9px";
    a.style.fontSize="15px";
    a.style.backgounrd="#FBFBFA";
    a.style.color="#555459";
    a.style.fontWeight="500";
    a.style.lineHeight="1.2rem";
    a.style.border="1px solid #A0A0A2"
    a.style.borderRadius=".25rem";
    a.style.boxShadow="none";
    a.style.position="relative";
    a.style.display="flex";
    a.style.textAlign="center";
    a.style.justifyContent="center";
    a.style.cursor="pointer";
    a.style.marginRight="4px";
    a.style.flexWrap="wrap";
     a.innerText=project;
     var projectlist=document.getElementById('project-list-name');
     projectlist.appendChild(a);

    $("#project-list-name").on("click",'a', function(event){
    var yourRecentProjectName=$(this).text();
    var recentProjectKey;
  //  window.location.href="../mainui/mainuiindex.html";

    projectref.child(yourRecentProjectName).once('value', function(snapshot){
      console.log("================");
      console.log(snapshot.val());
      recentProjectKey = snapshot.val().projectkey;
        /*Add recent project name to user details*/
        userRef.child('recentproject').set({
        projectname:yourRecentProjectName,
        projectkey:recentProjectKey
      });
      /*top recenet project name for easy acces*/
     document.getElementById('recent_project_name').innerText=yourRecentProjectName;

    });

   });

     return true;
  }
