/**
 * Course: COMP 426
 * Assignment: a09
 * Author: <Haochen Qi>
 *
 * A twitter-like web app
 */

//import script from "./script.js"
/**
 * show a tweet
 */
export const createTweetCard = function(tweet) {

    let $tweetCard = $(`<div class="tweet" id="${tweet.id}">`);
    if (tweet.isMine) {
        let $myButton = $(`<div name="myButtons" class="myButtons">`);
        $myButton.append(`<button type="button" class="edit" id="edit${tweet.id}">edit</button>`);
        $myButton.append(`<button type="button" class="Delete" id="delete${tweet.id}">delete</button>`);
        $myButton.appendTo($tweetCard);
    }
    $tweetCard.append(`Author: <div class="author">${tweet.author}</div>`);
    $tweetCard.append(`<br>Tweet: <div class="tweetBody" id="tweetBody${tweet.id}">${tweet.body}</div>`);
    let $threeAttri = $(`<div class="atrribute">`);
    $threeAttri.append(`<div name="numOfLikes" class="attribute">Likes: ${tweet.likeCount}</div>`);
    $threeAttri.append(`<div name="numOfRetweets" class="attribute">Retweets: ${tweet.retweetCount}</div>`);
    $threeAttri.append(`<div name="isLiked" class="attribute">Liked?: ${tweet.isLiked}</div>`);
    $threeAttri.append(`<div name="type" class="attribute">Type: ${tweet.type}</div>`);
    if (tweet.type == 'retweet' && tweet.parent != undefined) {
        $threeAttri.append(`<div name="originalAuthor" class="attribute">From: ${tweet.parent.author}</div>`);
    }
    $threeAttri.appendTo($tweetCard);
    let $buttonArea = $(`<div class="buttons">`);
    if (tweet.isLiked) {
        $buttonArea.append(`<button type="button" class="unlike" id="unlike${tweet.id}">unlike</button>`);
    } else {
        $buttonArea.append(`<button type="button" class="like" id="like${tweet.id}">like</button>`);
    }
    $buttonArea.append(`<button type="button" class="retweet" id="retweet${tweet.id}">retweet</button>`);
    $buttonArea.append(`<button type="button" class="reply" id="reply${tweet.id}">reply</button>`);
    if (tweet.replyCount > 0) {
        $buttonArea.append(`<button type="button" class="viewReply" id="viewReply${tweet.id}">view reply</button>`);
    }
    $buttonArea.appendTo($tweetCard);
    return $tweetCard;
}

/**
 * call api and get 50 tweets
 */
export const createMainCard = function() {

    let $mainCard = $('<div class="mainCard">');
    $('<button type="button" class="newPost">New Post</button>').appendTo($mainCard);
    index().then(function(tweetList) {
        for (let i = 0; i < tweetList.length; i++) {
            let tweet = tweetList[i];
            $mainCard.append(createTweetCard(tweet));
        }
    });
    return $mainCard;
}

/**
 * handle new post button
 */
export const handleNewPost = function(event) {
    //let buttonDiv = event.target.parentNode;
    let $newInput = $(`<div name="input" class="inputPart">`)
    $newInput.append(`<textarea placeholder="text your post here" class="content" rows="4" cols="85"></textarea><br>`);
    $newInput.append(`<button type=button class="cancelInput">cancel</button>`);
    $newInput.append(`<button type=button class="submitInput">submit</button>`);
    //$(`.newPost`).after($newInput);
    $(`.newPost`).replaceWith($newInput);
}

/**
 * handle submit button when create a new post
 * @param {*} event 
 */
export const handleSubmitNewPost = function(event) {
    let content = $(`.content`).val();
    $(`.inputPart`).replaceWith($('<button type="button" class="newPost">New Post</button>'));
    create(content).then(function(tweet) {
        $(`.newPost`).after(createTweetCard(tweet));
    });

    //to dynamically add
    //window.location.reload();
}

/**
 * handle delet my post
 */
export const handleDelete = function(event) {
    let Targetpost = event.target.parentNode.parentNode;
    let postId = Targetpost.id;
    deleteT(postId);
    $(`#${postId}`).remove();
    //to dynamically delete
    //$(`#postId`).parentNode.removeChild($(`#postId`));

}

/**
 * handle like tweet
 */
export const handelLike = function(event) {
    //alert('clicked!');
    //let Targetpost = $(event.target).parent().parent();
    let Targetpost = event.target.parentNode.parentNode;
    let postId = Targetpost.id;
    like(postId).then(function() {
        read(postId).then(function(tweet) {
            $(`#${postId}`).replaceWith(createTweetCard(tweet));
        });
    })

    // let $dislike = $(`<button type="button" class="commonButton" id="unlike">unlike</button>`);
    // document.getElementById(postId).querySelector("#like").replaceWith("hi");
}

/**
 * handle unlike
 * @param {*} event 
 */
export const handelUnlike = function(event) {
    let Targetpost = event.target.parentNode.parentNode;
    let postId = Targetpost.id;
    unlike(postId).then(function() {
        read(postId).then(function(tweet) {
            $(`#${postId}`).replaceWith(createTweetCard(tweet));
        });
    });

}

/**
 * handle edit my own post
 */
export const handleEdit = function(event) {
    let Targetpost = event.target.parentNode.parentNode;
    let postId = Targetpost.id;
    let $editCard = $(`<div class="editCard">`);
    let content = $(`#tweetBody${postId}`).text();
    //alert(content);
    //let content = $(`.content`).val();
    $editCard.append(`Edit My Tweet:<br><textarea class="editContent" rows="4" cols="85">${content}</textarea><br></br>`);
    $editCard.append(`<button type=button class="cancelEdit">cancel</button>`);
    $editCard.append(`<button type=button class="submitEdit">submit</button>`);
    $(`#${postId}`).replaceWith($editCard);
}

/**
 * handle edit cancel
 * @param {*} event 
 * @param {*} id 
 */
export function handleEditCancel(event, id) {
    //alert(id);
    read(id).then(function(tweet) {
        $(`.editCard`).replaceWith(createTweetCard(tweet));
    });
}


/**
 * handle edit card submit button
 * @param {*} event 
 * @param {*} id 
 */
export function handleEditSubmit(event, id) {
    //alert(id);
    let content = $(`.editContent`).val();
    //alert(content);
    update(id, content).then(function(tweet) {
        $(`.editCard`).replaceWith(createTweetCard(tweet));
    });

}


/**
 * handle reply a tweet
 */
export const handleReply = function(event) {
    let Targetpost = event.target.parentNode.parentNode;
    let postId = Targetpost.id;
    let $replyCard = $(`<div class="replyCard" id="replyCard${postId}">`);
    $replyCard.append(`Reply:<br><textarea class="replyContent" placeholder="text your reply here" rows="4" cols="85"></textarea><br></br>`);
    $replyCard.append(`<button type=button class="cancelReply">cancel</button>`);
    $replyCard.append(`<button type=button class="submitReply">submit</button>`);
    $(`#${postId}`).after($replyCard);
    $(`#reply${postId}`).prop('disabled', true);
    //$(`#${postId}#reply`).hide();
}

/**
 * handle reply submit button
 * @param {*} event 
 */
export const handleReplySubmit = function(id) {
    let content = $(`.replyContent`).val();
    reply(id, content).then(function() {
        read(id).then(function(tweet) {
            //alert('hi');
            $(`#${id}`).replaceWith(createTweetCard(tweet));
            //alert('already create');
        });
    });
    $(`#replyCard${id}`).remove();

    $(`#reply${id}`).prop('disabled', false);
}


/**
 * handle retweet
 */
export const handleRetweet = function(event) {
    let Targetpost = event.target.parentNode.parentNode;
    let postId = Targetpost.id;
    let content = $(`#tweetBody${postId}`).text();
    let $retweetCard = $(`<div class="retweetCard" id="retweetCard${postId}">`);
    $retweetCard.append(`Retweet:<br><textarea class="retweetContent" rows="4" cols="85">${content}</textarea><br></br>`);
    $retweetCard.append(`<button type=button class="cancelRetweet">cancel</button>`);
    $retweetCard.append(`<button type=button class="submitRetweet">submit</button>`);
    $(`#${postId}`).after($retweetCard);
    $(`#retweet${postId}`).prop('disabled', true);
}

/**
 * handle retweet submit
 */
export const handleRetweetSubmit = function(id) {
    let content = $(`.retweetContent`).val();
    retweet(id, content).then(function(tweet) {
        $(`.newPost`).after(createTweetCard(tweet));
        $(`#retweetCard${id}`).remove();
        read(id).then(function(tweet) {
            $(`#${id}`).replaceWith(createTweetCard(tweet));
        });
    });

    $(`#retweet${id}`).prop('disabled', false);
}

/**
 * handle view reply
 */
export const handleReviewReply = function(event) {
    let Targetpost = event.target.parentNode.parentNode;
    let postId = Targetpost.id;
    let $replyViewCard = $(`<div class="replyViewCard" id="replyViewCard${postId}">`);
    read(postId).then(function(tweet) {
        let replies = tweet.replies;
        for (let i = 0; i < replies.length; i++) {
            let tweet = replies[i];
            $replyViewCard.append(createTweetCard(tweet));
        }
    });
    $replyViewCard.append(`<button type=button class="closeReplyView">close</button>`);
    $(`#${postId}`).after($replyViewCard);
    $(`#viewReply${postId}`).prop('disabled', true);
}

/**
 * This function load tweets into DOM, add event handlers
 */
export let loadTweetsIntoDOM = function() {
    let $root = $('#root');
    $root.append(createMainCard());

    //handle event new post
    $root.on('click', '.newPost', function(e) {
        handleNewPost(e);
        $(".cancelInput").on('click', function(e) {
            $(`.inputPart`).replaceWith($('<button type="button" class="newPost">New Post</button>'))
        });
        $(".submitInput").on('click', function(e) {
            handleSubmitNewPost(e);
        });
    });
    //handle event on my own post myButn1 edit
    $root.on('click', '.edit', function(e) {
        handleEdit(e);
        let Targetpost = e.target.parentNode.parentNode;
        let postId = Targetpost.id;
        $(".cancelEdit").on('click', function(e) {
            handleEditCancel(e, postId);
        });
        $(".submitEdit").on('click', function(e) {
            handleEditSubmit(e, postId);
        })

    });
    //let $buttons = $(`.buttons`);
    //handle event on my own post myButn2 delete
    $root.on('click', '.Delete', function(e) {
        handleDelete(e);
    });
    //handle common buttons
    $root.on('click', '.like', function(e) {
        //e.preventDefault();
        handelLike(e);
    });

    $root.on('click', '.unlike', function(e) {
        //e.preventDefault();
        handelUnlike(e);
    });

    $root.on('click', '.retweet', function(e) {
        handleRetweet(e);
        let Targetpost = e.target.parentNode.parentNode;
        let postId = Targetpost.id;
        $(`.cancelRetweet`).on('click', function(e) {
            $(`#retweetCard${postId}`).remove();
            $(`#retweet${postId}`).prop('disabled', false);
        });
        $(`.submitRetweet`).on('click', function(e) {
            handleRetweetSubmit(postId);
        });

    });
    $root.on('click', '.reply', function(e) {
        handleReply(e);
        let Targetpost = e.target.parentNode.parentNode;
        let postId = Targetpost.id;
        $(`.cancelReply`).on('click', function(e) {
            $(`#replyCard${postId}`).remove();
            $(`#reply${postId}`).prop('disabled', false);
        });
        $(`.submitReply`).on('click', function(e) {
            handleReplySubmit(postId);
            // read(postId).then(function(tweet) {
            //     alert(postId);
            //     $(`#${postId}`).replaceWith(createTweetCard(tweet));
            //     //alert('already create');
            // });
        });
    });

    $root.on('click', '.viewReply', function(e) {
        let Targetpost = e.target.parentNode.parentNode;
        let postId = Targetpost.id;
        handleReviewReply(e);
        $(`.closeReplyView`).on('click', function(e) {
            //alert(postId);
            $(`#replyViewCard${postId}`).remove();
            $(`#viewReply${postId}`).prop('disabled', false);
            read(postId).then(function(tweet) {
                $(`#${postId}`).replaceWith(createTweetCard(tweet));
            })

        });
    });
}



/**
 * Use jQuery to execute the loadTweetsIntoDOM function after the page loads
 */
$(function() {
    loadTweetsIntoDOM();
});

/**
 * handle infinite Scrolling 
 * reference:https://stackoverflow.com/questions/20972026/how-to-get-infinite-scroll-to-work
 */
let i = 50;
$(window).scroll(function() {
    //- 10 = desired pixel distance from the bottom of the page while scrolling)
    if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
        let $mainCard = $('.mainCard');
        index(i).then(function(tweetList) {
            for (let i = 0; i < tweetList.length; i++) {
                let tweet = tweetList[i];
                $mainCard.append(createTweetCard(tweet));
            }
        });
        i += 50;
    }
});
// let i = 50;
// window.onscroll = function(ev) {
//     if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
//         // you're at the bottom of the page
//         //alert("Bottom of page");
//         let $mainCard = $('.mainCard');
//         index(i).then(function(tweetList) {
//             for (let i = 0; i < tweetList.length; i++) {
//                 let tweet = tweetList[i];
//                 $mainCard.append(createTweetCard(tweet));
//             }
//         });
//         i += 50;
//     }
// };