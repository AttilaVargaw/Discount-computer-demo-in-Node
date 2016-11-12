var Basket = require("../logic/basket.js").Basket;
var Prouduct = require("../services/dataBase.js").Prouduct;

var ProuductAndCount = function Prouduct(id, name, price, isMega, count) {
    this.name = name;
    this.price = price;
    this.isMega = isMega;
    this.id = id;
    this.count = count;
};

describe("Basket Test", function () {
    var products;
    var counts;
    var basket;
    var productAndCount;

    beforeAll(function () {
        products = {
            0: new Prouduct(0, "téliszalámi", 2000, false),
            1: new Prouduct(1, "gumikacsa", 3000, false),
            2: new Prouduct(2, "megapack uborka", 2800, true),
            3: new Prouduct(3, "megapack gesztenye", 2000, true),
        };

        counts = {
            0: 10,
            1: 11,
            2: 13,
            3: 8
        };

        productAndCount = {
            0: new ProuductAndCount(0, "téliszalámi", 2000, false, 10),
            1: new ProuductAndCount(1, "gumikacsa", 3000, false, 11),
            2: new ProuductAndCount(2, "megapack uborka", 2800, true, 13),
            3: new ProuductAndCount(3, "megapack gesztenye", 2000, true, 8),
        };

        basket = new Basket(products, counts);
    });

    it("Constructor test", function () {
        expect(basket.getProuducts().toString()).toEqual(productAndCount.toString());
    });
});