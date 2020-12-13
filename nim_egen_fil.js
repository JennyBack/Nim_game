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
    //Metoden väljer en random player som startar spelet.
    pick_start_player (){
        return (Math.random() < 0.5) ? this.players[0] : this.players[1];

    }
    //Metoden visar grafiskt vilken spelare det är som är aktiv.
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
    //Metoden byter spelare.
    switch_current_player(){
        this.current_player = (this.current_player === this.players[0]) ? this.players[1] : this.players[0];
    }
    //Metod för själva matchen som spelas.
    match(event){
        let choice = Number(event.target.value);

        this.stars_in_the_sky = this.stars_in_the_sky - choice;
        this.remove_star(choice);

        if (this.stars_in_the_sky === 0){
            this.switch_current_player();
            this.show_current_player();
            this.winner_alert();
            this.current_player.score = this.current_player.score + 2;
            this.continue_game();
            alert("The game will now set for next round");
        }
 
        if (this.stars_in_the_sky === 1 || this.stars_in_the_sky === 2){
            this.disable_buttons();
        }
        
        this.switch_current_player();
        this.show_current_player();   
    }
    //Metod för att undvika att en spelare klickar på knappar med värde högre än de som finns kvar på spelplanen.
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
    //Meddelar vinnaren, sätter 2 poäng på vinnaren.
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


    //Metod som återställer antalet stjärnor, grafiska representationer och väljer en ny startspelare.
    continue_game(){
        let btn_two = document.getElementById("btn_choice2");
        let btn_three = document.getElementById("btn_choice3");

        btn_two.disabled = false;
        btn_three.disabled = false;
        
        this.stars_in_the_sky = 21;
        this.create_sky();
        this.pick_start_player();
       
    }

    //Metoden lägger till bilderna på stjärnhimlen
    create_sky(){
     for  (let i=0;i<21;i++){
        let img = document.createElement("img");
 
        img.src = "resources/star.png";
        let parent = document.getElementById("star_img");
 
        parent.appendChild(img);
      }
    }
    //Metoden plockar bort det antal stjärnor som spelaren valt att plocka bort.
    remove_star(choice){
        let parent = document.getElementById("star_img");
        for (let i = 1; i <= choice; i++) {
            parent.removeChild(parent.lastChild);
        }
    }
}

//-----------------------//

document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("startGame").addEventListener("click", function (){
        let game1 = new Game();
        game1.start_game();

        document
        .getElementById("btn_choice1")
        .addEventListener("click", (event) => game1.match(event));  
        
        document
        .getElementById("btn_choice2")
        .addEventListener("click", (event) => game1.match(event)); 

        document
        .getElementById("btn_choice3")
        .addEventListener("click", (event) => game1.match(event)); 

        //Jag har fått lite hjälp att lösa att jag tappade "this". Jag har försökt sätta mig in
        //i problemet men inte helt förstått det. Binding function.https://javascript.info/bind
    });

});
