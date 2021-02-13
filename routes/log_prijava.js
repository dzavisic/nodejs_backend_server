var mysql       = require('mysql');
var apiToken    = require('api-token');
var pool        = require('../connection');
var requestIp   = require('request-ip');
var funkcije    = require('./funkcije.js');

var log_prijava = {
    prijava: function (app, uuid, login, status, req, callback) {
        let clientIp = null;
        try{
            clientIp = requestIp.getClientIp(req);
        }catch(err){
            console.log(err);
        }
        let podaci = {
            lp_aplikacija        :app || null,
            lp_uredjaj_ur_uuid   :uuid || null,
            lp_login             :login || null,
            lp_login_status      :status || 0,
            lp_ipadresa          :clientIp || null
        };
        let query = "insert into log_prijava set lp_vrijeme_login= CURRENT_TIMESTAMP, ?";
        let table = [podaci];
        query = mysql.format(query, table); 
        funkcije.mysql_query(query,function(podaci){
            callback(podaci.success, podaci.data);
        });
    }
};


module.exports = log_prijava;
