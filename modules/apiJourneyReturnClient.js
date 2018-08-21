var axios = require('axios')

/*This method search in the API with 4 arguments. It is used when a client search connection for reservation.*/

module.exports= {
    searchLine(body) {
        return new Promise(function (resolve, reject) {
            var num = 200; // nb of return
            var pre = -1; // show the next connection. When it's 0 the API will show the previous connection than the time the client enter.
            //dd mmmm, yyyy
            //hh:mm
            // Make a request for a user with a given ID'


            axios.get('https://timetable.search.ch/api/route.en.json?from='+body.station[0]+'&to='+body.station[1]+'&num='+num+'&date='+body.dateRes+'&time='+body.timeRes+'&pre='+pre).then((response) => {


                resolve(response.data.connections)
            }).catch(function (error) {
                console.log(error);
            });
        })
    },

    searchLineComp(from, to, date, time){
        return new Promise(function (resolve, reject) {
            var num = 1; // nombre de return
            //dd mmmm, yyyy
            //hh:mm
            // Make a request for a user with a given ID'
            axios.get('https://timetable.search.ch/api/route.en.json?from='+from+'&to='+to+'&num='+num+'&date='+date+'&time='+time).then((response) => {
                resolve(response.data.connections)
            }).catch(function (error) {
                console.log(error);
            });
        })
    }
}