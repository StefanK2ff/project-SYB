const dateInputDetail = document.getElementById("datePickerDetail")
const notAvailableDates = dateInputDetail.attributes[6].nodeValue.split(",")
console.log(notAvailableDates)

const datepicker2 = new Datepicker(dateInputDetail, {
    autohide: false,
    calendarWeeks: false,
    clearBtn: false,
    dateDelimiter: ",",
    // Array of date strings or a single date string formatted in the given date format.
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