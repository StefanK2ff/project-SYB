const dateInputDiv = document.getElementById("datePickerDiv")
const dateInputForm = document.getElementById("datePickerForm")
const notAvailableDates = dateInputForm.attributes[6].nodeValue.split(",")

const datepicker2 = new Datepicker(dateInputDiv, {
    autohide: false,
    calendarWeeks: false,
    clearBtn: false,
    dateDelimiter: ",",
    datesDisabled: notAvailableDates,
    disableTouchKeyboard: true,
    format: "yyyy-mm-dd",
    language: 'en',
    maxNumberOfDates: 1,
    minDate: Date.now(),
    orientation: 'auto',
    showOnFocus: true,
    startView: 0,
    todayBtn: true,
    todayBtnMode: 0,
    todayHighlight: true,
});

dateInputDiv.addEventListener("changeDate", function() {
    const selectedDate = document.getElementsByClassName("selected focused")
    dateInputForm.value = new Date(parseInt(selectedDate[0].attributes[1].nodeValue))
})
