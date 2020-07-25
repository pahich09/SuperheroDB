const path = require('path');
const fs = require('fs');

const deleteImage = images => {
  for (const item of images) {
    const imagePath = path.join(__dirname, '../public/images/', item);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${item} image was deleted`);
      }
    });
  }
};

module.exports = deleteImage;
