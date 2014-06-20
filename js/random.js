var teams = [], names = [], drawn = [], result; 

function Team(team_id, name){
  this.team_id = team_id;
  this.name = name;
}

function Player(name,email){
  this.name = name;
  this.email = email;
}

function Drawn(team, team_id){
  this.team = team;
  this.team_id = team_id;
  this.name;
  this.email;
}

function randomArray(r_array, htmlApp){
  
  // randomize array
  var item = r_array[Math.floor(Math.random()*r_array.length)];

  // check to see if the array is empty
  if(r_array.length < 1){
    $('#result').shuffleLetters({"text":"The draw has finished"});
  } 
  else{

  // shuffle the letters of the team and player names to add to the suspense and 
  // put them into the result box
  $('#'+htmlApp).shuffleLetters({"text": item.name, callback:function(){
    if(htmlApp === 'names'){
      $('#drawn').prepend('<p>'+ result.team+'  '+result.name+'</p>');
    }
  }});
  
  // add the team info to the Drawn object
  if(htmlApp === 'teams'){
    result = new Drawn(item.name,item.team_id) ;
    drawn.push(result);
  }
  
  // add the player info to the Drawn object
  if(htmlApp === 'names'){
    result.name = item.name;
    result.email = item.email; 
  }

  // remove the item from the array so it won't be picked up again in the draw
  this[htmlApp] = jQuery.grep(this[htmlApp], function(value) {
    return value != item;
  });

  
 }
 }

// get the player and team JSON file and create separate objects
 $.getJSON('data/data.json', function(data) {

       // create the team object from the datafile
        $.each(data[0].teams, function(key, value) {
         var team = new Team(value.team_id, value.name);
         teams.push(team);
        });

        // create the player object from the datafile
        $.each(data[0].players, function(key, value) {
          var player = new Player(value.name, value.email);
          names.push(player);
        }); 
 });

$('#random').click(function(){
  // un-hide the results box
  if($('#drawn_box').hasClass('hidden')){
    $('#drawn_box').removeClass('hidden');
  }
  randomArray(teams, 'teams');
  randomArray(names, 'names');
});