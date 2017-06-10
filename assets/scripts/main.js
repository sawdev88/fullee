$(function () {
  var videoCount = videos.length;
  var randomVideo = Math.floor(Math.random() * videoCount);
  var downloadReady = false;
  var currentTitle = videos[randomVideo].title;
  var currentSrc = videos[randomVideo].src;

  var setDownloadLink = function (title, src) {
    $('.download-video').attr('download', title);
    $('.download-video').attr('href', 'assets/video/' + src);
  }

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

  // Display edit control title
  $('.controls .control').on('mouseover', function () {
    var controlTitle = $(this).data('title');
    $('.control-title h4').text(controlTitle);
  })
  .on('mouseleave', function () {
    $('.control-title h4').text('');
  })

  // Edit bar Controls
  $('.hide-logo').on('click', function () {
    $(this).toggleClass('selected');
    $('.landing-logo').toggleClass('hide');
  })

  //Set Download link
  setDownloadLink(currentTitle, currentSrc)

  $('.random-icon').on('click', function () {
    randomVideo = Math.floor(Math.random() * videoCount);
    $('.landing-video video').attr('src', 'assets/video/' + videos[randomVideo].src)
    $('.landing-title').text(videos[randomVideo].title)

    setDownloadLink(videos[randomVideo].title, videos[randomVideo].src)
  })

  // Display random video onload
  $('.landing-video video').attr('src', 'assets/video/' + currentSrc);
  $('.landing-title').text(currentTitle);

})
