


//const js = require('../resources/js/script.js');





const getSessionUser = (user) => user ? user : undefined
const renderUserName = (user) => getSessionUser(user) ? user.userName : undefined
const renderUserEmail = (user) => getSessionUser(user) ? user.email : undefined
const renderUserSDT = (user) => getSessionUser(user) ? user.sdt : undefined
const renderUserDiaChi = (user) => getSessionUser(user) ? user.diaChi : undefined


const sum = (arr) => {
    

    const sum = 0
    return sum;
}


module.exports = {

    getSessionUser,
    renderUserName,
    renderUserEmail,
    renderUserSDT,
    renderUserDiaChi
}
