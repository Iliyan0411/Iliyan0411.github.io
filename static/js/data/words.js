function Words() {
    var self = this;

    self.init = function () {
        self.loadWords();
    };

    self.loadWords = function () {
        self.allWords = function () {
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
        return self.allWords[Math.floor(Math.random() * self.allWords.length)].toUpperCase();
    };

    self.init();
}