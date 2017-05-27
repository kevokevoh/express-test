module.exports.filterArrayOfObjectsById = (array, value) => {
    var result  = array.filter(function(obj){
        return obj.id == value;} );
    return result? result[0]: null; // or undefined
};

module.exports.error_messages = [
    {id:0,error_msg:'No latitude,longitude and radius errors'},
    {id:1,error_msg:'Kindly enter a valid latitude,longitude.'},
    {id:2,error_msg:'Could not get cordinates around this point.'},
    {id:3,error_msg:'Kindly ensure that you send a valid radius.'}];
