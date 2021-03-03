var mysql       = require('mysql');
var apiToken    = require('api-token');
var pool        = require('../connection');
var funkcije    = require('./funkcije.js');

var korisnik = {


/**
 * @api {post} /korisnikPopis korisnikPopis
 * @apiName korisnikPopis
 * @apiGroup korisnik
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {tinyint} [ko_aktivan] 0 - Ne aktivni, 1 - Aktivni
 * @apiParam {varchar{100}} access_token
* @apiSuccessExample {json} Success:
*{
*    "success": true,
*    "message": "Uspješno",
*    "status": true,
*    "data": [

*        }    
*    ]
*}
*/
//* @apiSampleRequest off
korisnikPopis : function(req, res, next){
    try{
        if(req.body.idkorisnik && req.body.idfirma){
            let aktivan = req.body.ko_aktivan || 0;
            let query = "SELECT idkorisnik, ko_kor_ime, ko_ime, ko_prezime, ko_aktivan, ko_admin, ko_telefon, ko_email, ko_adresa, ko_oib, firma_idfirma, ko_napomena from korisnik where firma_idfirma = ? and ko_aktivan=? order by korisnik.idkorisnik desc";
            let table = [req.body.idfirma, aktivan];  
            query = mysql.format(query,table);
            funkcije.mysql_query(query,function(podaci){
                funkcije.posaljiRes(res, podaci);
            });
        }else{
            funkcije.posaljiRes(res, funkcije.err_data);
        }
    }catch(err){
        funkcije.posaljiRes(res, funkcije.err_unknown(err));
    }
},

/**
 * @api {post} /korisnik korisnik
 * @apiName korisnik
 * @apiGroup korisnik
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {int} idkorisnik2 Onaj koji se uređuje
* @apiParam {varchar{100}} access_token
* @apiSuccessExample {json} Success:
*{
*    "success": true,
*    "message": "Uspješno",
*    "status": true,
*    "data": [
*        {

*        }
*    ]
*}
*/
//* @apiSampleRequest off
korisnik : function(req, res, next){
    try{
        if(req.body.idkorisnik && req.body.idkorisnik2 && req.body.idfirma){
            let query = "SELECT * from korisnik where idkorisnik=?";
            let table = [req.body.idkorisnik2];  
            query = mysql.format(query,table);
            funkcije.mysql_query(query,function(podaci){
                funkcije.posaljiRes(res,podaci);
            });
        }else{
            funkcije.posaljiRes(res,funkcije.err_data);
        }
    }catch(err){
        funkcije.posaljiRes(res,funkcije.err_unknown(err));
    }
},


/**
 * @api {post} /korisnikDodaj korisnikDodaj
 * @apiName korisnikDodaj
 * @apiGroup korisnik
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {varchar{30}} korisnickoime
 * @apiParam {varchar{30}} ime
 * @apiParam {varchar{30}} prezime
* @apiParam {varchar{30}} lozinka
* @apiParam {tinyint} [aktivan] 0 - Ne aktivni, 1 - Aktivni
* @apiParam {tinyint} [admin] 0 , 1 za sada je kod svih postavljeno admin 1 
* @apiParam {varchar{50}} [email]
* @apiParam {varchar{30}} [kontaktosoba]
* @apiParam {varchar{30}} [telefon]
* @apiParam {varchar{200}} [napomena]
* @apiParam {varchar{11}} [oib]
* @apiParam {varchar{50}} [adresa]
* @apiParam {varchar{100}} access_token
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
korisnikDodaj : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.korisnickoime && req.body.ime && req.body.prezime && req.body.lozinka){
            let a = req.body;
            let korisnik = {
                ko_kor_ime: a.korisnickoime,
                ko_ime         :req.body.ime,
                ko_prezime     :req.body.prezime,
                ko_lozinka     :req.body.lozinka,
                ko_aktivan     :req.body.aktivan || 1,
                ko_email       :req.body.email || null,
                ko_admin       :req.body.admin || 1,
                ko_kontakt_osoba    :req.body.kontaktosoba,
                ko_telefon          :req.body.telefon,
                ko_napomena         :req.body.napomena,
                firma_idfirma       :req.body.idfirma,
                ko_oib              :req.body.oib,
                ko_adresa           :req.body.adresa
            };
            let query = "insert into korisnik SET ?";
            let table = [korisnik];  
            query = mysql.format(query,table);
            funkcije.mysql_query(query,function(podaci){
                funkcije.posaljiRes(res,podaci);
            });
        }else{
            funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 502, data:[] });
        }
    }catch(err){
        funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err });
    }

},

/**
 * @api {post} /korisnikUredi korisnikUredi
 * @apiName korisnikUredi
 * @apiGroup korisnik
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {int} idkorisnik2 Onaj koji se uređuje
 * @apiParam {varchar{30}} ime
 * @apiParam {varchar{30}} prezime
* @apiParam {varchar{30}} lozinka
* @apiParam {tinyint} [aktivan] 0 - Ne aktivni, 1 - Aktivni
* @apiParam {tinyint} [admin] 0 , 1 za sada je kod svih postavljeno admin 1 
* @apiParam {varchar{50}} [email]
* @apiParam {varchar{30}} [kontaktosoba]
* @apiParam {varchar{30}} [telefon]
* @apiParam {varchar{200}} [napomena]
* @apiParam {varchar{11}} [oib]
* @apiParam {varchar{50}} [adresa]
* @apiParam {varchar{100}} access_token
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
korisnikUredi : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.idkorisnik2 && req.body.ime && req.body.prezime && req.body.lozinka){
            let korisnik = {
                //ko_kor_ime: req.body.korisnickoime,
                ko_ime              :req.body.ime,
                ko_prezime          :req.body.prezime,
                ko_lozinka          :req.body.lozinka,
                ko_aktivan          :req.body.aktivan || 0,
                ko_email            :req.body.email || null,
                ko_admin            :req.body.admin || 1,
                ko_kontakt_osoba    :req.body.kontaktosoba,
                ko_telefon          :req.body.telefon,
                ko_napomena         :req.body.napomena,
                ko_oib              :req.body.oib,
                ko_adresa           :req.body.adresa
            };
            let query = "UPDATE korisnik SET ? WHERE idkorisnik = ?";
            let table = [korisnik, req.body.idkorisnik2];  
            query = mysql.format(query,table);
            funkcije.mysql_query(query,function(podaci){
                funkcije.posaljiRes(res,podaci);
            });
        }else{
            funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 502, data:[] });
        }
    }catch(err){
        funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err });
    }

},

/**
 * @api {post} /korisnikObrisi korisnikObrisi
 * @apiName korisnikObrisi
 * @apiGroup korisnik
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {int} idkorisnik2
* @apiParam {varchar{100}} access_token
* @apiSuccessExample {json} Success:
*{
*    "success": true,
*    "message": "Uspješno",
*    "status": true,
*    "data": [
*        {

*        }
*    ]
*}
*/
//* @apiSampleRequest off
korisnikObrisi: function (req, res, next) {
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.idkorisnik2){
            let query = "DELETE FROM korisnik where idkorisnik=? firma_idfirma =?";
            let table = [req.body.idkorisnik2, req.body.idfirma];  
            query = mysql.format(query,table);
            funkcije.mysql_query(query,function(podaci){
                funkcije.posaljiRes(res,podaci);
            });
        }else{
            funkcije.posaljiRes(res,funkcije.err_data);
        }
    }catch(err){
        funkcije.posaljiRes(res,funkcije.err_unknown(err));
    }
},

/**
 * @api {post} /korisnikPopisKorime korisnikPopisKorime
 * @apiName korisnikPopisKorime
 * @apiGroup korisnik
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
* @apiParam {varchar{100}} access_token
* @apiSuccessExample {json} Success:
*{
*    "success": true,
*    "message": "Uspješno",
*    "status": true,
*    "data": [
*        {

*        }
*    ]
*}
*/
//* @apiSampleRequest off
korisnikPopisKorime: function (req, res, next) {
    try{
        if(req.body.idfirma && req.body.idkorisnik){
            let query = "SELECT UPPER(ko_kor_ime) as ko_kor_ime, UPPER(ko_email) as ko_email FROM korisnik where firma_idfirma =?";
            let table = [req.body.idfirma];  
            query = mysql.format(query,table);
            funkcije.mysql_query(query,function(podaci){
                funkcije.posaljiRes(res,podaci);
            });
        }else{
            funkcije.posaljiRes(res,funkcije.err_data);
        }
    }catch(err){
        funkcije.posaljiRes(res,funkcije.err_unknown(err));
    }
},



log_prijava_aktivan : function(req, res, next){
    //console.log('/log_prijavakorisnik');
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.korisnickoime){
            log_prijava.prijava('USR',null, req.body.korisnickoime, 1, req, function(rezultat, podaci){
                if(rezultat == true){
                    funkcije.posaljiRes(res,{ success: true, message: 'Uspješan dohvat', status: rezultat, data:podaci });
                }else{
                    funkcije.posaljiRes(res,{ success: false, message: 'Greška konekcije ili baze', status: rezultat, data:podaci });
                }
            });
        }else{
            funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 502, data:[] });
        }
    }catch(err){
        funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err });
    }

},

promijeni_kor_ime : function(req, res, next){
    //console.log('/poslovnicaprovjera');
    function f_promijeni_kor_ime(a, callback){
        if(typeof(a.korime_new) != 'string' || a.length > 30){
            callback(false, 'Nije moguće promijeniti korisničko ime');
        }else{
            let query = "call korisnikPromjeniKorIme(?,?,?,?)";
            let table = [a.idkorisnik, a.idkorisnik2, a.korime_old, a.korime_new];
            query = mysql.format(query, table); 
            funkcije.mysql_query(query,function(podaci){
                callback(podaci.success, podaci.data)
            });
        }

    }

    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.korime_new && req.body.idkorisnik2 && req.body.korime_old){
            f_promijeni_kor_ime(req.body, function(rezultat, podaci){
                if(rezultat == true){
                    funkcije.posaljiRes(res,{ success: true, message: 'Uspješan dohvat', status: rezultat, data:podaci });
                }else{
                    funkcije.posaljiRes(res,{ success: false, message: 'Greška konekcije ili baze', status: rezultat, data:podaci });
                }
            });
        }else{
            funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 502, data:[] });
        }
    }catch(err){
        funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err });
    }

},


promjenalozinke : function(req, res, next){
    //console.log('/poslovnicaprovjera');
    function f_uredi(a, callback){
        let query = "UPDATE korisnik SET ? WHERE idkorisnik = ? and ko_lozinka=?'";
        let table = [korisnik, a.idkorisnik, a.staralozinka];
        query = mysql.format(query, table); 
        funkcije.mysql_query(query,function(podaci){
            if(podaci.data.affectedRows > 0){
                callback(true, podaci.data);
            }else{
                callback(false,podaci.data);
            }
            
        });
    }

    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.novalozinka && req.body.staralozinka){
            f_uredi(req.body, function(rezultat, podaci){
                if(rezultat == true){
                    funkcije.posaljiRes(res,{ success: true, message: 'Uspješan dohvat', status: rezultat, data:podaci });
                }else{
                    funkcije.posaljiRes(res,{ success: false, message: 'Greška konekcije ili baze', status: rezultat, data:podaci });
                }
            });
        }else{
            funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 502, data:[] });
        }
    }catch(err){
        funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err });
    }

}

};


module.exports = korisnik;

