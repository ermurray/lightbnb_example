// curl -H "Authorization: 563492ad6f91700001000001a3c1ea7de2fc443686671f31e18a712f" "https://api.pexels.com/v1/search?query=house&per_page=200" | jsonpp > images.json

const images = require('./images.json');

const urls = images.photos.map(photo => {
  return {
    cover_photo_url: photo.src.original,
    thumbnail_photo_url:  photo.src.medium,
  }
});

exports.urls = urls;