module.exports = function(server, db, colors){

    function getFact(req, res, next){
        console.log("GetFact Called");
    }

    server.get('/getFact', getFact);

};