module.exports.validateCordinates = (longitude, latitude) => {
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

module.exports.validateLenWidth = (length, width) =>{
    var len = parseInt(length);
    var wid = parseInt(width);
    if (!isNaN(len,wid)){
        var error_code = 0;
    }
    else{
        error_code = 4;
    }
    return error_code;
};

module.exports.calculateBoxCordinates = (location, length, width) => {
    // Divide length by 1000(metres to km) then by 111 to convert to lat/long and
    // Then divide by 2 since the point is at the center of the box
    adjlengthRad = length/222000;
    adjwidthRad = width/222000;
    // We subtract length from longitude for bottomLeft and viceversa for topright
    bottomLeftCord = [location[0]-adjlengthRad, location[1]-adjwidthRad];
    topRightCord = [location[0]+adjlengthRad, location[1]+adjwidthRad];
    return [bottomLeftCord, topRightCord];
};
