const words = function () {
    let temp;

    $.ajax({
        'async': false,
        'type': "GET",
        'global': false,
        'url': "https://random-word-api.herokuapp.com/word?number=50",
        'success': function (data) {
            temp = data;
        }
    });

    return temp;
}();


function HangmanViewModel() {
    var self = this;

    self.letter = ko.observable("");
    self.end = ko.observable(false);

    self.setAttributes = function(){
        self.word = words[Math.floor(Math.random() * words.length)].toUpperCase();
        self.guessedLetters = Array(self.word.length).fill('_');
        self.guessedLettersCounter = 0;
        self.mistakesLeft = 6;
        self.usedLetters = "";
        self.money = 0;
    }

    self.setAttributes();

    self.init = function () {
        const buttons = document.getElementsByClassName("btn btn-secondary");
        for(let i = 0 ; i < buttons.length; ++i)
        {
            buttons[i].addEventListener("click", function()
            {
                if(!self.usedLetters.includes(buttons[i].value)) {
                    self.usedLetters += buttons[i].value + ', ';
                }
                self.letter(buttons[i].value);
            });
        }

        self.playAgain = function(){
            self.end(false);
            self.letter("");
        }

        self.getData = function(message){
            return {
                "message": message,
                "guessedWord": self.guessedLetters.reduce((a, b) => a + b + ' ', ''),
                "mistakesLeft": self.mistakesLeft,
                "money": self.money,
                "usedLetters": self.usedLetters,
                "end": self.end()
                };
        }

        self.guessLetter = function (guessedLetter) {
            if (self.guessedLetters.includes(guessedLetter)){
                return self.getData("You have already find these letter.");
            }
            else if (String(self.word).includes(guessedLetter)) {
                for (let i = 0; i < self.word.length; ++i) {
                    if (self.word[i] === guessedLetter) {
                        self.guessedLetters[i] = guessedLetter;
                        self.money += Math.floor(Math.random() * 20 + 1);
                        ++self.guessedLettersCounter;
                    }
                }

                if (self.guessedLettersCounter === self.word.length) {
                    self.end(true);

                    return self.getData("You win!");
                }

                return self.getData("You find new letter!");
            }
            else {
                if (--self.mistakesLeft === 0) {
                    self.money = 0;
                    self.end(true);

                    return self.getData("You lose!");
                }

                self.money -= Math.floor(Math.random() * (self.money - 1) + 1);

                return self.getData("Try again!");
            }
        }

        self.data = ko.computed(function () {
            if(self.letter() === ""){
                self.setAttributes();
                console.log(self.word);

                return {
                    "message": "",
                    "guessedWord": self.guessedLetters.reduce((a, b) => a + b + ' ', ''),
                    "mistakesLeft": self.mistakesLeft,
                    "money": self.money,
                    "usedLetters": self.usedLetters,
                    "end": self.end()
                }
            }

            return self.guessLetter(self.letter());
        }, self);
    }

    self.init();
}

ko.applyBindings(new HangmanViewModel());
