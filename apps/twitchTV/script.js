$(document).ready(function() {

  var arrChannels = [{id:'freecodecamp',cat:'fcc'},
				     {id:'relaxaudio',cat:'sound'}, // videos array empty
				     {id:'relaxbeats',cat:'sound'}, // videos array empty
				     {id:'dream_boss',cat:'art'},   // videos array empty
			   	     {id:'88bitmusic',cat:'sound'},
				     {id:'glassmancometh',cat:'art'},
				     {id:'pwrblnd',cat:'sound'},    // videos array empty
				     {id:'albertfisk',cat:'art'},   //https://www.twitch.tv/videos/131561009
				     {id:'omatum_greg',cat:'code'},
				     {id:'turtlewolfe',cat:'code'},
				     //{id:'afallenhope',cat:'code'}, // no videos available yet
				     {id:'oabnormal',cat:'art'},
				     {id:'NinesOnFours',cat:'sound'}];


  /* load logos&streams per channel with pageload */
  for (var i = 0; i < arrChannels.length; i++) {
	   getLogo(arrChannels[i].id);
  	   getStreams(arrChannels[i].id);
  };


  /* get current streams per channel and update page respectively */
  function getStreams(channelId) {

	$.ajax({
		type: 'GET',
		url: 'https://wind-bow.glitch.me/twitch-api/streams/'+channelId,
		dataType: 'jsonp',
		success: function (data, textStatus, jqXHR) {

			if (data.stream === null) {
				$('#'+channelId).find('.currentStream').html('<strong>currently offline</strong> <small>..but don\'t worry, you can watch some <strong>VOD </strong>instead. </small> <button type=\"button\" class=\"btn btn-default btn-xs\" id=\"btnVOD\"><span class=\"glyphicon glyphicon-menu-down\"></span></button>'); // text offline in case no stream is available
				$('#'+channelId).css('background-color','#fff3e0'); //update the media background color to 'orange lighten-5'
			}

			else {
				var viewer = '';
				if (data.stream.viewers === 1) {
					 viewer = ' viewer';
			    }
				else {
					 viewer = ' viewers';
				}
				$('#'+channelId).find('.currentStream').html('<a href=\"'+data.stream.channel.url+'\" target=\"_blank\">'+data.stream.channel.status+'</a>'+' ('+data.stream.viewers+viewer+') ');
				$('#'+channelId).css('background-color','#e8f5e9'); //green lighten-5:
			}
		},
		error: function (errorMessage) {
			console.log(errorMessage);
		}
	}); // end Ajax GET

  } // end function getStreams(channelId)


  /* get the current logo per channel */
  function getLogo(channelId) {

    $.ajax({
  		type: 'GET',
  		url: 'https://wind-bow.glitch.me/twitch-api/channels/'+channelId,
  		dataType: 'jsonp',
        success: function (data, textStatus, jqXHR) {

		    $('#'+channelId).find('.channelLogo').attr('src',data.logo);

  		},
  		error: function (errorMessage) {
  			console.log(errorMessage);
  		}
    }); // end Ajax GET

  } // end function getLogo(channelId)


  /* get the 2 most current VOD per channel */
  function getVideos(channelId) {

    $.ajax({
  		type: 'GET',
  		url: 'https://wind-bow.glitch.me/twitch-api//channels/'+channelId+'/videos',
  		//url: 'https://wind-bow.glitch.me/twitch-api//channels/'+channelId+'/videos?limit=100&sort=views', // query parameter strings seem not to work here..??
  		dataType: 'jsonp',
        success: function (data, textStatus, jqXHR) {

		  if (data._total === 0) {
			  $('#'+channelId).find('.vidUrl1').remove();
			  $('#'+channelId).find('.vidUrl0').attr('href','https://www.twitch.tv/'+channelId+'/videos/all');
			  $('#'+channelId).find('.vidHeading0').html('Ooops, no previews available unfortunately. Click me to see the VOD list of <strong>'+channelId+'</strong>');
		  }
		  else {
			  for ( var i = 0; i < 2; i++ ) {
			    $('#'+channelId).find('.vidUrl'+[i]).attr('href',data.videos[i].url);
			    $('#'+channelId).find('.vidImg'+[i]).attr('src',data.videos[i].preview);
			    $('#'+channelId).find('.vidHeading'+[i]).text(data.videos[i].title);
			    $('#'+channelId).find('.vidVisits'+[i]).text(+Math.floor(data.videos[i].length/60)+'min - '+data.videos[i].views+' visits');
			  }
	      }

  		},
  		error: function (errorMessage) {
  		}
    }); // end Ajax GET

  } // end function getVideos()


  /* showing/hiding the 2 newest VOD  */
  $('.currentStream').on('click', '#btnVOD', function(){

    var mediaId = $(this).parents('.media').attr('id');

	if ($('#'+mediaId).find('#btnVOD').html() === '<span class=\"glyphicon glyphicon-menu-up\"></span>') {
		$('#'+mediaId).find('#btnVOD').html('<span class=\"glyphicon glyphicon-menu-down\"></span>').hide().fadeIn(1000);
		$('#'+mediaId).find('.vidUrl').slideUp(1500);
	}
	else {
        getVideos(mediaId);
        $('#'+mediaId).find('#btnVOD').html('<span class=\"glyphicon glyphicon-menu-up\"></span>').hide().fadeIn(1000);
		$('#'+mediaId).find('.vidUrl').slideDown(1500);
    }

  }); // end click #btnVOD

}); // end document ready




