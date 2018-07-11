$(document).ready(function() {

     $('.btn').click(function(){

        /*get the data from the api*/
        $.getJSON('https://talaikis.com/api/quotes/random/', function(data) {

          /*handle empty author fields*/
          var author = '';
		        if (data.author === '') {author = 'Unknown';}
		        else {author = data.author;}

          /*update site*/

          //var textToShow = data.quote+'<footer>'+author+'</footer>';

          $('#quoteWell').hide().fadeIn(1000);

          $('#quote').html(data.quote+'<footer>'+author+'</footer>').hide().fadeIn(1000);

          //$('#quote').html(data.quote+'<footer>'+author+'</footer>');


          /*update url for the twitter share*/
          $('#twitterShare').attr('href', 'https://twitter.com/intent/tweet?text=' + data.quote + ' (' + author +')');


        });

     });

     /*get back to initial quote*/
     $('#quote2').click(function(){
     	  var quote2 = 'A wise man once said...';
	      var author2 = 'Nothing';

	      $('#quote').html(quote2+'<footer>'+author2+'</footer>');
	      $('#twitterShare').attr('href', 'https://twitter.com/intent/tweet?text=' + quote2 + ' (' + author2 +')');
    });
}); // end document ready

