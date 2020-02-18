
const dateInput = document.querySelector('input[name="notAvailableDates"]');

const datepicker = new Datepicker(dateInput, {
    autohide: false,
    calendarWeeks: false,
    clearBtn: false,
    dateDelimiter: ",",
    // Array of date strings or a single date string formatted in the given date format.
    datesDisabled: [],
    disableTouchKeyboard: true,
    format: "yyyy-mm-dd",
    language: 'en',
    maxNumberOfDates: 0,
    minDate: Date.now(),
    orientation: 'auto',
    showOnFocus: true,
    startView: 0,
    todayBtn: true,
    todayBtnMode: 0,
    todayHighlight: true,
});
