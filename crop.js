const { Jimp } = require("jimp");

async function main() {
    try {
        const image = await Jimp.read("assets/adaptive-icon.png");

        console.log("Original Dimensions:", image.bitmap.width, "x", image.bitmap.height);

        // Crop parameters: Crop the bottom portion off (approx text area)
        // The image size is 1024x1024. The text is roughly in the bottom 25%.
        // To make it centered, we might want to crop equal amounts from top, left, right, but for the bottom we cut more.
        // Let's just grab the actual green mobile/rickshaw box.
        // Rough estimation from the image:
        // x: 100, y: 100, width: 824, height: 700 (leaves out bottom 224 pixels)

        image.crop({ x: 150, y: 50, w: 724, h: 700 });

        console.log("New Dimensions:", image.bitmap.width, "x", image.bitmap.height);

        // Save over the icons
        await image.write("assets/adaptive-icon.png");
        await image.write("assets/icon.png");

        console.log("Successfully cropped icons");
    } catch (err) {
        console.error("Error cropping image:", err);
    }
}

main();
