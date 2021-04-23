const Product = require('../models/Product')

class HomeController {
    // GET /home
    index(req, res, next) {
        
        Product.findOne({_id: 140})
        // .then(function(product){
        //     res.render('HomeView')//{product: product.toObject()})
            
        // })
        .then(product => console.log(product))
        .catch(next)
            //     .then(XoaSP)
            //     .then(XoaUser);
            // redirect
    }


}

module.exports = new HomeController();