///////////       my custom date in footer    ////////////////
document.getElementById('copyright').appendChild(document.createTextNode(new Date().getFullYear()))

///////////     my custom dark mode toggle button ////////////////

const checkbox = document.querySelector("#checkbox");
const html = document.querySelector("html");
let isDarkmode = false;
const localDarkmode = JSON.parse(localStorage.getItem("isDarkmode"));

// If there isDarkmode in localstorage
if (localDarkmode) {
  isDarkmode = localDarkmode;
  html.classList.add("dark");
} else {
  html.classList.remove("dark");
}

function toggleTheme() {
  isDarkmode = !isDarkmode;
  localStorage.setItem("isDarkmode", isDarkmode);
  switchTheme();
}

function switchTheme() {
  if (isDarkmode) {
    html.classList.add("dark");
    document.getElementById("checkbox").checked = true;
  } else {
    html.classList.remove("dark");
    document.getElementById("checkbox").checked = false;
  }
}
switchTheme();

////////////////////  my custom alert for default entry ////////////////

function showAlertForDelete() {
  var myText =
    "This is default entry you can't perform DELETE operation !!!! \n \n" +
    "Please ADD NEW USER to perform CRUD Operation";
  alert(myText);
}

function showAlertForUpdate() {
  var myText =
    "This is default entry you can't perform UPDATE operation !!!! \n \n" +
    "Please ADD NEW USER to perform CRUD Operation";
  alert(myText);
}

function showAlertForView() {
  var myText =
    "This is default entry you can't VIEW this user !!!! \n \n" +
    "Please ADD NEW USER to perform CRUD Operation";
  alert(myText);
}


////////////  to alert user save data successfully & redirect page to home /////////////

$("#update_user").submit(function(event){
  event.preventDefault();

  var unindexed_array = $(this).serializeArray();
  var data = {}

  $.map(unindexed_array, function(n, i){
      data[n['name']] = n['value']
  })


  var request = {
      "url" : `http://localhost:3000/api/users/${data.id}`,
      "method" : "PUT",
      "data" : data
  }

  $.ajax(request).done(function(response){
      alert("Data Updated Successfully!");
      window.location.href = '/';
  })

})


if(window.location.pathname == "/"){
  $ondelete = $(".table1 tbody tr td a.delete");
  $ondelete.click(function(){
      var id = $(this).attr("data-id")

      var request = {
          "url" : `http://localhost:3000/api/users/${id}`,
          "method" : "DELETE"
      }

      if(confirm("Do you really want to delete this record?")){
          $.ajax(request).done(function(response){
              alert("Data Deleted Successfully!");
              location.reload();
          })
      }

  })
}