function MainViewModel() {
    var self = this;

    self.init = function () {
        self.selectedSection = ko.observable('user');
        self.user = new UserViewModel();
        self.game = new HangmanViewModel();

        self.signedIn = function () {
            self.selectedSection('game');

            document.getElementById('greeting-container').classList.remove('not-visible');
            document.getElementById('game-container').classList.remove('not-visible');
        }
    }

    self.init();
}

ko.applyBindings(new MainViewModel());
