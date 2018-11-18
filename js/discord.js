var serverID = getParameterByName('serverID');
var title = getParameterByName('title') ? getParameterByName('title') : false;
var invite = getParameterByName('invite') ? getParameterByName('invite') : false;
var theme = getParameterByName('theme') ? getParameterByName('theme') : 'dark';

$.getJSON('https://discordapp.com/api/servers/' + serverID + '/widget.json', function(data) {
	$("head").append('<link rel="stylesheet" href="css/' + theme + '.css" />');

	var titlebar = ``;
	if(title) {
		titlebar += `<h3 class='title-text'>` + title + `</h3>`;
	} else {
		titlebar += `<h3 class='title-text'>` + data.name + `</h3>`;
	}
	if (invite) {
		titlebar += `<span class='invite-text'><a target="_parent" class='invite-button' href='` + data.instant_invite + `'>JOIN</a></span>`;
	}

	$('.discord-title').html(titlebar);

	$('.discord-channel').html('There are ' + data.members.length + ' users online in this discord server. They are:');
	for (i = 0; i < data.members.length; i++) {
		var item = document.createElement('li');
		item.setAttribute('class', 'discord-user');
		var img = document.createElement('img');
		img.setAttribute('src', data.members[i].avatar_url);
		img.setAttribute('class', 'discord-avatar');
		var div = document.createElement('div');
		if(data.members[i].status == 'online') {
			div.setAttribute('class', 'discord-user-status discord-online');
		} else {
			div.setAttribute('class', 'discord-user-status discord-do-not-disturb');
		}
		var text = document.createTextNode(data.members[i].username);
		item.appendChild(img);
		item.appendChild(div);
		item.appendChild(text);

		$('.discord-userlist').append(item);
	}
		
		$('.discord-channel2').html('Offline (' + data.members.length + ')');
	for (i = 0; i < data.members.length; i++) {
		var item = document.createElement('li');
		item.setAttribute('class', 'discord-user');
		var img = document.createElement('img');
		img.setAttribute('src', data.members[i].avatar_url);
		img.setAttribute('class', 'discord-avatar');
		var div = document.createElement('div');
		if(data.members[i].status == 'offline') {
			div.setAttribute('class', 'discord-user-status discord-offline');
		} else {
			div.setAttribute('class', 'discord-user-status discord-offline');
		}
		var text = document.createTextNode(data.members[i].username);
		item.appendChild(img);
		item.appendChild(div);
		item.appendChild(text);

		$('.discord-userlist2').append(item);
	}
});



function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
