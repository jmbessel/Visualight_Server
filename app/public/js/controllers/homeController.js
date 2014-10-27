
function HomeController()
{

// bind event listeners to button clicks //
	var that = this;

// handle user logout //
	$('#btn-logout').click(function(){ that.attemptLogout(); });

// confirm account deletion //
	$('#account-form-btn1').click(function(){$('.modal-confirm .submit').click(function(){ that.deleteAccount(); });$('.modal-confirm').modal('show')});
	
	// confirm API key reset //
	$('#apikey-form-btn1').click(function(){that.apiResetAlert()});

// handle account deletion //
	

	this.deleteAccount = function()
	{	
		console.log("delete account");
		$('.modal-confirm').modal('hide');
		var that = this;
		$.ajax({
			url: '/delete',
			type: 'POST',
			data: { id: $('#userId').val()},
			success: function(data){
	 			that.showLockedAlert('Your account has been deleted.<br>Redirecting you back to the homepage.');
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}

	this.attemptLogout = function()
	{
		
		var that = this;
		$.ajax({
			url: "/home",
			type: "POST",
			data: {logout : true},
			success: function(data){
	 			that.showLockedAlert('You are now logged out.<br>Redirecting you back to the homepage.');
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}
	
this.resetAPIKey = function()
	{
		console.log("reset api key");
		$('.modal-confirm').modal('hide');
		var that = this;
		$.ajax({
			url: "/home",
			type: "POST",
			data: {apireset : true},
			success: function(data){
	 			that.showLockedAlert('Your API key has been reset');
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}
	this.apiResetAlert = function(){
		$('.modal-confirm').modal({ show : false, keyboard : true, backdrop : true });
		$('.modal-confirm .modal-header h3').text('Reset API Key');
		$('.modal-confirm .modal-body p').html('Are you sure you want to reset your API Key? Any apps using this key will be deactivated until you enter your new key');
		$('.modal-confirm .cancel').html('Cancel');
		$('.modal-confirm .submit').html('RESET');
		$('.modal-confirm .submit').addClass('btn-danger');
		$('.modal-confirm').modal('show');
		$('.modal-confirm .submit').click(function(){that.resetModal();that.resetAPIKey();})
	}
this.resetModal = function(){
	$('.modal-confirm').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-confirm .modal-header h3').text('Delete Account');
	$('.modal-confirm .modal-body p').html('Are you sure you want to delete your account?');
	$('.modal-confirm .cancel').html('Cancel');
	$('.modal-confirm .submit').html('Delete');
	$('.modal-confirm .submit').addClass('btn-danger');
	$('.modal-confirm .submit').click(function(){ that.deleteAccount(); });
}
	this.showLockedAlert = function(msg){
		$('.modal-alert').modal({ show : false, keyboard : false, backdrop : 'static' });
		$('.modal-alert .modal-header h3').text('Success!');
		$('.modal-alert .modal-body p').html(msg);
		$('.modal-alert').modal('show');
		$('.modal-alert button').click(function(){window.location.href = '/home';})
		setTimeout(function(){window.location.href = '/home';}, 3000);
	}
}

HomeController.prototype.onUpdateSuccess = function()
{
	$('.modal-alert').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-alert .modal-header h3').text('Success!');
	$('.modal-alert .modal-body p').html('Your account has been updated.');
	$('.modal-alert').modal('show');
	$('.modal-alert button').off('click');
}
