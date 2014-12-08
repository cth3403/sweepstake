Sweep-A-Tron
============
*Create a random draw for a sweepstake without being accused of cheating.*

### Requirements:
PHP Server

### Quick guide:

Add some teams. Add an equal number of players. Click 'Random' to draw a team and a name.


### Longer guide:  
**Register:**  
<u>Auth code box</u>  
Players wishing to register will need to enter the Invite Code this should match that in json[0].signup[0].auth_key.  
  
They can then enter their name and email, on saving this is added to the players array of the json data object.   

**Draw:**  
  
<u>Randomize</u>  
Click button to randomly draw teams and players.  


**Admin:**  
  
<u>Generate Invite Code</u>  
This function is used to generate a random code that you can send to people who wish to sign up to play.  
  
<u>Add/Edit Teams</u>  
Add/Edit/Delete teams from the 'teams' array in the json object. If there aren't any pre-existing teams an empty line will be present for data to be added.  

Save per change as the save function can't yet handle multiple add/edit/deletes.

<u>Add/Edit Players</u>  
Add/Edit/Delete players from the 'players' array in the json object. If there aren't any pre-existing players an empty line will be present for data to be added.

Save per change as the save function can't yet handle multiple add/edit/deletes.

### Assets:
Background image url: <a href="https://openclipart.org/detail/194133/flag-of-football-by-j4p4n-194133">https://openclipart.org/detail/194133/flag-of-football-by-j4p4n-194133</a>

The ShuffleLetters effect of the radomizer is taken from: <a href="http://tutorialzine.com/2011/09/shuffle-letters-effect-jquery/">http://tutorialzine.com/2011/09/shuffle-letters-effect-jquery/</a>



