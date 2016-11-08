var exports = module.exports = {};

exports.Basket = function (products, counts) {
    var productAndCount = {};

    (function () {
        if (counts) {
            var it;
            for (it in counts) {
                var product = products[it];
                product.count = Number.parseInt(counts[it]);

                productAndCount[it] = product;
            }
        }
    })();

    this.getProuducts = function () {
        return productAndCount;
    };
};