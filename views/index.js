var exports = module.exports;

var dataBase = require("./../services/dataBase");
var Basket = require("./../logic/basket").Basket;
var DiscountComputer = require("./../logic/discountComputer").DiscountComputer;
var PriceComputer = require("./../logic/PriceComputer").PriceComputer;
var Exchanger = require("./../logic/exchanger").Exchanger;
var Mnb = require("./../logic/MnbWebservice").MnbWebservice;

exports.Render = function (req, res) {
    var products = dataBase.getProducts();
    var query = req.query;

    var basket = new Basket(products, query);
    var priceComputer = new PriceComputer(basket);
    var discountComputer = new DiscountComputer(basket);

    var data = {
        products: products,
        prices: {
            full: priceComputer.price(),
            discount: discountComputer.discount(),
            discountName: discountComputer.discountType(),
            inEuro: 0,
            inPound: 0
        }
    };

    var payPrice = priceComputer.price() - discountComputer.discount();
    var exchanger = new Exchanger(payPrice, new Mnb());

    Promise.all([
        exchanger.asEuro(),
        exchanger.asPound()
    ]).then(function (result) {
        data.prices.inEuro = result[0];
        data.prices.inPound = result[1];
        res.render("index", data);
    }, function (error) {
        data.prices.inEuro = "Unknown";
        res.render("index", data);
    });
};