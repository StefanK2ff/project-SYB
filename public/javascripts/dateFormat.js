var dates = document.getElementsByClassName("date")
dates = [...dates]

dates.forEach(date => {
    date.innerHTML = moment().format("dddd DD.MM.YYYY")
});