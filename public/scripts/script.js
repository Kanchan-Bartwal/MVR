var rr = 0;

function logout() {
    window.localStorage.removeItem("userID");
    window.location.replace('https://ketflix-mvr.herokuapp.com/index.html');
}

async function onSignup() {
    var url = 'https://ketflix-mvr.herokuapp.com/adduser';
     await fetch(url, {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({email: document.getElementById("semail").value, password: document.getElementById("spassword").value, name: document.getElementById("uname").value})
   }).then((data) => {
    return data.json();
   })
   .then((completeData)=>{
     console.log(completeData);
       if(completeData['success']){
        window.localStorage.setItem("userID", completeData['userID']);
        window.location.replace('https://ketflix-mvr.herokuapp.com/home.html');
       } else {
        window.alert(completeData['msz']);
       }
})
.catch((err)=>{
    console.log(err);
    window.alert('An Error Occuured');
});
 }


async function onLogin() {
   var url = 'https://ketflix-mvr.herokuapp.com/authenticate';
   await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: document.getElementById("lemail").value, password: document.getElementById("lpassword").value})
  }).then((data) => {
    return data.json();
   }).then((completeData)=>{
       if(completeData['success']){
         console.log(completeData['userID']);
        window.localStorage.setItem("userID", completeData['userID']);
        window.location.replace('/home.html');
       } else {
        window.alert(completeData['msz']);
       }
}).catch((err)=>{
    console.log(err);
    window.alert('An Error Occuured');
});
}

async function movieWatched(mov) {
    var url = 'https://ketflix-mvr.herokuapp.com/moviewatched';
    console.log('vvv'+ window.localStorage.getItem("userID") + mov)
    await fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({userID:  window.localStorage.getItem("userID"),movie: mov})
          }).then((data) => {
           return data.json();
          }).then((completeData)=>{
              if(completeData['success']){
              } else {
              }
       }).catch((err)=>{
           console.log(err);
           window.alert('An Error Occuured');
       });
}

async function rateMovie(mov,rev) {

    var uuID = window.localStorage.getItem("userID");
    console.log('uuid'+uuID+ " " + mov +  " " + rev);
    // var userReviews = window.localStorage.getItem("reviews");
    var url = 'https://ketflix-mvr.herokuapp.com/reviewmovie';
    await fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({userID: uuID, movie: mov, review: rev})
          }).then((data) => {
           return data.json();
          }).then((completeData)=>{
            console.log(completeData['msz']);
              // if(completeData['success']){
              //   onCollaborativeSearch();
              //               } else {
              //   window.alert(completeData['msz']);
              // }
       })
       .catch((err)=>{

           console.log(err);
          //  window.alert('An Error Occuured' + err);
       })
       ;
}

async function onContentBased(movName) {
    var url = 'https://ketflix-mvr.herokuapp.com/contentbased?mName='+ movName;
    await fetch(url).then((data)=>{
        console.log(data);
        return data.json();
    }).then((completeData)=>{
        let data1="";
        let i;
        if(typeof completeData['movieName'] !== 'undefined'){
        for(i=0;i<completeData['movieName'].length;i++){
                data1+= `<li>
                <div id="smodal${i}" onclick="showModal('s${i}','smodal${i}','${completeData['movieName'][i]}','${completeData['moviePoster'][i]}')" class="movie-card">
                      <figure class="card-banner">
                      <img src="${completeData['moviePoster'][i]}" alt="${completeData['movieName'][i]}">
                    </figure>
                  <div class="title-wrapper">
                      <h3 class="card-title">${completeData['movieName'][i]}</h3>
                  </div>

                </div>
              </li>`
              if(i==3){
                break;
              }
        }
      }
        document.getElementById('contentbased').innerHTML=data1;
        document.getElementById("content-default").style.display="none";

    }).catch((err)=>{
        console.log(err);
        window.alert('An Error Occuured');
    });
}

async function onSearch() {
    var url = 'https://ketflix-mvr.herokuapp.com/contentbased?mName='+ document.getElementById("mName").value;
    await fetch(url).then((data)=>{
        console.log(data);
        return data.json();
    }).then((completeData)=>{
        let data1="";
        let i;
        if(typeof completeData['movieName'] !== 'undefined'){
        for(i=0;i<completeData['movieName'].length;i++){
                data1+= `<li>
            <div id="cmodal${i}" onclick="showModal('c${i}','cmodal${i}','${completeData['movieName'][i]}','${completeData['moviePoster'][i]}')" class="movie-card">
                  <figure class="card-banner">
                  <img src="${completeData['moviePoster'][i]}" alt="${completeData['movieName'][i]}">
                </figure>
              <div class="title-wrapper">
                  <h3 class="card-title">${completeData['movieName'][i]}</h3>
              </div>
            </div>
          </li>`
          if(i==3){
            break;
          }
        }
      }
        document.getElementById('searchbased').innerHTML=`<ul class="movies-list">`+data1+`</ul>`;
        document.getElementById('search-section').className="upcoming";
        document.getElementById('head-section').className="inactive";
        document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera


    }).catch((err)=>{
        console.log(err);
        window.alert('An Error Occuured');
    });
}

async function onGetUser() {
  console.log('0 '+ window.localStorage.getItem('userID'));
    var url = 'https://ketflix-mvr.herokuapp.com/getuserinfo?userID='+window.localStorage.getItem('userID');
    await fetch(url).then((data)=>{
        return data.json();
    }).then((completeData)=>{
        onGenreSearch('best');
        console.log("dd" + completeData['msz'][0]);
        if(typeof completeData['msz'][0]['reviews'] !== 'undefined'){
        if(completeData['msz'][0]['reviews'].length !== 0){
        onCollaborativeSearch();
        }
      } else {
        console.log("1 " + completeData['msz']);
      }
      if(typeof completeData['msz'][0]['movieWatched'] !== 'undefined'){
        if(completeData['msz'][0]['movieWatched'].length !== 0){
          var lenn = completeData['msz'][0]['movieWatched'].length;
            onContentBased(completeData['msz'][0]['movieWatched'][lenn-1]);
            }
          } else {
            console.log("2 " +completeData['msz'][0]);
          }
    }).catch((err)=>{
      console.log(err);

      window.alert('An Error Occuured');
      // logout();
    });
}

async function onGenreSearch(gne) {
    var url = 'https://ketflix-mvr.herokuapp.com/genrebased?genre='+gne;
    await fetch(url).then((data)=>{
        return data.json();
    }).then((completeData)=>{
        console.log("Afs"+completeData['movieName']);
        let data1="";
        let i;
        let data0=`<div class="card">${gne.toUpperCase()} Movies</div>`
        for(i=0;i<completeData['movieName'].length;i++){
                data1+= `<li>
                <div id="gmodal${i}" onclick="showModal('g${i}','gmodal${i}','${completeData['movieName'][i]}','${completeData['moviePoster'][i]}')" class="movie-card">
                      <figure class="card-banner">
                      <img src="${completeData['moviePoster'][i]}" alt="${completeData['movieName'][i]}">
                    </figure>
                  <div class="title-wrapper">
                      <h3 class="card-title">${completeData['movieName'][i]}</h3>
                  </div>
                </div>
              </li>`
        }
        document.getElementById('genrebased').innerHTML=data0+data1;
    }).catch((err)=>{
        console.log(err);
        window.alert('An Error Occuured');
    });
}

async function onCollaborativeSearch() {
    var url = 'https://ketflix-mvr.herokuapp.com/collaborative?userID='+window.localStorage.getItem("userID");
    await fetch(url).then((data)=>{
        return data.json();
    }).then((completeData)=>{
        console.log("As"+completeData['movieName']);
        let data1="";
        let i;
        if(typeof completeData['movieName'] !== 'undefined'){
        for(i=0;i<completeData['movieName'].length;i++){
            data1+= `<li>
            <div id="omodal${i}" onclick="showModal('o${i}','omodal${i}','${completeData['movieName'][i]}','${completeData['moviePoster'][i]}')" class="movie-card">
                  <figure class="card-banner">
                  <img src="${completeData['moviePoster'][i]}" alt="${completeData['movieName'][i]}">
                </figure>
              <div class="title-wrapper">
                  <h3 class="card-title">${completeData['movieName'][i]}</h3>
              </div>
            </div>
          </li>`
          if(i==3){
            break;
          }
    }
  }
        document.getElementById('collaborative').innerHTML=data1;
        document.getElementById("collab-default").style.display="none";
    }).catch((err)=>{
        console.log(err);
        window.alert('An Error Occuured');
    });
}


//Modal Sheet
function showModal(ind,idm,movie,poster) {
  movieWatched(movie);
    modalSheet(ind,movie,poster);
    document.getElementById(idm).addEventListener('click', () => {
        document.querySelector('.modal').classList.remove('hide');
    });
}

function hideModal(idm) {
    console.log(idm);
    document.getElementById(idm).addEventListener('click', () => {
        document.querySelector('.modal').classList.add('hide');
    });
}

function modalSheet(ind,movie,poster) {
    rr=0;
    var mData = `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
    <div style="padding-top:20px; flex-direction: column; display: flex; justify-content: right; align-content: center;align-items: center;">
    <button style="padding-bottom:20px; justify-content: end; display: flex;" id="close-modal${ind}" onClick="hideModal('close-modal${ind}')"><ion-icon style="font-size: 40px; color:white;" name="close-circle"></ion-icon></button>
    <div style="display:flex; align-content: center;justify-content: center; width: 30%" position: fixed;
    background: var(--gunmetal-1);
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 10px;>
                  <img style="border-radius: 10px;" src="${poster}" alt="poster" width="200" height="300">
                  </div>
              <div style="display: flex;justify-content: center;align-items: center;gap: 20px;margin: 20px 0 10px 0;">
                  <h3 style="color: white;font-size:font-weight: 400; 16px;transition: var(--transition-1);">${movie}</h3>
              </div>
            <style>
            @import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
.rcontainer{
  position: fixed;
  width: 400px;
  background: #111;
  padding: 20px 30px;
  border: 1px solid #444;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.rcontainer .post{
  display: none;
}
.rcontainer .text{
  font-size: 25px;
  color: #666;
  font-weight: 500;
}
.rcontainer .edit{
  position: absolute;
  right: 10px;
  top: 5px;
  font-size: 16px;
  color: #666;
  font-weight: 500;
  cursor: pointer;
}
.rcontainer .edit:hover{
  text-decoration: underline;
}
.star-widget {
  flex-direction: row-reverse;
  display: flex;
}
.rcontainer .star-widget input{
  display: none;
}
.star-widget label{
  cursor: pointer;
  font-size: 40px;
  color: #444;
  padding: 10px;
  float: right;
  transition: all 0.2s ease;
}
input:not(:checked) ~ label:hover,
input:not(:checked) ~ label:hover ~ label{
  color: #fd4;
}
input:checked ~ label{
  color: #fd4;
}
input#rate-5:checked ~ label{
  color: #fe7;
  text-shadow: 0 0 20px #952;
}
#rate-1:checked ~ form header:before{
  content: "I just hate it ";
}
#rate-2:checked ~ form header:before{
  content: "I don't like it ";
}
#rate-3:checked ~ form header:before{
  content: "It is awesome ";
}
#rate-4:checked ~ form header:before{
  content: "I just like it ";
}
#rate-5:checked ~ form header:before{
  content: "I just love it ";
}
.rcontainer form{
  display: none;
}
input:checked ~ form{
  display: block;
}
form header{
  width: 100%;
  font-size: 25px;
  color: #fe7;
  font-weight: 500;
  margin: 5px 0 20px 0;
  text-align: center;
  transition: all 0.2s ease;
}
form .textarea{
  height: 100px;
  width: 100%;
  overflow: hidden;
}
form .textarea textarea{
  height: 100%;
  width: 100%;
  outline: none;
  color: #eee;
  border: 1px solid #333;
  background: #222;
  padding: 10px;
  font-size: 17px;
  resize: none;
}
.textarea textarea:focus{
  border-color: #444;
}
form .sbtn{
  display:flex;
  height: 45px;
  width: 100%;
  margin: 15px 0;
  justify-content: center;
  align-items: center;
}
form .sbtn button{
  height: 100%;
  width: 50%;
  border: 1px solid #444;
  outline: none;
  background: yellow;
  color: black;
  font-size: 17px;
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 20px;
  align-self: center;
}
form .sbtn button:hover{
  background: #fcf4a3;
}

.thanks {
  justify-content: center;
  display: none;
  padding: 40px 0
  font-size: 14px;
  color: yellow;
  font-weight: 600;
}
</style>
<div class="container">
      <div class="post">
      </div>
      <div class="star-widget">
        <input type="radio" name="rate" id="rate-5">
        <label onclick="ratePoint(5)" for="rate-5" class="fas fa-star"></label>
        <input type="radio" name="rate" id="rate-4">
        <label onclick="ratePoint(4)" for="rate-4" class="fas fa-star"></label>
        <input type="radio" name="rate" id="rate-3">
        <label onclick="ratePoint(3)" for="rate-3" class="fas fa-star"></label>
        <input type="radio" name="rate" id="rate-2">
        <label onclick="ratePoint(2)" for="rate-2" class="fas fa-star"></label>
        <input type="radio" name="rate" id="rate-1">
        <label onclick="ratePoint(1)" for="rate-1" class="fas fa-star"></label>
      </div>
      <div id="ttext" class="thanks">Thanks For Your Review!</div>
      <form action="#">
          <div id="fpost" onclick="postReview('${movie}','close-modal${ind}')" class="sbtn">
            <button type="submit">Post</button>
          </div>
        </form>
    </div>
    <script>

    </script>
    </div>`

    document.getElementById('modalSheet').innerHTML=mData;
}

function postReview(mName,idm) {
    console.log(rr);
    if(rr!=0){
      document.getElementById("fpost").style.display="none";
      document.getElementById("ttext").style.display="flex";
        rateMovie(mName,rr);
          }
}

function ratePoint(rNew){
    console.log(rNew);
    rr=rNew;
}

// BOT Functionality

function showBot() {
  document.getElementById("bot-modal").style.display="flex";
  document.getElementById("bot-open").style.display="none";

}

function hideBot() {
  document.getElementById("bot-modal").style.display="none";
  document.getElementById("bot-open").style.display="flex";
}

// 'use strict';
//
// /**
//  * navbar variables
//  */
//
// const navOpenBtn = document.querySelector("[data-menu-open-btn]");
// const navCloseBtn = document.querySelector("[data-menu-close-btn]");
// const navbar = document.querySelector("[data-navbar]");
// const overlay = document.querySelector("[data-overlay]");
//
// const navElemArr = [navOpenBtn, navCloseBtn, overlay];
//
// for (let i = 0; i < navElemArr.length; i++) {
//
//   navElemArr[i].addEventListener("click", function () {
//
//     navbar.classList.toggle("active");
//     overlay.classList.toggle("active");
//     document.body.classList.toggle("active");
//
//   });
//
// }
//
//
//
// /**
//  * header sticky
//  */
//
// const header = document.querySelector("[data-header]");
//
// window.addEventListener("scroll", function () {
//
//   window.scrollY >= 10 ? header.classList.add("active") : header.classList.remove("active");
//
// });
//
//
//
// /**
//  * go top
//  */
//
// const goTopBtn = document.querySelector("[data-go-top]");
//
// window.addEventListener("scroll", function () {
//
//   window.scrollY >= 500 ? goTopBtn.classList.add("active") : goTopBtn.classList.remove("active");
//
// });
