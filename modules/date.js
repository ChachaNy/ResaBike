var models = require('../models');

module.exports= {

    /* -- DATE METHODS --*/

    /* To search in the DB if the date already exist. If not, create a new entry*/
    findOrCreateDate(day, month, year) {
        return new Promise(function (resolve, reject) {
            models.Date.findOrCreate({
                where: {
                    day: day,
                    month: month,
                    year: year
                },
                defaults: {
                    day: day,
                    month: month,
                    year: year
                }
            }).then(function (date) {
                resolve(date)
            })
        })
    }

}