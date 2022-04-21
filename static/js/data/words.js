function Words() {
    var self = this;

    self.init = function () {
        self.allWords = self.loadWords();

        return self.getRandomWord();
    };

    self.loadWords = function () {
        return function () {
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
    };

    self.getRandomWord = function () {
        return self.allWords[Math.floor(Math.random() * self.allWords.length)]
    };

    self.init();
}


ko.applyBindings(new Words());
