var exports = module.exports = {};

function NoDiscount() {
    this.getDiscount = function () {
        return 0;
    };

    this.getName = function () {
        return "";
    };
}

function TwoInsteadOfThree(basket) {
    var discount = 0;

    (function constructor() {
        var products = basket.getProuducts();
        for (var it in products) {
            item = products[it];
            if (item.count > 0 && !item.isMega) {
                var count = item.count;
                var three = Math.floor(count / 3.0);

                discount += three * item.price;
            }

        }
    })();

    this.getDiscount = function () {
        return discount;
    };

    this.getName = function () {
        return "2=3";
    };

    return this;
}

function MegaPack(basket) {
    var discount = 0;

    this.getDiscount = function () {
        return discount;
    };

    (function constructor() {
        var products = basket.getProuducts();
        for (var it in products) {
            item = products[it];
            if (item.isMega && item.count > 0) {
                var count = item.count;
                var megapack = Math.floor(count / 12);

                discount += megapack * 6000;
            }
        }
    })();

    this.getName = function () {
        return "MegaPack-6000";
    };

    return this;
}

exports.DiscountComputer = function (basket) {
    var discount = new NoDiscount();

    (function () {
        var discounts = [
            new TwoInsteadOfThree(basket),
            new MegaPack(basket)
        ];

        discount = discounts.reduce(function (prev, curr) {
            if (prev.getDiscount() >= curr.getDiscount()) {
                return prev;
            } else {
                return curr;
            }
        }, discount);
    })();

    this.discount = function () {
        return discount.getDiscount();
    };

    this.discountType = function () {
        return discount.getName();
    };
};