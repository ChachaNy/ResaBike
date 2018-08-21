var axios = require('axios')

/*This method search in the API with 4 arguments. It is used when a admin wants to create a new line in a zone.*/

module.exports= {
    searchLine(body) {
        return new Promise(function (resolve, reject) {
            var num = 200; // nb of return
            var time = '14:00'; // default time to have a correct connection (API problem)
            var connectionTable = new Array();
            // Make a request for a user with a given ID'
            axios.get('https://timetable.search.ch/api/route.en.json?from='+body.fromStation+'&to='+body.toStation+'&num='+num+'&time='+time+'&date='+body.dateRes).then((response) => {
                response.data.connections.forEach((connection) =>{
                    if(connectionTable.length==1){
                        resolve(connectionTable);
                    }
                    isok = true;
                    if(connection.legs.length <= 2){
                        connection.legs.forEach((leg) =>{

                            switch(leg.type){
                                case "post":
                                    break;
                                case "bus":
                                    break;
                                case undefined:
                                    break;
                                default :
                                    isok = false;
                                    break;
                            }

                            switch(leg.operator){
                                case "PAG":
                                    break;
                                case "TSD-asdt":
                                    break;
                                case undefined:
                                    break;
                                default:
                                    isok = false;
                                    break;
                            }
                        })
                        if(isok == true){
                            connectionTable.push(connection);
                        }
                    }
                })
                resolve(connectionTable);
            }).catch(function (error) {
                console.log(error);
            });
        })
    }

}