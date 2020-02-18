let requestButton = document.getElementsByName("request");
let filterButton = document.getElementById("submitFilter");

requestButton.forEach(element => {
    element.addEventListener(("click"), function(event) {
        event.preventDefault();
        let dateInDatefilter = document.getElementById("bookingStart").value;
        
        let clickedRequestForm = document.getElementById(event.srcElement.id)
       
        // Create new HTML Element
        var newInputfield = document.createElement("input"); //<input type="date" name="bookingStart" id="bookingStart">
        // Put needed html Structure in created input row  
        newInputfield.setAttribute("name", "bookingStart")
        newInputfield.setAttribute("type", "date")
        newInputfield.setAttribute("style", "visibility: hidden")
        newInputfield.value = dateInDatefilter;
        clickedRequestForm.appendChild(newInputfield);
        //add Input field to klicked form - remove EL ?
        clickedRequestForm.submit();
    });
});

function setDefaultDate() {
    var dateField = document.getElementById("selected-date");
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (getUrlParam('bookingStart','X') === "X") dateField.value = tomorrow.toISOString().substr(0, 10)
    else dateField.value = getUrlParam('bookingStart','HELLO')
}

document.addEventListener("DOMContentLoaded", setDefaultDate())

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function getUrlParam(parameter, defaultvalue){
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1){
        urlparameter = getUrlVars()[parameter];
        }
    return urlparameter;
}