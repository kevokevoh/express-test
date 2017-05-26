var express = require('express');
var router = express.Router();

Fence =require('./../model/fence');

/* GET users listing. */
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
	Fence.addFence(fence, (err, fence) => {
		if(err){
			throw err;
		}
		res.json(fence);
    });
});

router.put('/:_id', function(req, res, next) {
    var id = req.params._id;
	var fence = req.body;
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
