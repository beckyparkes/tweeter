/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  function loadTweets() {
    $.ajax({
      type: 'GET',
      url: '/tweets',
      success: function(data) {
        renderTweets(data);
      }
    });
  }

  // action when submitting
  $("#make-new-tweet").on('submit', (event) => {
    event.preventDefault();

    let data = ($(event.target).serialize()); //taking data from the input field and turning it into a query string
    let inputText = $(event.target).children('textarea').val();

    if (inputText === '') {
      $('.error').text("Please enter a tweet before submitting!").hide();
      $('.error').slideDown("slow");
    } else if (inputText.length > 140) {
      $('.error').text("Too many characters!").hide();
      $('.error').slideDown();
    } else {
      $.ajax('/tweets', {method: 'POST', data: data}).then(() => { //using ajax to make a post request and render the new tweets without reloading the page
        $(event.target).children('textarea').val(''); //clears text area
        $('.counter').text(140); //reset text area
        $('.error').hide();
        loadTweets();
      });
    }
  });


  // disallow when certain conditions aren't met

  $("#make-new-tweet").submit((event) => {
    event.preventDefault();
    const chars = Number($('.counter').text());
    if (chars === 140) {
      $('.popup-msg').text('Form cannot be empty.').slideDown(function() {
        setTimeout(function() {
          $('.popup-msg').slideUp();
        }, 5000);
      });
    } else if (chars < 0) {
      $('.popup-msg').text("Message must remain under 140 characters").slideDown(function() {
        setTimeout(function() {
          $('.popup-msg').slideUp();
        }, 5000);
      });
    } else {
      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: $('.new-tweet form textarea').serialize(),
        success: renderNewTweet
      });
    }
  });



const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  
      tweets.forEach((item) => {
        return createTweetElement(item).prependTo('#tweets-container');
      })
    }


const createTweetElement = function(data) {
  const timeAgo = timeago.format(data.created_at);
  let $newTweet = 
  $(`<article class='container'>

    <header id="article-header"><i style="float:left; margin: 0.2em" class="fas fa-smile"></i>
      <div id="name">&nbsp&nbsp ${data.user.name}</div>
      <div id="handle">${data.user.handle}</div>
    </header>

    <div id="article-body">${data.content.text}</div>
    <footer id="article-footer" class="container">&nbsp ${timeAgo}
      <div id="footer-emotes">
      <i class="fas fa-flag"></i>&nbsp<i class="fas fa-retweet"></i>&nbsp<i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`);
  
  return $newTweet;
}


});


