let requestButton = document.getElementsByName("request");
let filterButton = document.getElementById("submitFilter");

// Set an event listener to each Request button, that will take the date from filter and adds it to the post request
requestButton.forEach(element => {
    element.addEventListener(("click"), function(event) {
        event.preventDefault();
        let dateInDatefilter = document.getElementById("selected-date").value;
        let clickedRequestForm = document.getElementById(event.srcElement.id)
        // Create new HTML Element
        var newInputfield = document.createElement("input");
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

// sets the default day to tomorrow (if not set) or to the last chosen date
function setDefaultDate() {
    var dateField = document.getElementById("selected-date");
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (getUrlParam('bookingStart','X') === "X") dateField.value = tomorrow.toISOString().substr(0, 10)
    else dateField.value = getUrlParam('bookingStart','HELLO')
}

// helper Function to get URL variables in FE
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

// Helper Function to  handle not set URL parameters
function getUrlParam(parameter, defaultvalue){
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1)urlparameter = getUrlVars()[parameter]
    return urlparameter;
}

//sets type-select to last search
function setFilterType() {
    let typeSelect = document.getElementById("type-select");
    if (getUrlParam('type','X') != "X") typeSelect.value = getUrlParam('type','X')
}

// sets minimum value of date picker to today's date
function checkDate () {
    var dateField = document.getElementById("selected-date");
    // Gets today's date
    var todaysDate = new Date();     
    // build dates format
    var year = todaysDate.getFullYear(); 
    var month = ("0" + (todaysDate.getMonth() + 1)).slice(-2); 
    var day = ("0" + todaysDate.getDate()).slice(-2);
    var minDate = (year +"-"+ month +"-"+ day);
    // Set the max date value for the field to be today's date
    dateField.setAttribute('min',minDate);
};

// global Eventlisteners
document.addEventListener("DOMContentLoaded", () => {
    setDefaultDate();
    setFilterType();
    checkDate();
})