function UserViewModel() {
    var self = this;

    self.init = function () {
        self.user = new User();

        self.getFormData = function(){
            self.user.firstName = document.getElementById("first_name").value;
            self.user.lastName = document.getElementById("last_name").value;

            document.getElementById("greeting").innerText =
                `Hi ${self.user.firstName} ${self.user.lastName}. Are you ready to play?`;

            window.location.hash = "game";

            document.getElementById("user_credentials").style.display = "none";
            document.getElementById("greeting").style.display = "inline-block";
            document.getElementById("game").style.display = "block";
        };
    };

    self.init();
}

ko.applyBindings(new UserViewModel(), document.getElementById("user_credentials"));
