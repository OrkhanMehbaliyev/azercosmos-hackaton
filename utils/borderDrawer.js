const axios = require("axios");
const { createCanvas, loadImage } = require("canvas");

async function borderDrawer(imageUrl, predictions) {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(response.data, "binary");
    const base64ImageString = `data:image/jpeg;base64,${imageBuffer.toString(
      "base64"
    )}`;

    const img = await loadImage(base64ImageString);

    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(img, 0, 0);

    predictions.forEach((prediction) => {
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.strokeRect(
        prediction.x - prediction.width / 2,
        prediction.y - prediction.height / 2,
        prediction.width,
        prediction.height
      );
    });

    const editedImageBase64 = canvas.toDataURL("image/png");
    const cleanedBase64String = editedImageBase64.replace(
      /^data:image\/\w+;base64,/,
      ""
    );
    return cleanedBase64String;
  } catch {
    return "";
  }
}

module.exports = borderDrawer;
