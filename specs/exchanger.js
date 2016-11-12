var Exchanger = require("../logic/exchanger.js").Exchanger;

describe("Exchanger Test", function () {
    var exchanger;

    beforeAll(function () {
        var dummyMNBWebservice = {
            GetPoundChangeRate: function () {
                return new Promise(function (res, rej) {
                    res(100);
                });
            },

            GetEurChangeRate: function () {
                return new Promise(function (res, rej) {
                    res(100);
                });
            }
        };

        exchanger = new Exchanger(100, dummyMNBWebservice);
    });

    it("Price pound test.", function (done) {
        exchanger.asPound().then(function (result) {
            expect(result).toEqual(1);
            done();
        }, function () {
            fail();
            done();
        });
    });

    it("Price euro test.", function (done) {
        exchanger.asEuro().then(function (result) {
            expect(result).toEqual(1);
            done();
        }, function () {
            fail();
            done();
        });
    });

});