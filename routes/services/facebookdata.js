const rp = require('request-promise');

function basicdata(access_token) {
  return new Promise(async function(resolve, reject) {

    data= await rp.get({
      url: 'https://graph.facebook.com/me?access_token='+access_token+'&fields=id,name,email',
      json:true,
    })
    photo = await rp.get({
      url: 'https://graph.facebook.com/v3.0/me/picture?access_token='+access_token+'&format=json&redirect=false&type=large',
      json:true,
    })

    if(!data) reject()
    else if(!(data.id)) reject()
    resolve(data.id)

    details={
      usid: data.id
      name: data.name,
      email: data.email,
      photo: photo.data.url,
      provide: 'Facebook'
      token: access_token,
      raw_dat: {data, photo}
    }
    console.log(details);

  })
}

module.exports.data = basicdata;
