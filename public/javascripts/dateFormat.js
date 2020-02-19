var dates = document.getElementsByClassName("date")
dates = [...dates]

dates.forEach(date => {
    date.innerHTML = moment(date.innerHTML).format("ddd, DD.MM.YYYY")
});