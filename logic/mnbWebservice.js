var exports = module.exports;
var parseString = require('xml2js').parseString;

var soap = require("soap");

var url = 'http://www.mnb.hu/arfolyamok.asmx?wsdl';

exports.MnbWebservice = function () {
    function GetChangeRate(valuta) {
        return new Promise(function (success, fail) {
            soap.createClient(url, function (error, client) {
                client.GetCurrentExchangeRates({}, function (err, result) {
                    if (err) {
                        fail(err);
                    } else {
                        parseString(result.GetCurrentExchangeRatesResult, function (err, res) {
                            if (err) {
                                fail(err);
                            }

                            var change = res.MNBCurrentExchangeRates.Day[0].Rate.find(function (item) {
                                if (item.$.curr === valuta) {
                                    return true;
                                }
                            })._;

                            success(change);
                        });
                    }
                });
            });
        });
    }

    this.GetPoundChangeRate = function () {
        return GetChangeRate("GBP");
    };

    this.GetEurChangeRate = function () {
        return GetChangeRate("EUR");
    };
};