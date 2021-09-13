var qb = [
	{
		q: "What are different data types in JS ?",
		a: [
			"string,number,boolean",
			"string,number,boolean,undefined",
			"string,number,boolean,undefined,null",
			"string,Number",
		],
	},

	{
		q: "What is the type of JavaScript language ?",
		a: ["Object oriented", "Object based", "Assembly language", "High level"],
	},
	{
		q: "When interpreter encounters an empty statements, what it will do:",
		a: [
			"Shows a warning",
			"Prompts to complete the statement",
			"Throws an error",
			"Ignores the statements",
		],
	},
	{
		q: "The 'function' and 'var' are known as:",
		a: ["Keywords", "Data types", "Declaration statements", "Prototypes"],
	},
];

console.log(qb);
var ab = [2, 1, 3, 0];
var timeLeft = 120;
var qTimer;
var qindex = -1;
function initialize() {
	var qindex = -1;
}

function startTimer() {
	qTimer = setInterval(function () {
		if (timeLeft > 0) timeLeft--;
		else timeLeft = 0;
		document.getElementById("tleft").innerHTML = timeLeft + "s";
	}, 1000);
}

function generateRandomQuestion() {
	qindex = Math.floor(Math.random() * qb.length);
}

function createElemAndDisplayQuestion() {
	var qString = qb[qindex].q;
	var pelem = document.createElement("p");
	pelem.classList.add("question");
	pelem.innerHTML = "Question: " + qString;
	var qform = document.querySelector("form");
	qform.appendChild(pelem);
	console.log(parent);
}

function buildAQuestion() {
	clearContents();
	generateRandomQuestion();
	createElemAndDisplayQuestion();
	startTimer();
}

function clearContents() {
	var qaholder = document.querySelector(".qaholder");
	while (qaholder.firstChild) {
		qaholder.removeChild(qaholder.lastChild);
	}
	document.querySelector(".topper").style.display = "none";
}
var startTheQuiz = function () {
	initialize();
	createAQuestion();
	// TurnOnTimer();
	// CheckTheAnswers();
	// displayScore();
	// storeScore();
	// displayTimer();
};

window.onload = function () {
	var start_btn = document.getElementById("start");
	start_btn.addEventListener("click", buildAQuestion);
};
