// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};


function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let word = input.question("Let's play some scrabble! Enter a word: ");
   scorerPrompt(word);
};

let simpleScore = function(word) {
  word = word.toUpperCase();
  let letterPoints = `${word.length}`;
  return letterPoints;
};

let vowelBonusScore = function(word) {
  word = word.toUpperCase();
  let vowels = ["A", "E", "I", "O", "U"]
  let letterPoints = 0;

  for (let i = 0; i < word.length; i++){
    if (vowels.includes(word[i])) {
      letterPoints = letterPoints + 3;
    } else {
      letterPoints ++;
    }
  }
  return letterPoints;
};

let scrabbleScore = function scrabbleScore(word) {
  word = word.toLowerCase();
  let letterPoints = 0;

  for (let i = 0; i <word.length; i++) {
   letterPoints += newPointStructure[word[i]]
  }
  return letterPoints
};


const scoringAlgorithms = {
  name: ["Simple Score", "Bonus Vowels", "Scrabble"],
  description: ["Each letter is worth 1 point.", "Vowels are 3 pts, consonants are 1 pt.", "The traditional scoring algorithm."],
  scorerFunction: [simpleScore, vowelBonusScore, scrabbleScore],
};

function scorerPrompt(word) {
  let scoreMethod = input.question(`Which scoring algorithm would you like to use?
  
  0 - ${scoringAlgorithms.name[0]}: ${scoringAlgorithms.description[0]}
  1 - ${scoringAlgorithms.name[1]}: ${scoringAlgorithms.description[1]}
  2 - ${scoringAlgorithms.name[2]}: ${scoringAlgorithms.description[2]}
  Enter 0, 1, or 2: `);

  scoreMethod = Number(scoreMethod);

  while (scoreMethod > 2 || scoreMethod < 0 || !Number.isInteger(scoreMethod)) {
    scoreMethod = input.question('Invalid number requested. Enter 0, 1, or 2: ');
    scoreMethod = Number(scoreMethod);
  }

  if (scoreMethod === 0) {
    console.log(`Score for '${word}': ${simpleScore(word)}`);
  } else if (scoreMethod === 1) {
    console.log(`Score for '${word}': ${vowelBonusScore(word)}`);
  } else console.log(`Score for '${word}': ${scrabbleScore(word)}`);
}

function transform(pointStructure) {
  let newPointObject = {};
  for (item in pointStructure) {
    let bigLetterArray = pointStructure[item];
    let letterArray = bigLetterArray.map(function(letter) {
      return letter.toLowerCase();
    })
    for (i = 0; i < letterArray.length; i++) {
      newPointObject[letterArray[i]] = Number(item);
    }
    }
    return newPointObject;
}

let newPointStructure = transform(oldPointStructure);
newPointStructure[' '] = 0;

function runProgram() {
   initialPrompt();

}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

