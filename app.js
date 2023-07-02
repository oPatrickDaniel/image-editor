
const sharp = require('sharp');
const compress_images = require("compress-images");
const fs = require('fs');

let path = process.argv[2];
let width = Number(process.argv[3]);

function resetImageSize(inputPath, outputPath, width, rotate) {

    sharp(inputPath).resize({ width: width })
        .toFile(outputPath, (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Imagem redefinida com sucesso');
                compressingTheImages(outputPath, './compressed/');
            }
        })
    console.log(rotate)
}

function compressingTheImages(inputPath, outputPath) {
    compress_images(inputPath, outputPath, { compress_force: false, statistic: true, autoupdate: true }, false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
        { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
        function (error, completed, statistic) {
            console.log("-------------");
            console.log(error);
            console.log(completed);
            console.log(statistic);
            console.log("-------------");

            clearTemps()
        }
    );
}

function clearTemps() {
    fs.unlink('./temp/output.jpg', function (err) {
        if (err) throw err;
        console.log('arquivo temporário apagado com sucesso');
    });
}

resetImageSize(path, './temp/output.jpg', width);
