const http = require("http");

/**
 * getJSON:  RESTful GET request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 * @see Source: https://stackoverflow.com/questions/9577611/http-get-request-in-node-js-express
 */
const getJSON = (options, onResult) => {
  let output = "";

  const req = http.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => output += chunk);
    res.on('end', () => {
      const json = JSON.parse(output);
      onResult(res.statusCode, json);
    });
  });

  req.on('error', err => {
    throw err
  });

  req.end();
};

module.exports = getJSON;