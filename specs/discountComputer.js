var DiscountComputer = require("../logic/discountComputer.js").DiscountComputer;
var Basket = require("../logic/basket.js").Basket;
var Prouduct = require("../services/dataBase.js").Prouduct;

function Products() {
    return {
        0: new Prouduct(0, "téliszalámi", 2000, false),
        1: new Prouduct(1, "gumikacsa", 3000, false),
        2: new Prouduct(2, "megapack uborka", 2800, true),
        3: new Prouduct(3, "megapack gesztenye", 2000, true),
    };
}

function CreateTestData() {
    return [
        [3, 0, 0, 0],
        [0, 3, 0, 0],
        [0, 0, 12, 0],
        [0, 0, 0, 12],
        [3, 0, 0, 12],
        [24, 0, 0, 12]
    ];
}

function CreateResultData() {
    return [
        2000,
        3000,
        6000,
        6000,
        6000,
        16000
    ];
}

describe("Exchanger Test", function () {
    var products;
    var testData;
    var testResult;

    beforeAll(function () {
        products = Products();
        testData = CreateTestData();
        testResult = CreateResultData();
    });

    beforeEach(function () {

    });

    function TestFunction(testData) {
        var basket = new Basket(products, testData);
        var discountComputer = new DiscountComputer(basket);

        return discountComputer.discount();
    }

    it("Price pound test.", function () {
        for (var i = 0; i < testData.length; ++i) {
            var result = TestFunction(testData[i]);
            expect(result).toBe(testResult[i]);
        }
    });
});