function AdminController(mainCallback){
	var _this = this;
	var socket;
	
	var reconnect = false;
	
		//connect the Socket
	this.connectSocket=function(callback){
		//console.log("connect socket");
		var session = getCookie('sessionID');
		//console.log(document.cookie);
		if(reconnect){
			socket.socket.reconnect();
			callback(socket);
		}else{
			socket = io.connect('/?session='+encodeURIComponent(session));
			callback(socket);
		}
	}
	
	this.connectSocket(function(socket){
		socket.on('connect',function(){
			//connection update
			//console.log('Connection');
			socket.join('_aa');
		
		})
		
		socket.on('disconnect',function(){
			//open.disabled = false;
			//close.disabled = true;
			reconnect = true;
		});				
	});
	
	this.getBulbs = function(callback)
	{

		$.ajax({
			url: '/get-bulbs/52a0c6a2182adc5c1b000001',
			type: 'get',
			success: function(data){
				addBulbsToPage(data,callback);
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);

			}
		});
	}
	
	this.requestUsers=function(socket,callback)
	{
		socket.broadcast.to('_aa').emit('new_aa', '') //emit to 'room' except this socket
	}
	function addUsersToPage(users,callback){
		$('section#bulbstatus')
		
	}
	
	function addBulbsToPage(bulbs,callback){
	
		$('section#bulbstatus').html('');
		var html ='<ul>';
		for(var i=0; i<bulbs.length; i++){
			html += '<li';
			if(bulbs[i].status === 0) html += ' class="disabled" ';
		    html += '><a data-status="'+bulbData[i].status+'" data-name="'+bulbData[i].name+'" data-id="'+bulbData[i]._id+'"';
		    if(bulbData[i].color){ html += ' data-color="'+bulbData[i].color.r+','+bulbData[i].color.g+','+bulbData[i].color.b+','+bulbData[i].color.w+'"'}
			html += '</li>';
		}
		html+='</ul>';

		
	}
	
	mainCallback();

}