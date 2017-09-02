// TODO:
// [ ] Fix filter reload flash
// [x] Fix Selected Video Animation
// [x] Add spinner to Selected Video Container
// [ ] Add spinner to Landing Video
// [ ] Set download logic on Selected Video Container
// [ ] Set generate code logic on Selected Video Container
// [ ] Set mobile view logic on toolbar
// [ ] Responsive

// SCALE:
// [ ] Add gradient bg and image bg


$(function () {
  var videoCount = videos.length;
  var randomVideo = Math.floor(Math.random() * videoCount);
  var downloadReady = false;
  var currentTitle = videos[randomVideo].title;
  var currentSrc = videos[randomVideo].src;

  // Load animations
  $('.landing-logo').css({
    'opacity': 1,
    'marginTop': 0
  });

  var setDownloadLink = function (title, src) {
    $('.download-video').attr('download', title);
    $('.download-video').attr('href', '../src/video/' + src);
  }

  var filterVideos = function (ele, filter) {
    ele.fadeOut();

    if (filter !== 'all') {
      ele.each(function (i) {
        if ($(this).data('tags').match(filter)) {
          $(this).fadeIn();
        }
      })
    } else {
      ele.fadeIn();
    }

    $('.dropdown-selected').data('selected-tag');
  }


  var toggleDropdown = function (div) {
    $(div).toggleClass('dropdown-showing');
  }

  // Hide Selected Video Container
  var hideVideoContainer = function () {
    $('.selected-video-container').removeClass('selected-video-showing');
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
    $('.landing-video video').attr('src', '../src/video/' + videos[randomVideo].src)
    $('.landing-title').text(videos[randomVideo].title)

    setDownloadLink(videos[randomVideo].title, videos[randomVideo].src)
  })


  // Display random video onload
  $('.landing-video video').attr('src', '../src/video/' + currentSrc);
  $('.landing-title').text(currentTitle);


  // Display videos
  $.each(videos, function (k, v) {
    $('.video-list').append(
      '<div class="video-item ease" style="background: url(../src/img/' + v.placeholder + ') no-repeat center center / cover;" data-tags="' + v.tags + '" data-src="' + v.src + '" data-title="' + v.title + '"">' +
      '<span>' + v.title + '</span>' +
      '</div>'
    )
  })


  // Selected Video
  $('.video-item').on('click', function (e) {
    var selectedVideoTitle = $(this).data('title');
    var selectedVideoSrc = $(this).data('src');

    e.stopPropagation();
    $('.selected-video-container').addClass('selected-video-showing');
    $('.selected-video-player').attr('src', '../src/video/' + selectedVideoSrc);
    $('.selected-video-player').attr('data-title', selectedVideoTitle);
    $('.selected-video-title').text(selectedVideoTitle);
  })

  $('body').on('click', function () {
    hideVideoContainer();
  })


  // Selected Video Container
  $('.selected-video-container').on('click', function (e) {
    e.stopPropagation();
  })

  $('.set-current-btn').on('click', function () {
    var currentVideo = $('.selected-video-player').attr('src');
    var currnetTitle = $('.selected-video-player').attr('data-title');

    $('.landing-video video').attr('src', currentVideo)
    $('.landing-title').text(currnetTitle)

    $("html, body").animate({ scrollTop: 0 }, "slow");
    setDownloadLink(currnetTitle, currentVideo)
    hideVideoContainer();
  })


  // Theme filters
  $('.themes button').on('click', function () {
    if ($(this).data('theme') !== 'video') {
      alert($(this).data('theme') + 's coming soon')
    }
  })


  // dropdown
  $('.dropdown-selected').on('click', function () {
    $('.dropdown-options').toggleClass('dropdown-showing');
  })

  $('.dropdown-options li').on('click', function () {
    $('.dropdown-selected').text($(this).text());
    $('.dropdown-selected').attr('data-selected-tag', $(this).data('tag'));

    // Dropdown tag logic
    filterVideos($('.video-item'), $('.dropdown-selected').attr('data-selected-tag'));
    toggleDropdown('.dropdown-options')
  })

})
