const Product = require("../models/Product");
const ProductGroup = require("../models/ProductGroup");
const Category = require("../models/Category");
const User = require("../models/User");
// const { product } = require("./HomeController");


class ProductsController {
    index(req, res, next) {
        const authUser = res.locals.user;
        let id = req.params.id; 
        id = parseInt(id);
        // console.log(id)

        Promise.all([
                Product.find({ _id: id }),
            ])
            .then(([
                products,
            ]) => {
                products = products.map((product) => product.toObject());
                Product.find({ id_danhmuc: products[0].id_danhmuc }).then((a) => {
                    var product_lienquan = a.map((a) => a.toObject());
                    // console.log(product_lienquan);
                    res.render("ProductDetailView", { authUser, products, product_lienquan });
                });
            })
            .catch(next);


    }
    getAllProducts(req, res, next) {
        const authUser = res.locals.user;
        //const page = req.query.page != undefined ? parseInt(req.query.page) : 1;
        const page = parseInt(req.query.page) ?? 1;
        
        const pageSize = 12;
        const soLuongBoQua = (page - 1) * pageSize;
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
                Product.countDocuments({}).then((total) => {
                    var tongSoPage = Math.ceil(total / pageSize);
                    var allproducts = products.map((product) => product.toObject());

                    res.render("AllProductView", { allproducts, tongSoPage, productGroups, categorys, authUser });
                });
            })
            .catch(next)
    }
}
module.exports = new ProductsController();