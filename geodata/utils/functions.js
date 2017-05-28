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
