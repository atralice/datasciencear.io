$(window).resize( function(){
   console.log('a');
  $("#triangles").width( $('html').width(); ).height( $('html').height(); );

})