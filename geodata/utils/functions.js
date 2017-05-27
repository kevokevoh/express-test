var geolib = require('geolib');

// Order array cordinates by  distance from anchor point

var orderCordByDistance = (anchorPoint, cordsArray) => {
    var orderedCords = geolib.orderByDistance(anchorPoint, cordsArray);
    return orderedCords;
};

var anchorInRadOfCord = (anchorPoint, baseCord, radius) => {
    var pointInCircle = geolib.isPointInCircle(anchorPoint, baseCord, radius);
    return pointInCircle;
};

module.exports.validateCordinates = (latitude,longitude) => {
    var lat = parseFloat(latitude);
    var long = parseFloat(longitude);
    // validate longitude
    if (!isNaN(lat,long) && lat <= 90 && lat >= -90 && long <= 180 && long >= -180){
        var error_code = 0;
    }
    else {
        var error_code = 1;
    }
    return error_code;
};

module.exports.validateRadius = (radius) =>{
    var rad = parseInt(radius);
    if (!isNaN(rad)){
        var error_code = 0;
    }
    else{
        error_code = 3;
    }
    return error_code;
};

module.exports.fenceCordinate = (lat, long, radius) => {
    // Can get co-ordinates array from db,json file etc sample array below
    availCords = [{latitude: 52.516272, longitude: 13.377722},
                  {latitude: 51.518, longitude: 7.45425},
                  {latitude: 51.503333, longitude: -0.119722},
                  {latitude: 51.5175, longitude: 7.4678}];
    arrayCord=[];
    
    anchorPoint = {latitude:lat,longitude:long};
    console.log(availCords);
    // Check if anchor point in user provided radius expensive for a huge cords though
    arrayCord=[];
    availCords.forEach((cordinate)=>{
        var status =  anchorInRadOfCord(anchorPoint, cordinate, radius);
        console.log(status);
        if (status == true){
            arrayCord.push(cordinate);
        }
    });
    console.log(arrayCord);
    return arrayCord;
};
