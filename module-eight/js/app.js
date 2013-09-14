$(document).ready(function(){

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
        var inp = $('#s').val();
        var apiURL = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json';
		$('#resulta').append('<p>Finding movies that matches ' +inp+ '</p>');
        $.ajax({
            type: "GET",
            data: {
                q: inp,
                apiKey: 'yqmxyvyjaff6v6ufx9j4n3ru',
            },
            url: apiURL,
            dataType:"jsonp",
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
		rs.html(""); 
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
