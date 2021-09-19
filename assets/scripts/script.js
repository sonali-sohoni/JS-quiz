var qb = [
	{
		q: "What are different data types in JS ?",
		a: [
			"string,number,boolean",
			"string,number,boolean,undefined",
			"string,number,boolean,undefined,null",
			"string,Number",
		],
	}, //0

	{
		q: "What is the type of JavaScript language ?",
		a: ["Object oriented", "Object based", "Assembly language", "High level"],
	}, //1
	{
		q: "When interpreter encounters an empty statements, what it will do:",
		a: [
			"Shows a warning",
			"Prompts to complete the statement",
			"Throws an error",
			"Ignores the statements",
		],
	}, //2
	{
		q: "The 'function' and 'var' are known as:",
		a: ["Keywords", "Data types", "Declaration statements", "Prototypes"],
	}, //3
	{
		q: "Which company developed JavaScript?",
		a: ["Microsoft", "Google", "Sun Microsystems", "Netscape"],
	}, //4
	{
		q: "What JavaScript Ignores?",
		a: ["spaces", "tabs", "newlines", "All of the above"],
	}, //5
	{
		q: "which one is a ternary operator in JavaScript?",
		a: ["?:", "&", ".", "#"],
	}, //6
	{
		q: "which of the following is not the looping structure?",
		a: ["for", "forwhich", "do while", "while"],
	}, //7
	{
		q: "What do you mean by undefined?",
		a: [
			"Variable is not assigned any value",
			"Property does not exist",
			"Variable used in the code does not exist",
			"All of the above",
		],
	}, //8
	{
		q: "What is the output of 10/0",
		a: ["Nothing is printed", "0", "Infinity", "garbage value"],
	}, //9
];

console.log(qb);
var ab = [2, 1, 3, 0, 3, 3, 0, 1, 3, 2];
var timeLeft = 120;
var qTimer;
var qindex = -1;
var visited = [];
var score = 0;

window.onload = function () {
	var start_btn = document.getElementById("start");
	start_btn.addEventListener("click", startGame);

	function initVars() {
		clearTimer();
		var qindex = -1;
		visited = [];
		score = 0;
		timeLeft = 75;
		document.getElementById("scoreSpan").innerHTML = score;
	}

	function startTimer() {
		qTimer = setInterval(function () {
			if (timeLeft > 0) timeLeft--;
			else {
				timeLeft = 0;
				processResults();
			}
			document.getElementById("tleft").innerHTML = timeLeft + "s";
		}, 1000);
	}

	function clearTimer() {
		clearInterval(qTimer);
		qTimer = null;
	}

	function generateRandomQuestion() {
		qindex = Math.floor(Math.random() * qb.length);
		console.log(qindex);
		while (true) {
			qindex = Math.floor(Math.random() * qb.length);

			if (visited.includes(qindex)) {
				qindex = -1;
				continue;
			} else {
				visited.push(qindex);
				break;
			}
		}
	}

	function processResults() {
		clearTimer();
		getProcessResultsForm();
	}
	function getProcessResultsForm() {
		clearContents(".qaholder");
		//	var html = "	<div class='form-btns toggleDisplay' > ";
		var divElem = document.createElement("div");
		divElem.classList.add("form-btns");
		document.querySelector(".results").classList.add("toggleDisplay");
		document.querySelector(".view-score").classList.add("toggleDisplay");
		var headerHtml = "";
		if (timeLeft == 0) {
			headerHtml += "<h3 style='color:#ff5733;font-weight:bold'> ";
			headerHtml += "Time Over!!!";
			headerHtml += " </h3>";
		}
		var html =
			headerHtml +
			"<label for ='initials'> Please enter initials</label>&nbsp;&nbsp;<input type='text' id='initials' p /> ";

		html +=
			"<input type='submit' id='save' value='Save Score' class='btns' /> ";
		//html +="	<input type='button' id='exit' value='Exit Quiz' class='btns' /> <p id ='message'></p>";
		divElem.innerHTML = html;
		console.log(divElem);

		var holder = document.querySelector(".qaholder");
		holder.appendChild(divElem);
		console.dir(holder);
		var m = "";
		var save_btn = document.getElementById("save");
		save_btn.addEventListener("click", function () {
			var initials = document.getElementById("initials").value;
			var scorelist = JSON.parse(localStorage.getItem("jsscore"));
			if (scorelist == null) scorelist = {};
			console.log(scorelist);
			// var initials = prompt("Please enter the initials to save the score");
			if (scorelist[initials]) {
				var oldScore = scorelist[initials];
				if (oldScore < score) {
					m = "New High Score!!";
					scorelist[initials] = score;
					saveScores(m, scorelist);
				} else {
					var save = confirm(
						"Your score is less than or equal to previously stored score. Do you want to save it?"
					);
					if (save) {
						scorelist[initials] = score;
						saveScores("", scorelist);
					} else displaySummaryPage("");
				}
			} else {
				// var save = confirm(
				// 	"Your score is less than or equal to previously stored score. Do you want to save it?"
				// );
				// if (save) {
				scorelist[initials] = score;
				saveScores("", scorelist);
				//	} else displaySummaryPage("");
			}
		});
	}
	function saveScores(message, scorelist) {
		//	scorelist[initials] = score;
		localStorage.setItem("jsscore", JSON.stringify(scorelist));
		//	document.getElementById("message").innerHTML = "Score saved!";
		//	save_btn.disabled = true;
		displaySummaryPage(message);
	}

	function displaySummaryPage(m) {
		document
			.querySelector(".view-score")
			.classList.remove("toggleDisplay");
		clearContents(".qaholder");
		document.getElementById("tleft").innerHTML = "";
		var scorelist = JSON.parse(localStorage.getItem("jsscore"));
		var ulItem = document.createElement("ul");
		var headerHtml = "<div class=score-header> ";
		if (m !== "") {
			headerHtml += "<h3 style='color:#ff5733;font-weight:bold'> ";
			headerHtml += m;
			headerHtml += " </h3>";
		}
		headerHtml +=
			"<h2 style='color:darkblue;font-weight:bold'> Score Card</h3>";
		var tblhtml =
			headerHtml +
			"<table><tr><th colspan='2'>Initials</th><th colspan='2'>Score</th></tr>";

		for (var key in scorelist) {
			var value = scorelist[key];
			var liItem = document.createElement("li");
			liItem.innerHTML = key + "&nbsp;&nbsp;&nbsp;&nbsp;" + value;
			ulItem.appendChild(liItem);
			var trhtml =
				" <tr><td colspan='2'>" +
				key +
				"</td><td colspan='2'>" +
				value +
				"</td></tr>";
			tblhtml = tblhtml + trhtml;
		}
		tblhtml += "	</table>";
		var holder = document.querySelector(".qaholder");
		//	holder.appendChild(ulItem);
		//holder.innerHTML = tblhtml;

		var divElem = document.createElement("div");
		divElem.classList.add("form-btns");

		var html =
			"<div class ='form-btns'><input type='button' id='go-back' value='Go Back' class='btns' /> ";
		html +=
			"	<input type='button' id='clear-scores' value='Clear Scores' class='btns' /> <p id ='message'></p></div>";
		tblhtml += html;
		holder.innerHTML = tblhtml;
		console.log(document.getElementById("go-back"));
		console.log(document.getElementById("clear-scores"));
		document.getElementById("go-back").addEventListener("click", function () {
			if (qTimer) {
				visited.pop();
				buildNextQuestion();
			} else startGame();
		});
		document
			.getElementById("clear-scores")
			.addEventListener("click", function () {
				localStorage.removeItem("jsscore");
				displaySummaryPage("");
			});
	}

	function createQuestionElement() {
		var qString = qb[qindex].q;
		var pelem = document.createElement("p");
		pelem.classList.add("question");
		pelem.innerHTML = "Question: " + qString;
		var qform = document.querySelector(".qaholder");
		qform.appendChild(pelem);
		console.log(qform);
	}

	function createAnswersRadio() {
		var ansArray = qb[qindex].a;
		console.log(ansArray);
		var div1 = document.createElement("div");
		div1.classList.add("answers");

		var ul1 = document.createElement("ul");
		ul1.id = "ansUL";

		for (var i = 0; i < ansArray.length; i++) {
			var radioId = "ans" + i;
			var radioHtml =
				"<input type='radio' name='ans-radio' id='" +
				radioId +
				"'data-answer-selected='" +
				i +
				"'/>";
			var labelHtml =
				"<label for='" + radioId + "'>" + ansArray[i] + "</label>";
			var liElem = document.createElement("li");
			var aElem = document.createElement("a");
			//	liElem.innerHTML = radioHtml + labelHtml;
			aElem.innerHTML = ansArray[i];
			aElem.href = "#";
			aElem.id = radioId;
			aElem.setAttribute("data-answer-selected", i);
			aElem.classList.add("answerLinks");
			liElem.appendChild(aElem);
			ul1.appendChild(liElem);
		}
		div1.append(ul1);
		var holder = document.querySelector(".qaholder");
		holder.appendChild(div1);
		//	document.querySelector(".form-btns").classList.remove("toggleDisplay");
		document.querySelector(".results").classList.add("toggleDisplay");
		var alist = document.querySelectorAll(".answerLinks");
		for (var j = 0; j < alist.length; j++) {
			alist[j].addEventListener("click", function () {
				console.log(this);
				verifyAnswers2(this);
				setTimeout(buildNextQuestion, 500);
			});
		}
	}

	function startGame() {
		initVars();
		buildNextQuestion();
		startTimer();
	}

	function buildNextQuestion() {
		clearContents(".qaholder");
		if (visited.length == qb.length) {
			processResults();
			return;
		}
		generateRandomQuestion();
		createQuestionElement();
		createAnswersRadio();
	}

	function clearContents(selector) {
		var qaholder = document.querySelector(selector);
		while (qaholder.firstChild) {
			qaholder.removeChild(qaholder.lastChild);
		}
		document.querySelector(".topper").style.display = "none";
	}

	function getRadioValues(arg) {
		var radioList = document.getElementsByName(arg);
		for (var i = 0; i < radioList.length; i++) {
			if (radioList[i].checked) {
				return radioList[i].id;
			}
		}
	}

	function printResult(message) {
		clearContents(".results");
		var horizontalLine = document.createElement("hr");
		var h3Elem = document.createElement("h3");
		h3Elem.innerHTML = "Result: " + message + " score : " + score;
		var divElem = document.getElementById("result-section");
		divElem.appendChild(horizontalLine);
		divElem.appendChild(h3Elem);
		divElem.classList.remove("toggleDisplay");
	}

	function verifyAnswers2(elem) {
		var radioSelected = elem.id;
		if (!radioSelected) {
			alert("Please select the answer.");
			return false;
		}
		var ans_selected = document
			.getElementById(radioSelected)
			.getAttribute("data-answer-selected");
		//	console.log(ans_selected);
		var answer = ab[qindex];
		console.log(answer);
		if (answer != ans_selected) {
			printResult("wrong");
			timeLeft -= 5;
		} else {
			score++;
			document.getElementById("scoreSpan").innerHTML = score;
			printResult("correct");
		}
	}

	var scoreView = document.getElementById("score-view");
	scoreView.addEventListener("click", function () {
		displaySummaryPage("");
	});
};
