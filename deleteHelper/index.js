const path = require('path');
const fs = require('fs');

const deleteImage = (images) => {
  if (images.length) {
    images.forEach(item => {
      const imagePath = path.join(__dirname, '../public/images/', item);
      try {
        fs.access(imagePath, err => {
          if (err) {
            console.log(err);
          } else {
            fs.unlink(imagePath, (err) => {
              if (err) throw err;
              console.log(`${item} was deleted`);
            });
          }
        });
      } catch (e) {
        console.log(e);
      }
    });
  }
};

module.exports = deleteImage;
