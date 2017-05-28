var express = require('express');
var router = express.Router();

Fence =require('./../model/fence');
Functions = require('./../utils/functions');
Globals = require('./../utils/globals');

/* GET all available fences. */
router.get('/', function(req, res, next) {
    Fence.getFences((err, fences) => {
		if(err){
			throw err;
		}
		res.json(fences);
    });
});

router.get('/:_id', function(req, res, next) {
    Fence.getFenceById(req.params._id, (err, fence) => {
		if(err){
			throw err;
		}
		res.json(fence);
    });
});

router.post('/', function(req, res, next) {
    var fence = req.body;
    // validate latitude and longitude
    validationCode = Functions.validateCordinates(fence.latitude, fence.longitude);
    if(validationCode !=0){
        res.statusMessage=Globals.filterArrayOfObjectsById(
            Globals.error_messages, validationCode).error_msg;
        res.status(400);
        return res.end();
    };
    // validate radius
    validateRadiusCode = Functions.validateRadius(fence.radius);
    if(validateRadiusCode !=0){
        res.statusMessage=Globals.filterArrayOfObjectsById(
            Globals.error_messages, validateRadiusCode).error_msg;
        res.status(400);
        return res.end();
    }
    
	Fence.addFence(fence, (err, fence) => {
		if(err){
			throw err;
		}
		res.json(fence);
        next();
    });

    
    
});

router.put('/:_id', function(req, res, next) {
    var id = req.params._id;
	var fence = req.body;
    // validate latitude and longitude
    validationCode = Functions.validateCordinates(fence.latitude, fence.longitude);
    if(validationCode !=0){
        res.statusMessage=Globals.filterArrayOfObjectsById(
            Globals.error_messages, validationCode).error_msg;
        res.status(400);
        return res.end();
    };
    // validate radius
    validateRadiusCode = Functions.validateRadius(fence.radius);
    if(validateRadiusCode !=0){
        res.statusMessage=Globals.filterArrayOfObjectsById(
            Globals.error_messages, validateRadiusCode).error_msg;
        res.status(400);
        return res.end();
    };
    
    // Get subset from declared cordinates
    fence.arrayCord=Functions.fenceCordinate(fence.latitude, fence.longitude,
                                             fence.radius);
    if(fence.arrayCord.length==0){
        res.statusMessage = Globals.filterArrayOfObjectsById(
            Globals.error_messages, 2).error_msg;
        res.status(204);
        return res.end();
    };

	Fence.updateFence(id, fence, {}, (err, fence) => {
		if(err){
			throw err;
		}
		res.json(fence);
    });
});

router.delete('/:_id', function(req, res, next) {
    var id = req.params._id;
	Fence.removeFence(id, (err, fence) => {
		if(err){
			throw err;
		}
		res.json(fence);
    });
});

module.exports = router;
