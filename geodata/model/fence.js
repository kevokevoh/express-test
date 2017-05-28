const mongoose = require('mongoose');

const RestaurantsSchema = mongoose.Schema({
	name: {
        type: String,
        required: true
    },
    type: { type: String, "enum": [
            "Point",
            "MultiPoint",
            "LineString",
            "MultiLineString",
            "Polygon",
            "MultiPolygon"
    ]},
    location: {
        coordinates : {type: Array}
    }
});

const neighborhoodsSchema = mongoose.Schema({
	name: {
        type: String,
        required:true
    },
    type: { type: String, "enum": [
            "Point",
            "MultiPoint",
            "LineString",
            "MultiLineString",
            "Polygon",
            "MultiPolygon"
        ] },
    geometry: {
        coordinates : {type: Array}
    }
});

const Fence = module.exports = mongoose.model('Restaurants', RestaurantsSchema);

const Polygons = module.exports = mongoose.model('Neighborhoods', neighborhoodsSchema);

// Get Fences
module.exports.getFences = (limit, callback) => {
	Fence.find(callback).limit(limit);
};

// Get Single Fence
module.exports.getFenceById = (id, callback) => {
	Fence.findById(id, callback);
};

// Geofence a co-ordinate
module.exports.getCircle = (longitude, latitude, radius, callback) => {
    // radius value in kms must convert in view
	Fence.find({
        location:{
            $geoWithin:{
                $centerSphere:[[longitude,latitude],radius/6378.1]
            }
        }
    }, callback);
};

// Get geobox
module.exports.getBox = (bottomLeftCord, topRightCord, callback) => {
    // radius value in kms must convert in view
	Fence.find({
        location:{
            $geoWithin:{
                $box:[bottomLeftCord,topRightCord]
            }
        }
    }, callback);
};

// Get Polygon
module.exports.getPolygon = (longitude, latitude, callback) => {
    // radius value in kms must convert in view
	Polygons.findOne({
        geometry:{
            $geoIntersects:{
                $geometry:{type:"Point",coordinates:[longitude,latitude]}
            }
        }
    }, callback);
};

// Add Fence
module.exports.addFence = (fence, callback) => {
	Fence.create(fence, callback);
};

// Update Fence
module.exports.updateFence = (id, fence, options, callback) => {
	var query = {_id: id};
	var update = {
        location: {type: "Point",coordinates: fence.location},
        name: fence.name
	};
	Fence.findOneAndUpdate(query, update, options, callback);
};

// Delete Fence
module.exports.removeFence = (id, callback) => {
	var query = {_id: id};
	Fence.remove(query, callback);
};
