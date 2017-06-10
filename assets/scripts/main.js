$(function () {
  var videoCount = videos.length;
  var randomVideo = Math.floor(Math.random() * videoCount);

  // Landing Video //
  // Show Edit Toolbar
  $('.open-toolbar').on('click', function () {
    $('.edit-toolbar').css('top', 0);
    $(this).fadeOut('fast');
  })

  // Hide Toolbar
  $('.close-toolbar').on('click', function () {
    $('.edit-toolbar').css('top', '-6rem');
    $('.open-toolbar').fadeIn('fast');
  })

  $('.hide-logo').on('click', function () {
    $(this).toggleClass('selected');
    $('.landing-logo').toggleClass('hide');
  })

  $('.random-icon').on('click', function () {
    randomVideo = Math.floor(Math.random() * videoCount);
    $('.landing-video video').attr('src', 'assets/video/' + videos[randomVideo].src)
    $('.landing-title').text(videos[randomVideo].title)
  })

  // Display random video onload
  $('.landing-video video').attr('src', 'assets/video/' + videos[randomVideo].src)
  $('.landing-title').text(videos[randomVideo].title)

})
