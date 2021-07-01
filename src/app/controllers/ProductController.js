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
        const page = parseInt(req.query.page);
        var id_danhmuc = req.query.id_danhmuc;
        if (id_danhmuc == undefined) id_danhmuc = NaN;
        var id_nhomsp = req.query.id_nhomsp;
        if (id_nhomsp == undefined) id_nhomsp = NaN;
        const pageSize = 12;
        const soLuongBoQua = (page - 1) * pageSize;
        Promise.all([
                Product.find({})
                .skip(soLuongBoQua)
                .limit(pageSize),
                Product.find({
                    id_danhmuc: isNaN(id_danhmuc) ? '' : parseInt(id_danhmuc),
                    id_nhomsp: isNaN(id_nhomsp) ? '' : parseInt(id_nhomsp)
                })
                .skip(soLuongBoQua)
                .limit(pageSize),
                Product.find({
                    id_nhomsp: isNaN(id_nhomsp) ? '' : parseInt(id_nhomsp)
                })
                .skip(soLuongBoQua)
                .limit(pageSize),
                ProductGroup.find({}),
                Category.find({}),
            ])
            .then(([
                products,
                productbydanhmucvanhomsp,
                productbynhomsp,
                productGroups,
                categorys
            ]) => {
                productGroups = productGroups.map(productgroup => productgroup.toObject());

                categorys = categorys.map(category => category.toObject());
                if (isNaN(id_danhmuc) & isNaN(id_nhomsp)) {
                    Product.countDocuments({}).then((total) => {
                        var tongSoPage = Math.ceil(total / pageSize);
                        var allproducts;
                        allproducts = products.map((product) => product.toObject());

                        res.render("AllProductView", { allproducts, tongSoPage, productGroups, categorys, authUser });
                    });
                } else if (isNaN(id_danhmuc) & !isNaN(id_nhomsp)) {
                    Product.countDocuments({
                        id_nhomsp: isNaN(id_nhomsp) ? '' : parseInt(id_nhomsp)
                    }).then((total) => {
                        var tongSoPage = Math.ceil(total / pageSize);

                        var allproducts;
                        allproducts = productbynhomsp.map((product) => product.toObject());
                        res.render("AllProductView", { allproducts, tongSoPage, productGroups, categorys, authUser });
                    });
                } else if (!isNaN(id_danhmuc) & !isNaN(id_nhomsp)) {
                    Product.countDocuments({
                        id_nhomsp: isNaN(id_nhomsp) ? '' : parseInt(id_nhomsp),
                        id_danhmuc: isNaN(id_danhmuc) ? '' : parseInt(id_danhmuc),
                    }).then((total) => {
                        var tongSoPage = Math.ceil(total / pageSize);
                        console.log(tongSoPage)
                        var allproducts;
                        allproducts = productbydanhmucvanhomsp.map((product) => product.toObject());
                        res.render("AllProductView", { allproducts, tongSoPage, productGroups, categorys, authUser });
                    });
                }
            })
            .catch(next)
    }
}
module.exports = new ProductsController();