/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {

  function loadTweets() {
    $.ajax({
      type: 'GET',
      url: '/tweets',
      success: function (data) {
        renderTweets(data);
      }
    });
  }

  // action when submitting
  $("#make-new-tweet").on('submit', (event) => {
    event.preventDefault();

    let data = ($(event.target).serialize()); //taking data from the input field and turning it into a query string
    let inputText = $(event.target).children('textarea').val();

    if (inputText === '' || inputText === null) {
      $('.error').text("Please enter a tweet before submitting!").hide();
      $('.error').slideDown("slow");
    } else if (inputText.length > 140) {
      $('.error').text("Too many characters!").hide();
      $('.error').slideDown();

    } else {
      $.ajax('/tweets', { method: 'POST', data: data }).then(() => { //using ajax to make a post request and render the new tweets without reloading the page
        $(event.target).children('textarea').val(''); //clears text area
        $('.counter').text(140); //reset text area
        $('.error').hide();
        loadTweets();
      });
    }
  });

  //loops through list and appends to text area
  const renderTweets = function (tweets) {
    tweets.forEach((item) => {
      return createTweetElement(item).prependTo('#tweets-container');
    })
  }


  const createTweetElement = function (data) {
    const timeAgo = timeago.format(data.created_at);
    let $newTweet =
      $(`<article class='container'>

        <header id="article-header"><img src="${data.user.avatars}" style="float:left; margin: 0.2em" class="fas fa-smile"></i>
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

  // <header id="article-header"><img src="${data.user.avatars}" style="float:left; margin: 0.2em" class="fas fa-smile"></i>

});


