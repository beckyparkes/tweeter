(function ($) {
  $(() => {
    $("#tweet-text").on("input", onInput);
  });

let CHAR_LIM = 140;
const OVER_LIM = 'You are over character limit';
const WARNING = 'WARNING! You are approaching character limit';

const onInput = function () {
  const count = $("#tweet-text").val().length;

  // console.log(`${$("#tweet-text").val()}`);

  // }

  // $('.counter').text('abc');

  // $('.mix').html('abc');


  const remaining = CHAR_LIM - count;

  const parent = $(this).parent();
  const $counter = parent.find("output.counter");

  $counter.removeClass(WARNING).removeClass(OVER_LIM);
  if (remaining <= 10 && remaining >= 0) {
    $counter.removeClass(OVER_LIM).addClass(WARNING)
  } else if (remaining < 0) {
    $counter.removeClass(WARNING).addClass(OVER_LIM);
  }
  // $counter.toggleClass(OVER_LIM, remaining < 0);

  if (remaining <= 0) {
    $('.counter').addClass('fg_red');
  } else {
    $('.counter').removeClass('fg_red');
  }
  $counter.html(remaining);
};
}) (jQuery);
