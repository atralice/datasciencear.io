var express = require('express');
var router = express.Router();
var mailchimp = require('mailchimp-v3');

validateEmail = function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

/* SIGN UP FORM. */
router.post('/suscribe/:email', function(req, res, next) {
	var listId = 'd3afb92133';
	mailchimp.setApiKey("590a54029160e0029b25ded8de0eeb23-us13");
	var result = {};
	if(  !req.params.email ){
		result = {status: 500, message:'Faltan Campos', data: null};
		return res.send(result);
	};

	if(  !validateEmail(req.params.email) ){
		result = {status: 500, message:'No es un email válido', data: null};
		return res.send(result);
	};

	/* ======= ////Agrega Mail a Lista de MAILCHIMP ======= */
	mailchimp.post('lists/'+listId+'/members', {
		status        : 'subscribed',
		email_address : req.params.email
	}).then(function(data){
		result = {status: 200, message:'Estás suscripto a la lista!', data: data};
		res.send(result);
	}).catch(function(error){
		if(error.title === 'Member Exists'){
			result = {status: 400, message:'Tu mail ya se encuentra en nuestra lista.', data: null};
			res.send(result);
		}else{
			result = {status: 500, message:'Error con Mailchimp', data: error};
			res.send(result);
		}
	});

	/* ======= ////Agrega Mail a Lista de MAILCHIMP ======= */


});

module.exports = router;