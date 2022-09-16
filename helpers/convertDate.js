function convertDate(date) {
    //YYYY-MM-DD
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    return date = `${year}-${month}-${day}`
}

module.exports = convertDate;