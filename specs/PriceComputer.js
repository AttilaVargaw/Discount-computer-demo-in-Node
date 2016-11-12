var Basket = require("../logic/basket.js").Basket;
var Prouduct = require("../services/dataBase.js").Prouduct;
var PriceComputer = require("../logic/pricecomputer.js").PriceComputer;

function CreateTestData(number) {
    function CreateRandom(min, max) {
        return Math.floor((Math.random() * max) + min);
    }

    var ret = [];
    var binding = CreateRandom.bind(null, 0, 10);

    for (var i = 0; i < number; ++i) {
        ret.push([
            binding(),
            binding(),
            binding(),
            binding()
        ]);
    }

    return ret;
}

function CreateProducts() {
    return {
        0: new Prouduct(0, "téliszalámi", 2000, false),
        1: new Prouduct(1, "gumikacsa", 3000, false),
        2: new Prouduct(2, "megapack uborka", 2800, true),
        3: new Prouduct(3, "megapack gesztenye", 2000, true),
    };
}

function CreateResultData(testData, products) {
    return testData.map(function (val) {
        var sum = 0;
        sum = val[0] * products[0].price +
            val[1] * products[1].price +
            val[2] * products[2].price +
            val[3] * products[3].price;

        return sum;
    });
}

var ProuductAndCount = function Prouduct(id, name, price, isMega, count) {
    this.name = name;
    this.price = price;
    this.isMega = isMega;
    this.id = id;
    this.count = count;
};

describe("Basket Test", function () {
    var products;
    var basket;
    var results;
    var priceComputer;
    var testData;
    var number = 5;

    beforeAll(function () {
        products = CreateProducts();
        testData = CreateTestData(10);
        results = CreateResultData(testData, products);
    });

    beforeEach(function () {

    });

    function TestFunction(index) {
        basket = new Basket(products, testData[index]);
        priceComputer = new PriceComputer(basket);
        return priceComputer.price();
    }

    it("Price test", function () {
        for (var i = 0; i < number; ++i) {
            var result = TestFunction(i);
            expect(result).toEqual(results[i]);
        }
    });
});