var exports = module.exports = {};

exports.PriceComputer = function (basket) {
    var price = 0;

    (function () {
        var products = basket.getProuducts();
        price = Object.keys(products).reduce(function (prev, key) {
            var item = products[key];
            return prev + (item.price * item.count);
        }, 0);

    })();

    this.price = function () {
        return price;
    };
};