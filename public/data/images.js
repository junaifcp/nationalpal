const ALL_IMAGES={
    homeHeader:"asdfasdf.jpg"
};

const IMAGE_ID="64d8662a7521696a08cc57f5"

function updateImage(key, value) {
    ALL_IMAGES[key] = value;
  }
module.exports={ALL_IMAGES,updateImage,IMAGE_ID }