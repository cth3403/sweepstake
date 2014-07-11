var drawn = [], result, jsonData = ['teams','players'], json, xval, xitem, xhtml;
var types = [];
types['teams'] = [];
types['players'] = [];
types['drawn'] = [];

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
}

// Replace the random button with stop and start
function autoDraw(){

  $.each(jsonData, function(key, value){
    if(drawn[i] === undefined ){
      randomArray(types[value], value);
      i = i++;
      setTimeout(function(){autoDraw(i);}, 3000);
    }
  });

}

function randomArray(r_array, htmlApp){

  // randomize array
  var item = r_array[Math.floor(Math.random()*r_array.length)];

  // check to see if the array is empty
  if(r_array.length < 1){
    $('#result').shuffleLetters({"text":"The draw has finished"});
  }
  else{

  // shuffle the letters of the team and player players to add to the suspense and
  $('#'+htmlApp).shuffleLetters({"text": item.name});

  // add the team info to the Drawn object
  if(htmlApp === 'teams'){
    result = new Drawn(item.name,item.team_id) ;
    types['drawn'].push(result);
  }

  // add the player info to the Drawn object
  if(htmlApp === 'players'){
    result.name = item.name;
    result.email = item.email;
  }

  // put them into the result box
  if(result.team && result.name !== undefined){
    $('#drawn').prepend('<p>'+ result.team+'  '+result.name+'</p>');
  }
  // remove the item from the array so it won't be picked up again in the draw
  types[htmlApp] = jQuery.grep(types[htmlApp], function(value) {
    return value !== item;
  });

 }
 }

// get the player and team JSON file and create separate objects
 $.getJSON('data/data.json', function(data) {
  json = data;

  $.each(jsonData, function(key, value){
    var array = types[value];
    var obj;

    if(value === 'teams'){
      $.each(json[0][jsonData[key]], function(key, value) {
        obj = new Team(value.team_id, value.name);
        array.push(obj);
      });
    }
    if(value === 'players'){
      $.each(json[0][jsonData[key]], function(key, value) {
        obj = new Player(value.name, value.email);
        array.push(obj);
      });
    }
  });
});


$('#random').click(function(){
  if($('#drawn_box').hasClass('hidden')){
    $('#drawn_box').removeClass('hidden');
  }
  // un-hide the results box
  $.each(jsonData, function(key, value){
    randomArray(types[value], value);
  });

  // do an auto draw by simulating a click event. Since the players is the last to be drawmn, the length of this array is used to determine whether the click event is triggered.
  if ($('#autoDraw').is(':checked') && types['players'].length >= 0){
    setTimeout(function(){
      $('#random').trigger('click');
    },2000);

  }

});