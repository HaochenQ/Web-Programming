/**
 * Course: COMP 426
 * Assignment: a04
 * Author: <Haochen Qi>
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function(hero) {
    // TODO: Generate HTML elements to represent the hero
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<div>${hero.name}</div>`;
    var $card = $('<div id="card" class="column" style="height: 420px;float: left; width: 375px; background-color:'+hero.backgroundColor+';">');
    //var $cardbot = $('<div style="color: white;>');
    //$cardtop.after(cardbot);
    $card.append('<img src='+hero.img+ '>');
    $card.append('<div id="name"   style="color:'+hero.color+';">'+hero.name+'</div>');
    $card.append('<div id="subtitle" style="font-style: italic;">"'+hero.subtitle+'"</div>');
    $card.append('<div id="real name">Alter<span> </span>ego: '+hero.first+' '+hero.last+'</div>'); 
    $card.append('<div id="date">'+hero.firstSeen+'</div>');
    $card.append('<p id="description">'+hero.description+'</p>');
    $card.append('<button type="button" style="position:relative;">Edit</button>');
    //var $card = $('<div>');
    //$card.append($cardtop);
    //$card.append($cardbot);
    return  $card
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Generate HTML elements to represent the hero edit form
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<form>${hero.name}</form>`;
    var $form=$('<div id="form">');
    var $formtop=$('<div id="top" class="column" style="float: left; width: 375px; background-color:'+hero.backgroundColor+';">');
    $formtop.append('<img src='+hero.img+ '>');
    var $formbot=$('<div id="bot" style="background-color: #F8F8FF;>');
    var $content=$('<form></form>');
    $content.append('Hero Name:<br><input type="text" name="herotname" value="'+hero.name+'"><br>')
    $content.append('First Name:<br><input type="text" name="firstname" value="'+hero.first+'"><br>')
    $content.append('Last Name:<br><input type="text" name="lastname" value="'+hero.last+'"><br>')
    $content.append('Subtitle Name:<br><input type="text" name="subtitle" value="'+hero.subtitle+'"><br>')
    $content.append('Description:<br><textarea name="message" style="width:200px;">'+hero.description+'</textarea><br>')
    var date = hero.firstSeen.toISOString().slice(0,10);
    $content.append('First Seen:<br><input type="date" id="start" name="trip-start"value="'+date+'"min="1940-01-01" max="2018-12-31"><br>')
    //+hero.firstSeen.getFullYear()+'-'+hero.firstSeen.getMonth()+'-'+hero.firstSeen.getDate()+
    $content.append('<button type="reset" value="Cancel">Cancel</button>')
    $content.append('<button type="submit" value="Save">Save</button>')  
    $formbot.append($content);
    $form.append($formtop);
    $formtop.append($content);
    return $form;
};



/**
 * Given an array of hero objects, this function converts the data into HTML and
 *     loads it into the DOM.
 * @param heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    // TODO: Append the hero cards to the $root element
    for(let i=0;i<heroes.length;i++){
        $root.append(renderHeroCard(heroes[i]));
    }

    // Pick a hero from the list at random
    const randomHero = heroes[Math.floor(Math.random() * heroes.length)];
    $root.append(renderHeroEditForm(randomHero))
    // TODO: Generate the hero edit form using renderHeroEditForm()

    // TODO: Append the hero edit form to the $root element
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});
