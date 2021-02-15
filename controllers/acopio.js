'use strict'
var axios = require('axios');

function dataTransaction(req, res){
	/*serviceInit(req, function(data, err) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        }else {
        	var res = data;
        }
    });*/
    console.log(req.body);
    res.status(200).send({ message: true });
}

function serviceInitAcopio(req, next) {
    var map = req.body.map;
    var id = req.body.id;
    var fId = req.body.fId;
    var date = req.body.date;
    var description = req.body.description;
    var type = req.body.type;

    var data;
    var url = 'http://'+host+':'+port.audit+''+path.audit+'';
    axios.post(url, {
        map: map,
        id: id,
        fId: fId,
        date: date,
        description: description,
        type: type
    })
    .then(response => {
        //console.log(response.data);
        data = response.data;
        next(data, null);
    })
    .catch(error => {
        console.log(error);
        next(null, error);
    });
}

module.exports = {
	dataTransaction
};