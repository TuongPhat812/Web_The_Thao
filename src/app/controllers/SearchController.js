const Product = require("../models/Product");
const ProductGroup = require("../models/ProductGroup");
const Category = require("../models/Category");
const User = require("../models/User");
class SearchController{
    index(req,res,next ){
        const authUser = res.locals.user;
        const tensp = req.query.ten_sp;
        var keyword = req.query.ten_sp.toLowerCase();
        //console.log(Product.find({ten_sanpham: new RegExp('^'+tensp+'$', "i")}).exec());
   
        const pageSize = 12;
        const soLuongBoQua = (1 - 1) * pageSize;
        // Promise.all([
        //     Product.find({ten_sanpham: new RegExp('^'+tensp+'$', "i")})
        //         .skip(soLuongBoQua)
        //         .limit(pageSize),
        //         ProductGroup.find({}),
        //         Category.find({}),
        //     ])
        //     .then(([
        //         products,
        //         productGroups,
        //         categorys
        //     ]) => {
        //         productGroups = productGroups.map(productgroup => productgroup.toObject());
        //         categorys = categorys.map(category => category.toObject());
        //         products= products.map(product=>product.toObject());
                
                
        //         res.render('SearchView',{authUser, products, productGroups, categorys})
        //     })
        //     .catch(next)
        
        Promise.all([
            Product.find({})
            .skip(soLuongBoQua)
            .limit(pageSize),
            ProductGroup.find({}),
            Category.find({}),
        ])
        .then(([
            products,
            productGroups,
            categorys
        ]) => {
            productGroups = productGroups.map(productgroup => productgroup.toObject());
            categorys = categorys.map(category => category.toObject());

            if (keyword != '') {
                var cloneProducts = products.filter(elm => {
                    return elm.ten_sanpham.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
            })}

            cloneProducts= cloneProducts.map(product=>product.toObject());
            res.render('SearchView',{authUser, products: cloneProducts, productGroups, categorys})
        })
        .catch(next)

    }
}
module.exports=new SearchController();