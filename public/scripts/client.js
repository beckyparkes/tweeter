/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  // function loadTweets() {
  //   $.ajax({
  //     type: 'GET',
  //     url: '/tweets',
  //     success: function(data) {
  //       renderTweets(data);
  //     }
  //   });
  // }



  //action when submitting
  // $("#new-tweet").on('submit', (event) => {
  //   event.preventDefault();

  //   let data = ($(event.target).serialize()); //taking data from the input field and turning it into a query string
  //   let inputText = $(event.target).children('textarea').val();

  //   if (inputText === '') {
  //     $('.error').text("Please enter a tweet before submitting!").hide();
  //     $('.error').slideDown("slow");
  //   } else if (inputText.length > 140) {
  //     $('.error').text("Too many characters!").hide();
  //     $('.error').slideDown();
  //   } else {
  //     $.ajax('/tweets', {method: 'POST', data: data}).then(() => { //using ajax to make a post request and render the new tweets without reloading the page
  //       $(event.target).children('textarea').val(''); //clears text area
  //       $('.counter').text(140); //reset text area
  //       $('.error').hide();
  //       loadTweets();
  //     });
  //   }
  // });


  // // disallow when certain conditions aren't met

  // $('.new-tweet form').submit((event) => {
  //   event.preventDefault();
  //   const charLeft = Number($('.counter').text());
  //   if (charLeft == 140) {
  //     $('.popup-msg').text('Write something before submitting.').slideDown(function() {
  //       setTimeout(function() {
  //         $('.popup-msg').slideUp();
  //       }, 5000);
  //     });
  //   } else if (charLeft < 0) {
  //     $('.popup-msg').text('Oops, you wrote too much!').slideDown(function() {
  //       setTimeout(function() {
  //         $('.popup-msg').slideUp();
  //       }, 5000);
  //     });
  //   } else {
  //     $.ajax({
  //       type: 'POST',
  //       url: '/tweets',
  //       data: $('.new-tweet form textarea').serialize(),
  //       success: renderNewTweet
  //     });
  //   }
  // });
  

// ----------------   Fake data taken from initial-tweets.json ------------------------
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]





// function takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet.takes in a tweet object and is responsible for returning a tweet <article> element containing takes in a tweet object and is responsible for returning a tweet <article> element containing 
// the entire HTML structure of the tweet.the entire HTML structure of the tweet.


  // takes in this object "tweet"
  const tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  
      tweets.forEach((item) => {
        return createTweetElement(item).appendTo('#tweets-container');
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

  renderTweets(tweetData);


});


