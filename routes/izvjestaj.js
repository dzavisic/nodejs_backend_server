var mysql       = require('mysql');
var apiToken    = require('api-token');
var pool        = require('../connection');
var funkcije    = require('./funkcije.js');

var izvjestaj = {
    
/**
 * @api {post} /izvjestaj izvjestaj
 * @apiName izvjestaj
 * @apiGroup izvjestaj
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {varchar{100}} access_token
 * @apiParam {int} mjesec
 * @apiSuccessExample {json} Success:
*{
*    "success": true,
*    "message": "Uspješno",
*    "status": true,
*    "data": [

*    ]
*}
*/
//* @apiSampleRequest off
izvjestaj : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.mjesec){
            let query = "select 1 as  izvjestaj" ;
            let table =  [req.body.idfirme, req.body.mjesec];
            query = mysql.format(query, table); 
            funkcije.mysql_queryV2(query, function(podaci){
                funkcije.posaljiRes(res, podaci);
            });       
        }else{
            funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 502, data:[]});
        }
    }catch(err){
        console.log(err);
        funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err});
    }
}

};


module.exports = izvjestaj;
