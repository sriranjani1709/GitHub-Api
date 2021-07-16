var newDiv1 = document.createElement("div");
document.body.appendChild(newDiv1);

//main div
docdiv = document.createElement("div");
docdiv.className = "maindiv";
docdiv.setAttribute("id", "docdiv");
docdiv.setAttribute("align", "center");
docdiv.style.padding = "1.5%";
newDiv1.appendChild(docdiv);

//image
var image = document.createElement("img");
image.setAttribute("src", "fluidicon.png");
image.setAttribute("class", "icon octicon-mark-github color-text-white");
docdiv.appendChild(image);

//heading
var heading = document.createElement("h1");
heading.setAttribute("class", "heading display-5");
heading.innerText = "Sign in to GitHub";
docdiv.appendChild(heading);

//mid div
var middiv = document.createElement("div");
middiv.setAttribute("class", "middiv auth-form-body");
docdiv.appendChild(middiv);

//inputdiv
var inputdiv = document.createElement("div");
inputdiv.className = "input";
middiv.appendChild(inputdiv);

//username
var username = document.createElement("label");
username.innerText = "Username or email address";
username.className = "username";
inputdiv.appendChild(username);

//search textfield
var searchfield = document.createElement("input");
searchfield.placeholder = "Search or jump to...";
searchfield.setAttribute("class", "container form-control");
searchfield.setAttribute("id", "textbox");
searchfield.style.marginRight = "20px";
username.appendChild(searchfield);

//bottom
var bottomdiv = document.createElement("div");
inputdiv.appendChild(bottomdiv);

//sign in
var sign = document.createElement("button");
sign.innerText = "Fetch Repositories";
sign.setAttribute("class", "signin btn-success");
sign.setAttribute("onclick", "fetchApi()");
bottomdiv.appendChild(sign);

//to clear page on click
var newDiv4 = document.createElement("div");
document.body.appendChild(newDiv4);

function fetchApi() {
  var search = document.getElementById("textbox").value;
  async function searchData() {
    try {
      var name = search.split(" ").join("");
      var data = await fetch(`https://api.github.com/users/${name}/repos`);
      var result = await data.json();

      var div10 = document.createElement("div");
      newDiv4.innerHTML = "";
      newDiv1.innerHTML = "";
      newDiv4.appendChild(div10);
      div10.style.textAlign = "center";

      //welcome msg
      var welcome = document.createElement("h4");
      welcome.innerText = "Welcome to GitHub, " + name + " !";
      welcome.setAttribute("class", "welcome");
      div10.appendChild(welcome);

      //profile avatar
      var img = document.createElement("img");
      div10.appendChild(img);
      img.setAttribute(
        "class",
        "avatar avatar-user width-full border color-bg-primary"
      );
      img.setAttribute = ("id", "avatar");
      img.src = `https://avatars.githubusercontent.com/u/${result[0].owner.id}?v=4`;
      img.style.display = "block";
      img.style.marginLeft = "auto";
      img.style.marginRight = "auto";
      img.style.width = "250px";
      img.style.height = "250px";
      img.style.border = "solid";
      img.style.borderWidth = "5px";
      img.style.borderRadius = "20px";

      var allrepo = document.createElement("h4");
      allrepo.innerText = "Repositories";
      div10.appendChild(allrepo);
      allrepo.style.textAlign = "center";

      for (i = 0; i <= result.length; i++) {
        //repo name
        var a1 = document.createElement("a");
        div10.appendChild(a1);
        a1.href = `https://github.com/${search}/${result[i].name}`;
        a1.style.textDecoration = "none";
        var repo = document.createElement("li");
        a1.appendChild(repo);
        var repohead = document.createElement("h1");
        repo.appendChild(repohead);
        repohead.innerText = result[i].name;

        // fork count
        var forkcount = document.createElement("h5");
        div10.appendChild(forkcount);
        forkcount.innerText = "fork count:" + result[i].forks_count;

        //stars count
        var starscount = document.createElement("h5");
        div10.appendChild(starscount);
        starscount.innerText = "stars count:" + result[i].stargazers_count;
      }
    } catch (err) {
      console.log(err);
    }
  }

  searchData();
}
