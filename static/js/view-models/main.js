function MainViewModel() {
    var self = this;

    self.init = function () {
        self.selectedSection = ko.observable('user');
        self.user = new UserViewModel();
        self.game = new HangmanViewModel();

        self.signedIn = function () {
            self.selectedSection('game');
        }
    }

    self.init();
}

ko.applyBindings(new MainViewModel());
