var mysql       = require('mysql');
var apiToken    = require('api-token');
var pool        = require('../connection');
var funkcije    = require('./funkcije.js');


var tablemanprovjera = {

/*
za uspješnu prijavu potrebno je da postoje korisnik u tablici operater ali također je potrebno da postoji poslovnica za firmu iz koje je operater
*/
    firma: function (a, callback) {  
        if(a.idfirma){
            let query = "SELECT idfirma from firma where idfirma = ? and fi_fiskal = 1";
            let table = [a.idfirma];
            query = mysql.format(query, table);
            funkcije.mysql_queryV2(query, function(podaci){
                callback(podaci.success, podaci.data);
            })
        }else{
            callback(false, 'Niste poslali sve podatke!');
        }

    },

    mobile: function (a, callback) {

        if(a.idfirma && a.uuid){
            let query = "SELECT iduredjaj from uredjaj where firma_idfirma = ? and ur_uuid = ? and ur_aktivan=1";
            let table = [a.idfirma, a.uuid];
            query = mysql.format(query, table);
            funkcije.mysql_queryV2(query, function(podaci){
                callback(podaci.success, podaci.data);
            })
        }else{
            callback(false, 'Niste poslali sve podatke!');
        }
    },

    posaljires: function(res,success,message,status,data){
        //console.log('tip podatka je: '+typeof(data));
        if(data === undefined)data=[];
	    funkcije.posaljiRes(res,{ success:success, status:status, message:message, data:data})
    }
    

};


module.exports = tablemanprovjera;
