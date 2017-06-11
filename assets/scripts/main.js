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
    $('.responsive-toolbar').removeClass('show-menu');
    $('.responsive-container').css('display', 'none');
    $('.toggle-responsive').removeClass('selected');
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

  $('.toggle-responsive').on('click', function () {
    $(this).toggleClass('selected');
    $('.responsive-container').toggle(500);
    $('.responsive-toolbar').toggleClass('show-menu');
    $('.down').toggle();
  })

  $('.responsive-container').on('click', function () {
    var deviceWidth = $(this).data('width');
    var deviceHeight = $(this).data('height');

    $(this).addClass('selected-device').siblings().removeClass('selected-device');
    $('.callout-video').css({
      position: 'relative',
      background: 'red',
      height: deviceHeight,
      width: deviceWidth,
      minHeight: deviceHeight,
      minWidth: deviceWidth
    })
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

  // Display videos
  $.each(videos, function (k, v) {
    $('.video-list').append(
      '<div class="video-item" data-src="' + v.src + '" data-title="' + v.title + '">' +
      v.title +
      '</div>'
    )
  })

  // Selected Video
  $('.video-item').on('click', function (e) {
    var selectedVideoTitle = $(this).data('title');
    var selectedVideoSrc = $(this).data('src');

    e.stopPropagation();
    $('.selected-video-container').addClass('selected-video-showing');
    $('.selected-video-player').attr('src', 'assets/video/' + selectedVideoSrc);
    $('.selected-video-player').attr('data-title', selectedVideoTitle);
    $('.selected-video-title').text(selectedVideoTitle);
  })

  $('body').on('click', function () {
    $('.selected-video-container').removeClass('selected-video-showing');
  })

  $('.set-current-btn').on('click', function () {
    var currentVideo = $('.selected-video-player').attr('src');
    var currnetTitle = $('.selected-video-player').attr('data-title');

    $('.landing-video video').attr('src', currentVideo)
    $('.landing-title').text(currnetTitle)

    $("html, body").animate({ scrollTop: 0 }, "slow");
    setDownloadLink(currnetTitle, currentVideo)
  })


})
