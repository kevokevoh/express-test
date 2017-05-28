var express = require('express');
var router = express.Router();

Fence =require('./../model/fence');
Functions = require('./../utils/functions');
Globals = require('./../utils/globals');

/* GET all available fences. */
router.get('/', function(req, res) {
    // Only get first 20 entries
    limit = 20;
    Fence.getFences(limit, (err, fences) => {
		if(err){
			throw err;
		}
		res.json(fences);
    });
});

// GET single entry
router.get('/:_id', function(req, res) {
    Fence.getFenceById(req.params._id, (err, fence) => {
		if(err){
			throw err;
		}
		res.json(fence);
    });
});


// POST to get Geofenced co-ordinates
router.post('/', function(req, res) {
    var fence = req.body;
    // validate latitude and longitude
    // NOTE: Mongo indexes location as [longitude, longitude]
    // PAYLOAD should be in that format
    validationCode = Functions.validateCordinates(fence.location[0], fence.location[1]);
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
    // Since we expect metres we convert to Kms
    var radiusInKms = fence.radius/1000;
	Fence.getCircle(fence.location[0],fence.location[1], radiusInKms, (err, fence) => {
		if(err){
			throw err;
		}
		res.json(fence);
    });
});

// POST to get box around coordinate
router.post('/box', function(req, res) {
    var fence = req.body;
    // validate latitude and longitude
    // NOTE: Mongo indexes location as [longitude, longitude]
    // PAYLOAD should be in that format
    validationCode = Functions.validateCordinates(fence.location[0], fence.location[1]);
    if(validationCode !=0){
        res.statusMessage=Globals.filterArrayOfObjectsById(
            Globals.error_messages, validationCode).error_msg;
        res.status(400);
        return res.end();
    };

    validatelenWidthCode = Functions.validateLenWidth(fence.length, fence.width);
    if(validatelenWidthCode !=0){
        res.statusMessage=Globals.filterArrayOfObjectsById(
            Globals.error_messages, validatelenWidthCode).error_msg;
        res.status(400);
        return res.end();
    }
    
    // We need to calculate what to send to box plot
    var calculatedCordinates = Functions.calculateBoxCordinates(
        fence.location, fence.length, fence.width);
	Fence.getBox(calculatedCordinates[0],calculatedCordinates[1], (err, fence) => {
		if(err){
			throw err;
		}
		res.json(fence);
    });
});

router.post('/polygon', function(req, res) {
    var fence = req.body;
    // validate latitude and longitude
    // NOTE: Mongo indexes location as [longitude, longitude]
    // PAYLOAD should be in that format
    validationCode = Functions.validateCordinates(fence.location[0], fence.location[1]);
    if(validationCode !=0){
        res.statusMessage=Globals.filterArrayOfObjectsById(
            Globals.error_messages, validationCode).error_msg;
        res.status(400);
        return res.end();
    };
    
	Fence.getPolygon(fence.location[0],fence.location[1], (err, fence) => {
		if(err){
			throw err;
		}
		res.json(fence);
    });
});

router.delete('/:_id', function(req, res) {
    var id = req.params._id;
	Fence.removeFence(id, (err, fence) => {
		if(err){
			throw err;
		}
		res.json(fence);
    });
});

module.exports = router;
