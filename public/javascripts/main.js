
var ok = false;
$(".btn.btn-default.apply.susc").click(
  function(e) {
    e.preventDefault()
    var $div = $(e.target);
    var $email = $(this).prev();
    var $button = $div.find('#apply');
    if(ok){
      $button.addClass('disabled');
      $.post('signup', {
        email: $email.val()
      }).success(function(data) {
          $('.cta').fadeOut(function() {
          $('.cta p').hide();
          $('.cta').html('<div class="emailThanks">Gracias por suscribirte!<br> \
            Revisá tu casilla de correo (incluido el spam) por un mail nuestro.</div>');
          $('.cta').show();
        });
      }).error(function(xhr, textStatus, error) {
        if($.parseJSON(xhr.responseText).title === 'Member Exists'){
          $('.cta').fadeOut(function() {
          $('.cta').html('<div class="emailThanks">Gracias por suscribirte!<br> \
            Revisá tu casilla de correo (incluido el spam) por un mail nuestro.</div>');
          $('.cta').show();
        });
        }else{
          $('.cta>h4').fadeOut(100, function() {
            $('.cta>h4').text('Controla la dirección de email.');
            $('.cta>h4').fadeIn(300);
          });
          $button.removeClass('disabled');
          $(".btn.btn-default.apply.susc").html('Suscribite').css('font-size','14px');
        }
      });
      $(".btn.btn-default.apply.susc").html('<i class="fa fa-cog fa-spin fa-3x fa-fw"></i>').css('font-size','6px');
    }else{
      $('.suscribe-form input').css('border', 'solid 2px rgba(255, 0, 0, 0.76)')
    }
  });

$('input').on('keydown', function(event) {
   var x = event.which;
   if (x === 13) {
       event.preventDefault();
   }
});

var $email = $('.suscribe-form input');
$email.on('change',  function() {
        filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (filter.test($(this).val())) {
            $(this).css('border', 'solid 0px rgba(255, 0, 0, 0.76)')
            ok = true;
        } else {
            $(this).css('border', 'solid 2px rgba(255, 0, 0, 0.76)')
            ok = false;
        }
})

$('.btn.btn-default.apply.masinfo').click( function(){
  $('.formtop').slideToggle(400);
});
