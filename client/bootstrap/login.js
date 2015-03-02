if(Meteor.isClient){
	Template.login.events({
		'submit form': function(event, template){
		    event.preventDefault();
		    var username = template.find('#login-username').value;
		    var passwordVar = template.find('#login-password').value;
		    if (Meteor.loginWithPassword(username, passwordVar)){
		    	Meteor.loginWithPassword(username, passwordVar);
		    } else {
		    	window.alert("Failed");
			}
		}
	});

	Template.register.events({
		'submit form': function(event, template){
		    event.preventDefault();
		    var username = template.find('#register-username').value;
		    var passwordVar = template.find('#register-password').value;
		    var p1 = passwordVar;
		    var p2 = template.find('#register-password-confirm').value;
		    if (username /*exists already*/){
		    	if ((username.length) > 2) {
			    	if ((p1.length) > 6){
				    	if(p1 === p2){
					    	Accounts.createUser({
					        	username: username,
					        	password: passwordVar
					    	});
				    	} else {
				    		window.alert("Passwords do NOT match. Try again!");
				    	}	
				    } else{
				    	window.alert("Enter a password with more than 6 characters");
				    }	
			    } else {
			    	window.alert("Enter a username with more than 2 characters");
			    }
		    }
		    
		    
		    
		}
	});
}
/*username exists, failed sign in attempt */