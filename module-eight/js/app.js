$(document).ready(function(){

  //Upcoming Movies
	var url = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json';	
    $.ajax({
        url: url,
        data: {
            apiKey: 'hcrurhsttexasrgfm2y6yahm'
        },
        dataType: 'jsonp',
        success: showMoviestoo
    });
	function showMoviestoo (response) { 
        console.log('response', response);
		var hitTemplate4 = Handlebars.compile($("#hit-template4").html());
        var movies = response.movies;
		var side = $("#side");
        for (var i = 0; i < movies.length; i++) {
        var movie = movies[i];
		side.append(hitTemplate4({
									title: movie.title
									
									}));
		
		
        };
		
		  
    }; 
	
	//Search Movie
	
	$('#searchForm').submit(function(){
        webSearch();
        return false;
		
    });
	
	

    function webSearch(){
		
		$('#myCarousel').remove();
		$('#category').remove();
		$('#rs2').remove();
		$('.active').removeClass('active');
		$('#resulta').append('<img src="css/gif-load.gif" class = \'loading\'>');	
        var inp = $('#s').val(); //get the input
		$('#resulta').append('<p>Finding movies that matches ' +inp+ '</p>');
		var apiURL = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json';
        $.ajax({ // Asynchronous JavaScript and XML
            type: "GET",
            data: {
                q: inp,
                apiKey: 'yqmxyvyjaff6v6ufx9j4n3ru',
            },
            url: apiURL,
            dataType:"jsonp",// method to request data from a server
            success: showMovies
        });
    };
	

	
function showMovies(response) { 
        console.log('response', response);
		$('.loading').remove();
		$('#myCarousel').remove();
		$('.active').removeClass('active');
		var hitTemplate = Handlebars.compile($("#hit-template").html());
        var movies = response.movies;
		var rs = $("#rs");
		rs.html(""); //empty the results
        for (var i = 0; i < movies.length; i++) {
        var movie = movies[i];
		rs.append(hitTemplate({title: movie.title, 
									
									poster: movie.posters.detailed,
									year: movie.year,
									text: movie.synopsis,
									rating: movie.ratings.audience_rating
									
									}));
		
		
        };
		
		var hitTemplate2 = Handlebars.compile($("#founded-template").html());
		var resulta = $("#resulta");
		resulta.html("");
		resulta.empty();
		resulta.append(hitTemplate2({found: response.movies.length}));
		  
    }; 



    
});
