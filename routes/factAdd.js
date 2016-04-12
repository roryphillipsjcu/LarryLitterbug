module.exports = function(server, db, colors){

    function addFact(req, res, next){
        console.log("Add Fact Called");
    }

    server.post('/addFact', addFact);

};