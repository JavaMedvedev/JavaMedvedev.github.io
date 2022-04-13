console.log("hello dynamic cards JS!");

var cardWrapper;
document.getElementById("create-button").addEventListener("click", createCard);
var deleteButton;
var newCardBody;

function createCard(e) {
    // console.log("userInput.value",userInput.value);
    var userInput = document.getElementById("textarea");
    var text = document.createTextNode(userInput.value); // Create a text node element (reference to the user's input)
    console.log("e.target", e.target);
    console.log("userInput", userInput);

    cardWrapper = document.getElementById("cardWrapper")
    newCardBody = document.createElement("Div"); // create a <div> element node for card's body = var newCardBody
    newCardBody.id = "card-wrap";
    console.log("newCardBody", newCardBody); // outputs the new html elements/nodes for the card includes: div#newCard>p>userInput.valuetextnode^+deleteBtn
    cardWrapper.appendChild(newCardBody); // Append new card body/ outline 

    var para = document.createElement("P"); // Create a <p> element node = var para
    newCardBody.appendChild(para); // Append <p> element to the <div> element:
    // console.log("userInput.value", userInput.value);
    para.appendChild(text); // append <text node> with user's submitted input text   to <p>

    var deleteButton = document.createElement("Button"); // create <button> element node = var deleteButton
    newCardBody.appendChild(deleteButton); //append delete button to the card
    deleteButton.innerHTML = "delete me"; // add text to delete button
    deleteButton.className = "deleteButtonClass";

    console.log("deleteButton", deleteButton)
    newCardBody.addEventListener("click", deleteCard);
};

function deleteCard(e) {
    console.log("e.target, e.currentTarget",e.target, e.currentTarget); // e.currentTarget is where EventListener is attached
    e.currentTarget.remove();
}