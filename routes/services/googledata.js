const request = require('request');

function basicdata(access_token) {
  return new Promise(function(resolve, reject) {
    if(!access_token) reject()
    console.log(access_token);
    request.get({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
      json: true,
      'auth': {
        'bearer': access_token
      }
    }, function(err, httpResponse, data) {
      if(!data) reject()
      console.log(data)
      request.get({
        url: 'https://www.googleapis.com/plus/v1/people/' + data.id,
        json: true,
        'auth': {
          'bearer': access_token
        }
      }, function(err, httpResponse, data2) {
        console.log(data2)
        resolve(data2.id)
      });
    });
  });
}

module.exports.data = basicdata;
