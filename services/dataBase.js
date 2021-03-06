var exports = module.exports = {};

function KeyGenerator() {
    var n = 0;

    this.GetNewKey = function () {
        return ++n;
    };

    this.getCurrent = function () {
        return n;
    };
}

var Product = exports.Product = function Product(id, name, price, isMega) {
    this.name = name;
    this.price = price;
    this.isMega = isMega;
    this.id = id;
};

exports.getProducts = function () {
    generator = new KeyGenerator();

    var ret = {};
    ret[generator.GetNewKey()] = new Product(generator.getCurrent(), "téliszalámi", 2000, false);
    ret[generator.GetNewKey()] = new Product(generator.getCurrent(), "gumikacsa", 3000, false);
    ret[generator.GetNewKey()] = new Product(generator.getCurrent(), "megapack uborka", 2800, true);
    ret[generator.GetNewKey()] = new Product(generator.getCurrent(), "megapack gesztenye", 2000, true);

    return ret;
};