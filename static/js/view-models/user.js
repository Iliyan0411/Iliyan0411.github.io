function UserViewModel() {
    var self = this;

    self.init = function () {
        self.user = new User();
        self.user.firstName = ko.observable();
        self.user.lastName = ko.observable();
    };

    self.init();
}
