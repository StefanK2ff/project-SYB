let requestButton = document.getElementsByName("request")
console.log(requestButton)

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

requestButton.removeEventListener("DOMNodeInserted", () => {
    console.log("removed");
    
})