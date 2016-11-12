exports = module.exports;

var Mnb = require("./MnbWebservice").MnbWebservice;

exports.Exchanger = function (ft, mnbWebservice) {
    var webservice = mnbWebservice;

    this.asEuro = function () {
        return new Promise(function (resolve, reject) {
            var exchangeRate = webservice.GetEurChangeRate().then(
                function (result) {
                    resolve(ft / Number.parseFloat(result));
                },
                function (err) {
                    reject(err);
                });
        });
    };

    this.asPound = function () {
        return new Promise(function (resolve, reject) {
            var exchangeRate = webservice.GetPoundChangeRate().then(
                function (result) {
                    resolve(ft / Number.parseFloat(result));
                },
                function (err) {
                    reject(err);
                });
        });
    };

};