$(function () {

  // Info panel
  $('.info').on('click', function () {
    $('.info-panel').toggleClass('auto-size');
    $('.info-container').fadeToggle('fast');
    $(this).toggleClass('fa-dot-circle-o fa-close');
  })

})
