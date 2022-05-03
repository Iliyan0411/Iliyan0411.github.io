function randomMoney() {
    return Math.floor(Math.random() * 20 + 1);
}

function wrapAlphabets() {
    return getAlphabet().map(function (alphabet) {
        return {alphabet: alphabet, clicked: false};
    });
}


function HangmanViewModel() {
    var self = this;

    self.init = function () {
        self.alphabetButtons = ko.observableArray(wrapAlphabets());
        self.word = new Words().getRandomWord();
        console.log(self.word);

        self.guessedLetters = ko.observableArray(Array(self.word.length).fill({letter: '_'}));
        self.letter = ko.observable("");

        self.tempMistakes = 0;
        self.mistakes = ko.computed(function () {
            if (self.letter() === "") {
                return 0;
            } else if (!self.word.includes(self.letter())) {
                return ++self.tempMistakes;
            }

            return self.tempMistakes;
        }, self);

        self.tempMoney = 0;
        self.money = ko.computed(function () {
            if (self.letter() === "") {
                return 0;
            } else if (self.word.includes(self.letter())) {
                self.tempMoney += randomMoney();
            } else {
                self.tempMoney -= randomMoney();
                if (self.tempMoney < 0) {
                    self.tempMoney = 0;
                }
            }

            return self.tempMoney;
        }, self);

        self.end = ko.computed(function () {
            return !self.guessedLetters().map(element => element['letter']).includes('_') || self.mistakes() >= 6;
        }, self);

        self.message = ko.computed(function () {
            if (self.letter() === "") {
                return "";
            } else if (!self.word.includes(self.letter())) {
                if (self.mistakes() === 6) {
                    return `You lose, the right word was "${self.word}"`;
                }

                return "Try again";
            }

            return self.end() ? "You win" : "You find new letter";
        }, self);


        self.guessLetter = function (letter) {
            self.letter(letter);

            const tempButtons = self.alphabetButtons().map(function (button) {
                if (button['alphabet'] === letter) {
                    return {alphabet: letter, clicked: true};
                }

                return button;
            });
            self.alphabetButtons(tempButtons);

            if (self.word.includes(letter)) {
                for (let i in self.word) {
                    if (self.word[i] === letter) {
                        const tempLetters = self.guessedLetters();
                        tempLetters[i] = {letter: letter};
                        self.guessedLetters(tempLetters);
                    }
                }
            }
        }

        self.playAgain = function () {
            self.word = new Words().getRandomWord();
            console.log(self.word);

            self.guessedLetters(Array(self.word.length).fill({letter: '_'}));
            self.letter("");
            self.alphabetButtons(wrapAlphabets());

            self.tempMistakes = 0;
            self.tempMoney = 0;
        }
    }

    self.init();
}
