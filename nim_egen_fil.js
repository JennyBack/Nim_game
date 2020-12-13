//SPELSTRUKTUR

class Player {
    constructor(name){
        this.name=name;
        this.score=0;
    }
}

class Game {
    constructor(){
        this.players=[];
        this.stars_in_the_sky=21;
        this.current_player= null;
    }


    //Metoden ber spelarna skriva sina namn i prompten efter att de klickat på starta spel knappen. Namnen skrivs in istället för player1/player2 i browsern
    start_game(){

        let player_one = window.prompt("Hello star gazer, please fill in your name before playing:");
        let player_two = window.prompt("Hello star gazer, please fill in your name before playing:");
        this.addPlayer(player_one);
        this.addPlayer(player_two);

        let first_name = document.getElementById("name_one");
        first_name.innerHTML = player_one;

        let second_name = document.getElementById("name_two");
        second_name.innerHTML = player_two;

        this.current_player=this.pick_start_player();
        this.show_current_player();
        this.create_sky();
    }

    //Metoden lägger till en ny Player (klassen Player) och lägger den i players array i klassen Game.
    addPlayer(playername) {
        let newPlayer = new Player(playername);
        this.players.push(newPlayer);
        
    }

    pick_start_player (){
        return (Math.random() < 0.5) ? this.players[0] : this.players[1];

    }

    show_current_player(){
        //visar grafiskt vem som är aktiv spelare
        if (this.current_player === this.players[0]){
            document.getElementById("name_one").style.color = "white";
            document.getElementById("name_two").style.color = " rgb(13, 13, 34)";
        }
        else {
            document.getElementById("name_two").style.color = "white";
            document.getElementById("name_one").style.color = " rgb(13, 13, 34)";
        }
        
    }

    switch_current_player(){
        this.current_player = (this.current_player === this.players[0]) ? this.players[1] : this.players[0];
    }

    match(event){
        let choice = Number(event.target.value);

        this.stars_in_the_sky = this.stars_in_the_sky - choice;
        this.remove_star(choice);

       console.log(this.current_player.name);
        if (this.stars_in_the_sky === 0){
            this.switch_current_player();
            this.show_current_player();
            this.winner_alert();
            this.current_player.score = this.current_player.score + 2;
            console.log(this.current_player.score);
            this.continue_game();
            alert("The game will now set for next round");
        }
 
        if (this.stars_in_the_sky === 1 || this.stars_in_the_sky === 2){
            this.disable_buttons();
        }
        
            this.switch_current_player();
            this.show_current_player();
        
           
    }
   
    disable_buttons(){
        let btn_one = document.getElementById("btn_choice1");
        let btn_two = document.getElementById("btn_choice2");
        let btn_three = document.getElementById("btn_choice3");

        if (this.stars_in_the_sky === 1){
            btn_two.disabled = true;
            btn_three.disabled = true;
        }
        if (this.stars_in_the_sky === 2){
            btn_three.disabled = true;
        }
    
    }



    winner_alert(){
        alert ("You are the winner " + this.current_player.name + " Starshine, your will recieve 2 points!");
        let winner_player_one = document.getElementById("points_player_one");
        let winner_player_two = document.getElementById("points_player_two");
        if (this.current_player === this.players[0]){
            winner_player_one.innerHTML = this.current_player.score + 2;
        }
        if (this.current_player === this.players[1]){
            winner_player_two.innerHTML = this.current_player.score + 2;
        }
        
        //shooting star animation display:none; css
    }



    continue_game(){
        let btn_two = document.getElementById("btn_choice2");
        let btn_three = document.getElementById("btn_choice3");

        btn_two.disabled = false;
        btn_three.disabled = false;
        
        this.stars_in_the_sky = 21;
        this.create_sky();
        this.pick_start_player();
       
    }

    stop_game(){
        //save points to player history?
    }

    create_sky(){
     for  (let i=0;i<21;i++){
        let img = document.createElement("img");
 
        img.src = "resources/star.png";
        let parent = document.getElementById("star_img");
 
        parent.appendChild(img);
      }
    }

    remove_star(choice){
        let parent = document.getElementById("star_img");
        //parent.removeChild(parent.lastChild); 
        for (let i = 1; i <= choice; i++) {
            parent.removeChild(parent.lastChild);
          }
        /*while (choice <= choice) {  
            parent.removeChild(parent.lastChild);
          }*/
    }
}
document.addEventListener("DOMContentLoaded", function(e){
document.getElementById("startGame").addEventListener("click", function (){
    let game1 = new Game();
    game1.start_game();
    let myFunction = game1.match;
    myFunction = myFunction.bind(game1);
    //

    document
    .getElementById("btn_choice1")
    .addEventListener("click", myFunction);  
    
    document
    .getElementById("btn_choice2")
    .addEventListener("click", myFunction); 

    document
    .getElementById("btn_choice3")
    .addEventListener("click", myFunction); 
    

});

});
