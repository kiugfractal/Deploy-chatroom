$(document).ready(function(){
	var socket = io.connect('http://localhost:3000');

	//get date 
	function getDates(){
		var date = new Date(),
			hours = date.getHours(),
			minutes = date.getMinutes(),
			seconds = date.getSeconds();

		return (hours+':'+minutes+':'+seconds);
	};


	//get message 
	function getMessage(){
		var username = $('#usernameText').val(),
			message = $('#messageText').val();
		return ('<em>'+username+'('+getDates()+'): </em>'+message);
	}


	//fetch the message to server and append message to view 
	function fetchMessage(){
		//send the message to server 
		socket.send(getMessage());
		//append the message to the user itself 
		$('#message').append('<li class="yourself">'+getMessage()+'</li>');
		$('#messageText').val('');
		$('#message').listview('refresh');
	}

	//listen when server broadcast
	socket.on('message',function(message){
		$('#message').append('<li>'+message+'</li>');
		$('#message').listview('refresh');

		//adding sound to the application when receive message from another user
		$('#audioNoti').get(0).play();
	}); 


	//send message to server 
	$('#sendButton').on('click',function(){
		fetchMessage();
	});

	//for keyboard 
	//function: press enter for clicking button, input: id of input and button 
	function enterForm(idInput,idButton){
		$(idInput).on('keypress',function(e){
			if (e.keyCode == 13){
				$(idButton).click();
			}
		});
	}

	//submit page
	enterForm('#usernameText','#submitButton');
	

	//chat page when user enter message 
	enterForm('#messageText','#sendButton');

});