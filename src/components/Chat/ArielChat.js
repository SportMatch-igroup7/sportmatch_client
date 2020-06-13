// <!DOCTYPE html>
// <html>
// <head>
//     <meta charset="utf-8" />
//     <title></title>
//     <meta name="viewport" content="width=device-width, initial-scale=1">
//     <!-- The core Firebase JS SDK is always required and must be listed first -->
//     <script src='//production-assets.codepen.io/assets/editor/live/console_runner-079c09a0e3b9ff743e39ee2d5637b9216b3545af0de366d4b9aad9dc87e26bfd.js'></script>
//     <script src='//production-assets.codepen.io/assets/editor/live/events_runner-73716630c22bbc8cff4bd0f07b135f00a0bdc5d14629260c3ec49e5606f98fdd.js'></script>
//     <script src='//production-assets.codepen.io/assets/editor/live/css_live_reload_init-2c0dc5167d60a5af3ee189d570b1835129687ea2a61bee3513dee3a50c115a77.js'></script>
//     <meta charset='UTF-8'>
//     <meta name="robots" content="noindex">
//     <link rel="shortcut icon" href="img/fav.png" type="image/x-icon">
//     <link rel="mask-icon" type="" href="//production-assets.codepen.io/assets/favicon/logo-pin-f2d2b6d2c61838f7e76325261b7195c27224080bc099486ddd6dccb469b8e8e6.svg" color="#111" />
//     <link rel="canonical" href="https://codepen.io/emilcarlsson/pen/ZOQZaV?limit=all&page=74&q=contact+" />
//     <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700,300' rel='stylesheet' type='text/css'>
//     <script src="https://use.typekit.net/hoy3lrg.js"></script>
//     <script>try { Typekit.load({ async: true }); } catch (e) { }</script>
//     <link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css'>
//     <link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.2/css/font-awesome.min.css'>
//     <link href="css/chatTemplate.css" rel="stylesheet" />
//     <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

//     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
//     <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
//     <script src="https://code.jquery.com/jquery-3.5.0.js"></script>
//     <script src="https://code.jquery.com/jquery-3.4.1.min.js"
//             integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
//             crossorigin="anonymous"></script>


//     <script src="Scripts/ajaxCalls.js"></script>
//     <!-- Initialize Firebase -->

//     <script>
//         function f1() {
//             return false;
//         }
//         $(document).ready(function () {
//             $("#frame").submit(f1);
//             loginUser = JSON.parse(localStorage["Login"]); //user from login page

//             console.log(loginUser);
//             $("#fromNAme").append(loginUser.FirstName + " " + loginUser.LastName);

//             ajaxCall("PUT", "./api/calendar/Group", JSON.stringify(loginUser), successg, errg);


//         });
//         var str = "";
//         var datat = "";
//         function successg(data) {
//             datat = data;

//             var arrNames = "<option value=''>בחר קבוצה</option>";

//             for (i in data) {

//                 arrNames += `<option  value="${data[i].NumGroup},${data[i].NameProject},${i}">${data[i].NameGroup}, ${data[i].NameProject} </option>`;
//             }

//             $('#groupList').append(arrNames);


//         }
//         function errg(err) {
//             console.log(err);
//         }
//         var listTo = "";
//         var befor = "";
        
//         function message() {
//             document.getElementById("to").innerHTML = "";
//             document.getElementById("contacts").innerHTML = "";
     
//             $(".messages ul").html('');
         
//             listTo = [];
//             var temp = $("#groupList").val();
//             var name = temp.split(",")[1];
//             var idG = temp.split(",")[0];
//             var index = temp.split(",")[2];
//             $("#to").append(name);

//             listTo.push(idG);

//             var stringNames = "";

//             for (j in datat[index].ListStudent) {
//                 listTo.push(datat[index].ListStudent[j].Id)
//                 stringNames += datat[index].ListStudent[j].FirstName + ",";
//             }
//             stringNames = stringNames.substring(0, stringNames.length - 1);
//             $("#contacts").append(`${name}-${stringNames}`)
//             var lastDate = new Date(0);
//             var flag = true;
//                 firebase.database().ref(`/${listTo[0]}`).on('child_added', function (snapshot) {
//                     setInterval(function () {
//                             var message = snapshot.child("message").val();
//                             var name = snapshot.child("name").val();
//                             var last = snapshot.child("date").val();

//                         if (last > lastDate) {
                           
//                                 if ((name == loginUser.FirstName)&&(flag)) {
//                                     $('<li class="sent"><img src="img/chatSent.png" alt="" /><p>' + name + ':' + message + '</p></li>').appendTo($('.messages ul'));
//                                     $('.message-input input').val(null);
//                                     $('.contact.active .preview').html('<span>You: </span>' + message);
//                                     $(".messages").animate({ scrollTop: $(document).height() }, "fast");
//                                 }
//                                 else if (name != loginUser.FirstName){
//                                     $('<li class="replies"><img src="img/message.png" alt="" /><p>' + name + ':' + message + '</p></li>').appendTo($('.messages ul'));
//                                     $('.message-input input').val(null);
//                                     $('.contact.active .preview').html('<span>You: </span>' + message);
//                                     $(".messages").animate({ scrollTop: $(document).height() }, "fast");

//                                 }
//                                 lastDate = last;
                                
//                             setTimeout(function () { flag = false; }, 3000);
//                         }
//                     }, 3000);
                  

//                 })
            

//         }
//         function f1() {
//             return false;
//         }
//     </script>
// </head>
// <body style="font-family:FbSpacer;">

   
//     <div id="frame">
//         <div id="sidepanel">
//             <div id="profile">
//                 <div class="wrap">

//                     <img id="profile-img" src="img/chat.png" class="online" alt="" />
//                     <p id="fromNAme"></p>
//                     <i class="fa fa-chevron-down expand-button" aria-hidden="true"></i>

//                 </div>
//             </div>
//             <div id="search">
//                 <select  list="browsers"  typeof="text" style="width:100%" id="groupList" dir="rtl" onchange="message()"></select>
//                 <!--<label for=""><i class="fa fa-search" aria-hidden="true"></i></label>-->
//                 <!--<input type="text" placeholder="Search contacts..." />-->
//             </div>
//             <div id="contacts" dir="rtl" >
//                 <ul style="list-style-type:none">
//                     <!--<li class="contact">
//                         <div class="wrap">

//                             <span class="contact-status online"></span>
//                             <img src="img/talk.png" alt="" />
//                             <div class="meta">
//                                 <p class="name" id=""></p>
//                                 <p class="preview">You just got LITT up, Mike.</p>
//                             </div>
//                         </div>
//                     </li>
//                     <li class="contact active">
//                         <div class="wrap">
//                             <span class="contact-status busy"></span>
//                             <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
//                             <div class="meta">
//                                 <p class="name">Harvey Specter</p>
//                                 <p class="preview">Wrong. You take the gun, or you pull out a bigger one. Or, you call their bluff. Or, you do any one of a hundred and forty six other things.</p>
//                             </div>
//                         </div>
//                     </li>
//                     <li class="contact">
//                         <div class="wrap">
//                             <span class="contact-status away"></span>
//                             <img src="http://emilcarlsson.se/assets/rachelzane.png" alt="" />
//                             <div class="meta">
//                                 <p class="name">Rachel Zane</p>
//                                 <p class="preview">I was thinking that we could have chicken tonight, sounds good?</p>
//                             </div>
//                         </div>
//                     </li>
//                     <li class="contact">
//                         <div class="wrap">
//                             <span class="contact-status online"></span>
//                             <img src="http://emilcarlsson.se/assets/donnapaulsen.png" alt="" />
//                             <div class="meta">
//                                 <p class="name">Donna Paulsen</p>
//                                 <p class="preview">Mike, I know everything! I'm Donna..</p>
//                             </div>
//                         </div>
//                     </li>
//                     <li class="contact">
//                         <div class="wrap">
//                             <span class="contact-status busy"></span>
//                             <img src="http://emilcarlsson.se/assets/jessicapearson.png" alt="" />
//                             <div class="meta">
//                                 <p class="name">Jessica Pearson</p>
//                                 <p class="preview">Have you finished the draft on the Hinsenburg deal?</p>
//                             </div>
//                         </div>
//                     </li>
//                     <li class="contact">
//                         <div class="wrap">
//                             <span class="contact-status"></span>
//                             <img src="http://emilcarlsson.se/assets/haroldgunderson.png" alt="" />
//                             <div class="meta">
//                                 <p class="name">Harold Gunderson</p>
//                                 <p class="preview">Thanks Mike! :)</p>
//                             </div>
//                         </div>
//                     </li>
//                     <li class="contact">
//                         <div class="wrap">
//                             <span class="contact-status"></span>
//                             <img src="http://emilcarlsson.se/assets/danielhardman.png" alt="" />
//                             <div class="meta">
//                                 <p class="name">Daniel Hardman</p>
//                                 <p class="preview">We'll meet again, Mike. Tell Jessica I said 'Hi'.</p>
//                             </div>
//                         </div>
//                     </li>
//                     <li class="contact">
//                         <div class="wrap">
//                             <span class="contact-status busy"></span>
//                             <img src="http://emilcarlsson.se/assets/katrinabennett.png" alt="" />
//                             <div class="meta">
//                                 <p class="name">Katrina Bennett</p>
//                                 <p class="preview">I've sent you the files for the Garrett trial.</p>
//                             </div>
//                         </div>
//                     </li>
//                     <li class="contact">
//                         <div class="wrap">
//                             <span class="contact-status"></span>
//                             <img src="http://emilcarlsson.se/assets/charlesforstman.png" alt="" />
//                             <div class="meta">
//                                 <p class="name">Charles Forstman</p>
//                                 <p class="preview">Mike, this isn't over.</p>
//                             </div>
//                         </div>
//                     </li>
//                     <li class="contact">
//                         <div class="wrap">
//                             <span class="contact-status"></span>
//                             <img src="http://emilcarlsson.se/assets/jonathansidwell.png" alt="" />
//                             <div class="meta">
//                                 <p class="name">Jonathan Sidwell</p>
//                                 <p class="preview"><span>You:</span> That's bullshit. This deal is solid.</p>
//                             </div>
//                         </div>
//                     </li>-->
//                 </ul>
//             </div>

//         </div>
//         <div class="content">
//             <div class="contact-profile">
//                 <img src="img/user.png" alt="" />
//                 <p id="to"></p>
//             </div>
//             <div class="messages">
//                 <ul>
//                     <!--<li class="sent">
//                         <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
//                         <p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!</p>
//                     </li>
//                     <li class="replies">
//                         <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
//                         <p>When you're backed against the wall, break the god damn thing down.</p>
//                     </li>
//                     <li class="replies">
//                         <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
//                         <p>Excuses don't win championships.</p>
//                     </li>
//                     <li class="sent">
//                         <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
//                         <p>Oh yeah, did Michael Jordan tell you that?</p>
//                     </li>
//                     <li class="replies">
//                         <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
//                         <p>No, I told him that.</p>
//                     </li>
//                     <li class="replies">
//                         <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
//                         <p>What are your choices when someone puts a gun to your head?</p>
//                     </li>
//                     <li class="sent">
//                         <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
//                         <p>What are you talking about? You do what they say or they shoot you.</p>
//                     </li>
//                     <li class="replies">
//                         <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
//                         <p>Wrong. You take the gun, or you pull out a bigger one. Or, you call their bluff. Or, you do any one of a hundred and forty six other things.</p>
//                     </li>-->
//                 </ul>
//             </div>
//             <div class="message-input">
//                 <div class="wrap">
//                     <input type="text" placeholder="Write your message..." />
//                     <!--<i class="fa fa-paperclip attachment" aria-hidden="true"></i>-->
//                     <button  class="submit"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
//                 </div>
//             </div>
//         </div>
//     </div>

//     <script src='//production-assets.codepen.io/assets/common/stopExecutionOnTimeout-b2a7b3fe212eaa732349046d8416e00a9dec26eb7fd347590fbced3ab38af52e.js'></script>
//     <script src='https://code.jquery.com/jquery-2.2.4.min.js'></script>
//     <script>
//         $(".messages").animate({ scrollTop: $(document).height() }, "fast");

//         $("#profile-img").click(function () {
//             $("#status-options").toggleClass("active");
//         });

//         $(".expand-button").click(function () {
//             $("#profile").toggleClass("expanded");
//             $("#contacts").toggleClass("expanded");
//         });

        
      
//         function newMessage() {
//             message = $(".message-input input").val();
//             if ($.trim(message) == '') {
//                 return false;
//             }
//             if (listTo == "") {
//                 swal("אנא בחר קבוצה");
            
//             }
//             else {

//                 firebase.database().ref(`/${listTo[0]}`).push().set({
//                     name: loginUser.FirstName,
//                     userId: listTo[0],
//                     message: message,
//                     date: ((new Date()).getTime() / 1000),
//                     id: listTo[0]

//                 })

//                 $('<li class="sent"><img src="img/chatSent.png" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
//                 $('.message-input input').val(null);
//                 $('.contact.active .preview').html('<span>You: </span>' + message);
//                 $(".messages").animate({ scrollTop: $(document).height() }, "fast");
//             }
//         };

//         $('.submit').click(function () {
//             newMessage();
        
//         });

//         $(window).on('keydown', function (e) {
//             if (e.which == 13) {
//                 newMessage();
               
//             }
//         });
//         //# sourceURL=pen.js
//     </script>
//     <!-- The core Firebase JS SDK is always required and must be listed first -->
//     <script src="https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js"></script>

//     <!-- TODO: Add SDKs for Firebase products that you want to use
//          https://firebase.google.com/docs/web/setup#available-libraries -->
//     <script src="https://www.gstatic.com/firebasejs/7.14.6/firebase-analytics.js"></script>
//     <script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-database.js"></script>
//     <script>
//         // Your web app's Firebase configuration
//         var firebaseConfig = {
//             apiKey: "AIzaSyAZqsZzvyY-BSApQcbaZmHc2wvveDQis_s",
//             authDomain: "livechatmashov.firebaseapp.com",
//             databaseURL: "https://livechatmashov.firebaseio.com",
//             projectId: "livechatmashov",
//             storageBucket: "livechatmashov.appspot.com",
//             messagingSenderId: "1009497459501",
//             appId: "1:1009497459501:web:9e0fdd711e532415c321a4",
//             measurementId: "G-DQYKS5RH57"
//         };
//         // Initialize Firebase
//         firebase.initializeApp(firebaseConfig);
//         firebase.analytics();
//     </script>

// </body>
// </html>