
var win, container;
//-
$(document).ready(function($) {
  win = $(window);
  container = $('section');
  //-
  container.find('a').each(function(){
    new SplitFont( $(this) );
  });
});


//- FONT -
var SplitFont = function( _element ){
  var t = this;
  t.el = _element;
  t.splitText = new SplitText( t.el, {type:"words, chars"});
  t.numChars = t.splitText.chars.length;
  //
  t.chars = [];
  for(var i = 0; i < t.numChars; i++){
      var char = $(t.splitText.chars[i]);
      var text = char.text();
      char.html('<span class="c1">'+text+'</span><span class="c2">'+text+'</span>');
  }
  
  //- Functions
  t.changeWeight = function( _mouseX, _wght, _vel, _delayVel ){
    for(var i = 0; i < t.numChars; i++){
      var char = $(t.splitText.chars[i]);
      //-
      var delay =  Math.abs( char.offset().left - _mouseX ) * _delayVel;
      TweenMax.to( char.find('.c2'), _vel, {'font-variation-settings':'"wght" '+_wght+', "wdth" 250', delay: delay, overwrite:5} );
    }
  }
  
  //- Events
  t.el.bind('mouseenter', function(e){
    //$(this).addClass('over');
    t.changeWeight( e.clientX, 750, 0.3, 0.002 );

  }).bind('mouseleave', function(e){
    //$(this).removeClass('over');
    t.changeWeight( e.clientX, 100, 0.5, 0.002 );
  });
};