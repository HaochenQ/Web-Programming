/**
 * Course: COMP 426
 * Assignment: a05
 * Author: <haochen qi>
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 * 
 * !!!!use event delegation carefully!!!!!!!!!!
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function (hero) {
    // TODO: Copy your code from a04 to render the hero card
    var $card = $(`<div id="${hero.id}" class="column" style="padding:12px;margin:8px; height: 450px;float: left; width: 375px; background-color:${hero.backgroundColor};">`);
    //var $cardbot = $('<div style="color: white;>`);
    //$cardtop.after(cardbot);
    $card.append('<img src=' + hero.img + '>');
    $card.append('<div name="name"   style="color:' + hero.color + ';">' + hero.name + '</div>');
    $card.append('<div name="subtitle" style="font-style: italic;">"' + hero.subtitle + '"</div>');
    $card.append('<div name="real name">Alter<span> </span>ego: ' + hero.first + ' ' + hero.last + '</div>');
    let date =new Date();
    date = hero.firstSeen.toISOString().slice(0, 10);
    $card.append('<div name="date">First apperence: ' + date + '</div>');
    $card.append('<p name="description">' + hero.description + '</p>');
    $card.append(`<button class="edit" type="button" style="position:relative;">Edit</button>`);

    return $card
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function (hero) {
    // TODO: Copy your code from a04 to render the hero edit form
    //var $form=$(`<section id="${hero.id}">`);
    var $formtop = $(`<div  id="${hero.id}" class="column" style="padding:12px;margin:8px;float: left;height: 450px; width: 375px; background-color:${hero.backgroundColor};">`);
    $formtop.append('<img src=' + hero.img + '>');
    //var $formbot=$('<div id="bot" style="background-color: #F8F8FF;>');
    var $content = $('<form class="form"></form>');
    $content.append('Hero Name:<br><input class ="hn" type="text" name="herotname" value="' + hero.name + '"><br>')
    $content.append('First Name:<br><input class = "fn" type="text" name="firstname" value="' + hero.first + '"><br>')
    $content.append('Last Name:<br><input class = "ln" type="text" name="lastname" value="' + hero.last + '"><br>')
    $content.append('Subtitle Name:<br><input class = "sub" type="text" name="subtitle" value="' + hero.subtitle + '"><br>')
    $content.append('Description:<br><textarea class = "des" name="message" style="width:200px;">' + hero.description + '</textarea><br>')
    var date = hero.firstSeen.toISOString().slice(0, 10);
    $content.append(`First Seen:<br><input class="fs" type="date" id="date" name="trip-start"value="${date}"min="1900-01-01" max="2018-12-31"><br>`)
    //+hero.firstSeen.getFullYear()+'-'+hero.firstSeen.getMonth()+'-'+hero.firstSeen.getDate()+
    $content.append('<button class="cancel" type="button">Cancel</button>')
    $content.append('<button class="submit" type="submit">Save</button>')
    //$formbot.append($content);
    //$form.append($formtop);
    $formtop.append($content);

    return $formtop;
};



/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function (event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead
    //event.preventDefault();
    let hero = event.target.parentNode
    $(`#${hero.id}`).replaceWith(renderHeroEditForm(heroicData.find(h => h.id == hero.id)))

};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function (event) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead
    //event.preventDefault();
    let hero = event.target.parentNode.parentNode
    $(`#${hero.id}`).replaceWith(renderHeroCard(heroicData.find(h => h.id == hero.id)))
};



/**
 * Handles the JavaScript event representing a user clicking on the "submit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function (event) {
    // TODO: Render the hero card using the updated field values from the
    //       submitted form and replace the hero's edit form in the DOM with
    //       their updated card instead
    event.preventDefault();
    //get user input
    /*let editform = event.target.parentNode;
    let newHeroName = $(`${editform.hn}`).val();
    let newFirstName = $(`${editform.fn}`).val();
    let newLastName = $(`${editform.ln}`).val();
    let newSubtitle = $(`${editform.sub}`).val();
    let newDescription = $(`${editform.des}`).val();
    let newFirstSeen = new date($(`${editform.fs}`).val());
    //determine which hero should be updated
    let hero =event.target.parentNode.parentNode
    let newhero=heroicData.find(h => h.id == hero.id)*/
    let newHeroName = $('.hn').val();
    let newFirstName = $('.fn').val();
    let newLastName = $('.ln').val();
    let newSubtitle = $('.sub').val();
    let newDescription = $('.des').val();
    let newFirstSeen = new Date($('.fs').val());
    //newFirstSeen.setMinutes(newFirstSeen.getMinutes() + newFirstSeen.getTimezoneOffset())
    //let date = new Date(newFirstSeen.toUTCString())
    //determine which hero should be updated
    let hero = event.target.parentNode.parentNode
    let newhero = heroicData.find(h => h.id == hero.id)
    //update data
    newhero.name = newHeroName;
    newhero.first = newFirstName;
    newhero.last = newLastName;
    newhero.subtitle = newSubtitle;
    newhero.description = newDescription;
    newhero.firstSeen = new Date(newFirstSeen.getTime()+Math.abs(newFirstSeen.getTimezoneOffset()*60000));
    //replace the editform
    $(`#${hero.id}`).replaceWith(renderHeroCard(newhero))
};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function (heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    //       NOTE: Copy your code from a04 for this part

    // TODO: Append the hero cards to the $root element
    //       NOTE: Copy your code from a04 for this part
    for (let i = 0; i < heroes.length; i++) {
        $root.append(renderHeroCard(heroes[i]));

    }

    $root.on('click', ".edit", function (e) {//NOTE that we use event delegation here.
        handleEditButtonPress(e);

        $(".cancel").on('click', function (event) {
            handleCancelButtonPress(event);
        });

        $(".submit").on('click', function (event) {
            handleEditFormSubmit(event);

        });

    });
    /*$root.on('click', ".edit", function (event) {
        handleEditButtonPress(event);
        $root.on("click", ".cancel", handleCancelButtonPress)
        $root.on("click", ".submit", handleEditFormSubmit)
    });*/

    // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
    //       clicking the edit button

    //$root.on("click",".cancel",handleCancelButtonPress);
    //$root.on("submit",".submit",handleEditFormSubmit);

    // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
    //       submitting the form
    /*$(".cancel").on('click', function(event){
        handleCancelButtonPress(event);   
        });

        $(".submit").on('submit', function(event){
        event.preventDefault();
        handleE*/
    // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
    //       clicking the cancel button
    //$root.on("click",".cancel",handleCancelButtonPress(event));

};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function () {
    loadHeroesIntoDOM(heroicData);
});
