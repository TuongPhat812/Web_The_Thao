const fors = (total) => {
    var pag = ""
    for (var i = 1; i <= total; i++) {
        pag += '<li class="page-item" oncick="page(this)"><a class="page-link" href="/products?page=' + i + '" >' + i + '</a></li>'
    }
    return pag;
    // 
}

const isAdmin = (user) => user.role == 1 ? true : false

const isCategory = (categorys, productGroup) => categorys.id_nhomsp == productGroup._id
const isNumbers = (a, b) => a == b
const isgtNumbers = (a, b) => a > b



const sum = (arr) => {
    const sum = 0
    return sum;
}


module.exports = {
    fors,
    isAdmin,
    isCategory,
    isNumbers,
    isgtNumbers,

}