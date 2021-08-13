/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {


  // Fake data taken from initial-tweets.json
const data = [
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


  function renderTweets(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
    tweetData.forEach((item) => {
      return createTweetElement(item).appendTo('.tweets');
    })
  }

    


// function takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet.takes in a tweet object and is responsible for returning a tweet <article> element containing takes in a tweet object and is responsible for returning a tweet <article> element containing 
// the entire HTML structure of the tweet.the entire HTML structure of the tweet.
const createTweetElement = function(tweet) { 

  //   const tweetData = {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png",
  //         "handle": "@SirIsaac"
  //       },
  //     "content": {
  //         "text": "If I have seen further it is by standing on the shoulders of giants"
  //       },
  //     "created_at": 1461116232227
  //  }
  
  // const $tweet = createTweetElement(tweetData);
  
  // // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  
  
  
  // const $tweet = $(`<article class="tweet">Hello world</article>`);
    
    // const markup =
  
    // `   <article class='container'>
    //    <header id="article-header"><i style="float:left; margin: 0.2em" class="fas fa-smile"></i>&nbsp&nbsp ${user.name}</header>
    //    <footer id="article-footer" class="container">&nbsp ${user[created_at]}
    //      <div id="footer-emotes">
    //      <i class="fas fa-flag"></i>&nbsp<i class="fas fa-retweet"></i>&nbsp<i class="fas fa-heart"></i>
    //      </div>
    //    </footer>
    //  </article>`;
  
  
  
      let tweet = $('<article>').addClass('tweet');
      
      const header = $('<header>');
      const img = $('<img>', {
        'src': tweetData.user.avatars.small 
      });
      const h2 = $('<h2>', {
        text: tweetData.user.name
      });
      const handle = $('<p>', {
        'class': 'handle',
        text: tweetData.user.handle
      });
      const p = $('<p>', {
        text: tweetData.content.text
      });
      const footer = $("<footer>", {
        text: Math.round(((Date.now() - tweetData.created_at) / 86400000))  + ' days ago'
      });
      
      header.append(img, h2, handle);
      tweet.append(header, p, footer);
      
      return tweet;
    }

    renderTweets(data);
});




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
  
  loadTweets();
  
  $('.new-tweet form').submit((event) => {
    event.preventDefault();
    const charLeft = Number($('.counter').text());
    if (charLeft == 140) {
      $('.popup-msg').text('Write something before submitting.').slideDown(function() {
        setTimeout(function() {
          $('.popup-msg').slideUp();
        }, 5000);
      });
    } else if (charLeft < 0) {
      $('.popup-msg').text('Oops, you wrote too much!').slideDown(function() {
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
  
  function renderNewTweet() {
    $.ajax({
      type: 'GET',
      url: '/tweets',
      success: function(data) {
        const newTweet = createTweetElement(data[0]);
        newTweet.prependTo('.tweets');
      }
    });
  }
  
  function renderTweets(tweetData) {
    tweetData.forEach((item) => {
      return createTweetElement(item).appendTo('.tweets');
    })
  }
  
  function createTweetElement(tweetData) {
    let tweet = $('<article>').addClass('tweet');
    
    const header = $('<header>');
    const img = $('<img>', {
      'src': tweetData.user.avatars.small 
    });
    const h2 = $('<h2>', {
      text: tweetData.user.name
    });
    const handle = $('<p>', {
      'class': 'handle',
      text: tweetData.user.handle
    });
    const p = $('<p>', {
      text: tweetData.content.text
    });
    const footer = $("<footer>", {
      text: Math.round(((Date.now() - tweetData.created_at) / 86400000))  + ' days ago'
    });
    
    header.append(img, h2, handle);
    tweet.append(header, p, footer);
    
    return tweet;
  }

  // Compose button behavior
  $('nav .compose').click((event) => {
    event.preventDefault();
    $('.new-tweet').slideToggle();
    $('.new-tweet textarea').focus();
  })
  
});