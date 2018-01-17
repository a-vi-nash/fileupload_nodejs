const json2csv = require('json2csv'),
      fs = require('fs');


exports.jsonToCsv = (jsondata,filename,callback) =>{
    const csv = json2csv({ data: jsondata});
 
    fs.writeFile(`${global.config.uploadFolder}/${filename}.csv`, csv, function(err) {
    if (err) callback(err,"Error");
    callback(null,"Saved")
    });
}

exports.readJson = (filename)=>{
    return fs.readFileSync(`${global.config.uploadFolder}/${filename}.json`);
}
