//questions being asked with answer choices and answer. 

$(document).ready(function () {
    var options = [
        {
            question: "What is the main characters name?", 
            choice: ["Killerbee", "Sasuke Uchiha ", "Kakashi Hatake", "Uzumaki Naruto"],
            answer: 3,
            photo: "assets/images/Naruto_Uzumaki.png"
         },
         {
             question: "What is Naruto's special jutsu?", 
            choice: ["Chidori", "Rasengan", "Reaper Death Seal", "Amaterasu"],
            answer: 1,
            photo: "assets/images/rasengan.jpg"
         }, 
         {
             question: "Who is the leader of the Akatsuki?", 
            choice: ["Naruto", "Madara Uchiha", "Pein", "Hinata" ],
            answer: 2,
            photo:"assets/images/pein.jpg"
            
        }, 
        {
            question: "Naruto is the host of which tailbeast?", 
            choice: ["Shukaku", "Son Goku", "Saiken", "Kurama" ],
            answer: 3,
            photo:"assets/images/kurama.jpg"
           
        }, 
        {
            question: "How many tails does Kurama have?", 
            choice: ["1", "4", "9", "7" ],
            answer: 2,
            photo:"assets/images/nineTails.jpg"
           
        }, 
        {
            question: "Who is Naurto's rival?", 
            choice: ["Sasuke Uchiha", "Rock Lee", "Sakura Haruno", "Kakashi Htake" ],
            answer: 0,
            photo:"assets/images/sasuke.jpg"
          
        }, 
        {
            question: "Which member of the Akatsuki did Naruto defeat?", 
            choice: ["Itachi Uchiha", "Pein", "Kisame", "Sasori" ],
            answer: 1,
            photo:"assets/images/pein1.png"
        }, 
        {
            question: "Who is Naruto's Father?", 
            choice: ["Jiraya", "Kakashi", "Minato", "Might Guy" ],
            answer: 2,
            photo:"assets/images/minato.jpg"
            
        }];
        var correctAnswer = 0;
        var wrongAnswer = 0;
        var unanswer = 0;
        var timer = 20;
        var intervalId;
        var userGuess ="";
        var running = false;
        var qCount = options.length;
        var pick;
        var index;
        var newArray = [];
        var holder = [];
        
$("#reset").hide();

$("#start").on("click", function () {
		$("#start").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < options.length; i++) {
	holder.push(options[i]);
}

})
function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}
function decrement() {
	$("#countdown").html("<h3>Time remaining: " + timer + "</h3>");
	timer --;

	if (timer === 0) {
		unanswer++;
		stop();
		$("#response").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}	
}

function stop() {
	running = false;
	clearInterval(intervalId);
}

function displayQuestion() {
	index = Math.floor(Math.random()*options.length);
	pick = options[index];

		$("#questions").html("<h2>" + pick.question + "</h2>");
		for(var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("response");
			userChoice.html(pick.choice[i]);
			
			userChoice.attr("data-guessvalue", i);
			$("#response").append(userChoice);

}




$(".response").on("click", function () {

	userGuess = parseInt($(this).attr("data-guessvalue"));


	if (userGuess === pick.answer) {
		stop();
		correctAnswer++;
		userGuess="";
		$("#response").html("<p>Correct!</p>");
		hidepicture();

	} else {
		stop();
		wrongAnswer++;
		userGuess="";
		$("#response").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
})
}


function hidepicture () {
	$("#response").append("<img src=" + pick.photo + ">");
	newArray.push(pick);
	options.splice(index,1);

	var hiddenpicture = setTimeout(function() {
		$("#response").empty();
		timer= 20;

	if ((wrongAnswer + correctAnswer + unanswer) === qCount) {
		$("#questions").empty();
		$("#questions").html("<h3>Game Over!  Reslults: </h3>");
		$("#response").append("<h4> Correct: " + correctAnswer + "</h4>" );
		$("#response").append("<h4> Incorrect: " + wrongAnswer + "</h4>" );
		$("#response").append("<h4> Unanswered: " + unanswer + "</h4>" );
		$("#reset").show();
		correctAnswer = 0;
		wrongAnswer = 0;
		unanswer = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


}

$("#reset").on("click", function() {
	$("#reset").hide();
	$("#response").empty();
	$("#questions").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
	displayQuestion();

})

})
        