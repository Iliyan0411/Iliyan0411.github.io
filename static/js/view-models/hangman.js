function randomMoney(maximum = 20) {
    return Math.floor(Math.random() * maximum + 1);
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
        self.usedLetters = ko.observableArray();
        self.message = ko.observable("");
        self.mistakes = ko.observable(0);
        self.money = ko.observable(0);

        self.end = ko.computed(function () {
            return !self.guessedLetters().map(element => element['letter']).includes('_') || self.mistakes() >= 6;
        }, self);


        self.guessLetter = function (letter) {
            const tempButtons = self.alphabetButtons().map(function (button) {
                if (button['alphabet'] === letter) {
                    return {alphabet: letter, clicked: true};
                }

                return button;
            });
            self.alphabetButtons(tempButtons);

            self.usedLetters.push({letter: letter});

            if (self.word.includes(letter)) {
                for (let i in self.word) {
                    if (self.word[i] === letter) {
                        const tempLetters = self.guessedLetters();
                        tempLetters[i] = {letter: letter};
                        self.guessedLetters(tempLetters);

                        const tempMoney = self.money();
                        self.money(tempMoney + randomMoney());

                        if (self.end()) {
                            self.message("You win");
                            return;
                        }
                    }
                }

                self.message("You find new letter");
            } else {
                self.mistakes(self.mistakes() + 1);

                const tempMoney = self.money();
                self.money(tempMoney - randomMoney(self.money() - 1));

                if (self.mistakes() === 6) {
                    self.message("You lose");
                    return;
                }

                self.message("Try again");
            }
        }

        self.playAgain = function () {
            self.word = new Words().getRandomWord();
            console.log(self.word);

            self.guessedLetters(Array(self.word.length).fill({letter: '_'}));
            self.usedLetters([]);
            self.message("");
            self.mistakes(0);
            self.money(0);
            self.alphabetButtons(wrapAlphabets());
        }
    }

    self.init();
}
