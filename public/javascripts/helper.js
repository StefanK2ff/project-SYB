let requestButton = document.getElementsByName("request")
console.log(requestButton)

requestButton.forEach(element => {
    element.addEventListener(("click"), function(event) {
        event.preventDefault();
        let dateInDatefilter = document.getElementById("bookingStart");
        console.log(dateInDatefilter.value);
    });
});

