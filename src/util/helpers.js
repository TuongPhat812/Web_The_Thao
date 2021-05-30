//const js = require('../resources/js/script.js');





const getSessionUser = (user) => user ? user : undefined
const renderUserName = (user) => getSessionUser(user) ? user.userName : undefined
const renderUserEmail = (user) => getSessionUser(user) ? user.email : undefined
const renderUserSDT = (user) => getSessionUser(user) ? user.sdt : undefined
const renderUserDiaChi = (user) => getSessionUser(user) ? user.diaChi : undefined
const fors = (total) => {
    var pag = ""
    for (var i = 1; i <= total; i++) {
        pag += '<li class="page-item" oncick="page(this)"><a class="page-link" href="/products?page=' + i + '" >' + i + '</a></li>'
    }
    return pag;
    // 
}

const isAdmin = (user) => user.role == 1 ? true : false

const isCategory = (categorys, productGroup) =>{
    
    console.log(categorys.id_nhomsp)
    console.log(productGroup._id)
    return categorys.id_nhomsp == productGroup._id
} 

const sum = (arr) => {
    const sum = 0
    return sum;
}


module.exports = {

    getSessionUser,
    renderUserName,
    renderUserEmail,
    renderUserSDT,
    renderUserDiaChi,
    fors,
    isAdmin,
    isCategory
}