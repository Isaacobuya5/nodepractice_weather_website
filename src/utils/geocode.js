const request = require("request");

const geocode = (address, callback) => {
    // url of the api
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaXNhYWNvYnV5YTUiLCJhIjoiY2tiMG5ha3NyMDJkdTJ4bGMzcXp4OW0wZiJ9.wRMYRzT3RRGQgb5b5ubPrw&limit=1`;
    // make the request
    request({url: url, json: true}, (error, response) => {
        // low-level error
        if (error) {
            // pass error to callback for further actions
            callback('Unable to connect to api', undefined);
        } else if (response.body.features.length === 0) {
            callback('Location not found', undefined);
        } else {
            // everything succesful - pass the data
            const { features } = response.body;
            const { place_name, center } = features[0];
            const longitude = center[0];
            const latitude = center[1];

            callback(undefined, {
                location: place_name,
                latitude,
                longitude
            });
        }
    })
    
}

module.exports = geocode;