const request = require("request");

const forecast = (latitude, longitude, callback) => {
    // url to the api
    const url = `http://api.weatherstack.com/current?access_key=8f8b574b7617b2c5f93f1b479cd2a0b3&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`;

    request({ url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to the weather service', undefined);
        } else if (response.body.error) {
            callback('Unable to find the location', undefined);
        } else {
            const { temperature, precip} = response.body.current;
            callback(undefined, `It is currently ${temperature} degrees out.There is a ${precip}% chance to rain`);
        }
    });
}

module.exports = forecast;