const mongoose = require('mongoose');

const fenceSchema = mongoose.Schema({
	lat:{
		type: String,
		required: false
	},
    long:{
        type: Number,
        required: false
    },
    arrayCord:{
        type:Array,
        required:false
    },
    radius:{
        type: Number,
        required:false
    }
});

const Fence = module.exports = mongoose.model('Fence', fenceSchema);

// Get Fences
module.exports.getFences = (callback, limit) => {
	Fence.find(callback).limit(limit);
};

// Get Single Fence
module.exports.getFenceById = (id, callback) => {
	Fence.findById(id, callback);
};

// Add Fence
module.exports.addFence = (fence, callback) => {
	Fence.create(fence, callback);
};

// Update Fence
module.exports.updateFence = (id, fence, options, callback) => {
	var query = {_id: id};
	var update = {
		lat: fence.lat,
        long: fence.long,
        arrayCord: fence.arrayCord,
        radius: fence.radius
	};
	Fence.findOneAndUpdate(query, update, options, callback);
};

// Delete Fence
module.exports.removeFence = (id, callback) => {
	var query = {_id: id};
	Fence.remove(query, callback);
};
