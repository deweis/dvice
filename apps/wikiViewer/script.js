$(document).ready(function() {


  /* Function to get the data from wikipedia via Ajax GET Call */
  function getData(searchItem) {

	$('#article').text('');

    $.ajax({
     type: "GET",
     url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page="+searchItem+"&callback=?",
	 contentType: 'application/json; charset=utf-8',
	 dataType: 'jsonp',
	 success: function (data, textStatus, jqXHR) {

                var relevantData = data.parse.text["*"];
	            var paragraphs = $('<div></div>').html(relevantData);

	            // remove links
	            paragraphs.find('a').each(function() { $(this).replaceWith($(this).html()); });

	            // remove references
	            paragraphs.find('sup').remove();

	            // remove cite errors
	            paragraphs.find('.mw-ext-cite-error').remove();

	            // show first paragraph of the result on page
	            $('.wellArticle').addClass("well");

	            $('#article').html($(paragraphs).find('p:first')).hide().fadeIn(1500);

				// show the wikipedia url of the result
	            var siteUrl = searchItem.replace(/\s/g,'_');
	            $('#article').append('<br><p><a href=\"https://en.wikipedia.org/wiki/'+siteUrl+'\" target="_blank">Read more on Wikipedia</a></hp>');

     },
        error: function (errorMessage) {
	 }

	});
  } // end function getData


  /* Function to do a full text search via ajax to get related pages */
  function getDataList(searchItem) {

	    $.ajax({
             url: 'https://en.wikipedia.org/w/api.php',
             data: { action: 'query', list: 'search', srsearch: searchItem, srlimit: 8, format: 'json' },
             dataType: 'jsonp',
             success: function (apiResult) {

					$('#display-result').empty();

        			for (var i = 0; i < apiResult.query.search.length; i++){
   		  			    var pageTitle = apiResult.query.search[i].title;
   		  			    var pageUrl = pageTitle.replace(/\s/g,'_');

             			$('#display-result').append('<button type=\"button\" class=\"btn btn-default btn-get\" name=\"'+pageTitle+'\">'+pageTitle+'</button>').hide().fadeIn(1500);
                    }

                   $(".btn-get").css("white-space", "normal");
                   $(".btn-get").css("margin-bottom", "5px");

                   buttonActive();
             }
        });
  } // end function getDataList

  /* make the corresponding button marked active or show error if page is not found */
  function buttonActive() {
	 if ( $( '#display-result' ).find('button:nth-child(1)').attr("name") === $('#showSearch').text() ) { $( '#display-result' ).find('button:nth-child(1)').addClass("active");}
	 else {$('#article').html('<p>The page \"'+$('#showSearch').text()+'\" does unfortunately not exist. You can ask <a href=\"https://en.wikipedia.org/wiki/Wikipedia:Articles_for_creation\" target=\"_blank\">for it to be created</a>, but consider checking the search results on the right side first to see whether the topic is already covered.</a></p>');}
  }


  /* Trigger the search by clicking the search button*/
  $('#btnSearch').click(function(){
 	 var searchText = $('#searchText').val();

      $('.wellTitle').addClass("well");
      $('#showSearch').text(searchText).hide().fadeIn(1500);
      //$('#article').text('');
      getDataList(searchText);
      getData(searchText);

  }); // end search btn click

  /* Trigger the search if enter key has been pressed after typing */
    $('#searchText').keypress(function(e) {
      if(e.which == 13) {

         var searchText2 = $('#searchText').val();
         $('.wellTitle').addClass("well");
         $('#showSearch').text(searchText2).hide().fadeIn(1500);
         //$('#article').text('');
         getDataList(searchText2);
         getData(searchText2);

      }
    }); // end search enter key pressed


  /* Get Random Article and show list of full Search done with random article title */
  $('#btnRandom').click(function() {

	  $.getJSON("https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&format=json&callback=?", function (data) {
        $.each(data.query.pages, function(k, v) {

		  var title = v.title;
		  $('.wellTitle').addClass("well");
          $('#showSearch').text(title).hide().fadeIn(1500);
          //$('#article').text('');
		  getDataList(title);
		  getData(title);


        });
      });
  });



  /* click a button in the list of related articles */
  $('#display-result').on('click','.btn-get', function() {

       $( '#display-result' ).find('button:nth-child(1)').removeClass("active");

       searchText3 = $(this).text();
       $('#showSearch').text(searchText3).hide().fadeIn(1500);
       $('#article').text('');

       getData(searchText3);

  });


}); // end document ready