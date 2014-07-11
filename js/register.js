// allow players to register their name and email based on signup codes they were sent

var auth_key, auth, set_auth, json, player, value =[];

function Player(name,email){
  this.name = name;
  this.email = email;
}

function mkPlayer(value){
  player = new Player(value.name, value.email);
  //names.push(player);
}
// get the player and team JSON file and create separate objects
 $.getJSON('data/data.json', function(data) {
        json = data;
       // create the team object from the datafile
        $.each(data[0].signup, function(key, value) {
         auth = value.auth_key;
        });

        // create the player object from the datafile
        $.each(data[0].players, function(key, value) {
         // mkPlayer(value);
        });
 });

// send a sonfirmation email to the user that they have registered
function confU(email){
  console.log(email);
 }

function postPHP(data){
  console.log(data);
  $.ajax({
    type: "GET",
    dataType : 'json',
    async: false,
    url: 'js/save_file.php',
    data: { 'json': JSON.stringify(data) },
    success: function () {
      $('#result').text('You are now registered for the World Cup Sweepstake. Good Luck.');
       },
    failure: function() {alert("Error!");}
  });
}

// checks whether the signup code is valid
$('#submit').click(function(){

var cipher = $("#auth_key").val();
var msg = $("#auth_msg").val();
var decrypted = CryptoJS.AES.decrypt(auth, msg);
decrypted = decrypted.toString();

    if (decrypted === cipher) {
      $('#auth_submit').html('<p><label for="signup_name">Name:&nbsp;</label><input id="signup_name" type="text" />&nbsp;&nbsp;<label for="signup_email">Email:&nbsp;</label><input id="signup_email" type="text" /></p>');
      set_auth = $( "input:first" ).val();
      return;
    }

  if(set_auth !== undefined && $( "#signup_name" ).val() !== (undefined || '' || "")  && $( "#signup_email" ).val() !== (undefined || '' || "") )  {
   value.name = $( "#signup_name" ).val();
   value.email = $( "#signup_email" ).val();
   mkPlayer(value);
   json[0].players.push(player);
   postPHP(json);
   confU(value.email);
   }
   else{
    $('#auth_submit').html('<div class="form-group has-error"><p class="help-block">The submitted code is not valid</p></div>');
      console.log( "Not valid!" );
    }
});

// if enter key is pressed after auth_key has been inputted trigger the click function
$('#auth_key').keypress(function(e) {
  if(e.which == 13){
    $('#submit').click();
  }
});
