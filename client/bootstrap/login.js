if(Meteor.isClient){
	Template.login.events({
		'submit form': function(event, template){
		    event.preventDefault();
		    var username = template.find('#login-username').value;
		    var passwordVar = template.find('#login-password').value;
		    Meteor.loginWithPassword(username, passwordVar);
		}
	});

	Template.register.events({
		'submit form': function(event, template){
		    event.preventDefault();
		    var username = template.find('#register-username').value;
		    var passwordVar = template.find('#register-password').value;
		    if(template.find('#register-password').value === template.find('#register-password-confirm').value){
			    	Accounts.createUser({
			        username: username,
			        password: passwordVar
			    });
		    }
		}
	});
}