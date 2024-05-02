// function getStrAscii(intent) {
//     const index = Math.floor(intent / 32);
//     const ascii = [" ", ".", ",", "-", "~", "+", "=", "@"];
//     return ascii[index];
// }

// async function getImage(dir, scale) {
//     const img = new Image();
//     img.crossOrigin = "Anonymous"; // Needed if the image is hosted on a different domain

//     return new Promise((resolve, reject) => {
//         img.onload = function() {
//             const canvas = document.createElement('canvas');
//             const ctx = canvas.getContext('2d');
//             const { width, height } = img;

//             canvas.width = width;
//             canvas.height = height;

//             ctx.drawImage(img, 0, 0, width, height);

//             const imageData = ctx.getImageData(0, 0, width, height);
//             const pixels = imageData.data;

//             let asciiArt = '';

//             for (let y = 0; y < height; y += scale * 2) {
//                 for (let x = 0; x < width; x += scale) {
//                     const pixelIndex = (y * width + x) * 4;
//                     let intent = 0;
//                     for (let i = 0; i < scale; i++) {
//                         for (let j = 0; j < scale * 2; j++) {
//                             const index = pixelIndex + (i * width + j) * 4;
//                             intent += pixels[index] + pixels[index + 1] + pixels[index + 2];
//                         }
//                     }
//                     intent /= 20 *scale * 2;

//                     if (pixels[pixelIndex + 3] === 0) {
//                         intent = 0;
//                     }

//                     const asciiChar = getStrAscii(intent);
//                     asciiArt += asciiChar;
//                 }
//                 asciiArt += '\n';
//             }

//             // Display image and ASCII art
//             // document.body.appendChild(canvas); // Append canvas to the body

//             const asciiResultElement = document.createElement('pre');
//             asciiResultElement.textContent = asciiArt;
//             document.body.appendChild(asciiResultElement); // Append ASCII art to the body

//             resolve();
//         };

//         img.onerror = function(error) {
//             reject(error);
//         };

//         img.src = dir;
//     });
// }

// async function main() {
//     try {
//         await getImage("example.jpg",3);
//         return undefined;
//     } catch (error) {
//         console.error('Error processing image:', error);
//         throw error; // Rethrow the error to be caught by the caller
//     }
// }

// main().then(() => {
//     console.log('Execution complete.');
// }).catch(error => {
//     console.error('Main function error:', error);
// });


function getStrAscii(intent) {
    const index = Math.floor(intent /32);
    const ascii = [" ", ".", ",", "-", "~", "+","'",'"'];
    if (index >= 0 && index < ascii.length) {
        console.log(ascii[index]);
        return ascii[index];
    } else {
        console.error("Index out of bounds:", index);
        return ""; // Return an empty string or any other desired value
    }
}

async function getImage(dir, scale) {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Needed if the image is hosted on a different domain

    return new Promise((resolve, reject) => {
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const { width, height } = img;

            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(img, 0, 0, width, height);

            const imageData = ctx.getImageData(0, 0, width, height);
            const pixels = imageData.data;

            let asciiArt = '';

            for (let y = 0; y < height; y += scale * 2) {
                for (let x = 0; x < width; x += scale) {
                    const pixelIndex = (y * width + x)*4;
                    let intent = 0;
                    for (let i = 0; i < scale; i++) {
                        for (let j = 0; j < scale * 2; j++) {
                            const index = pixelIndex + (i * width + j) * 4;
                            intent += pixels[index] + pixels[index + 1] + pixels[index + 2];
                        }
                    }
                    intent /= 6 * scale *2;

                    if (pixels[pixelIndex] == 0) {
                        intent = 0;
                    }

                    const asciiChar = getStrAscii(intent);
                    asciiArt += asciiChar;
                }
                asciiArt += '\n';
            }

            resolve(asciiArt); // Resolve with the generated ASCII art
        };

        img.onerror = function(error) {
            reject(error);
        };

        img.src = dir;
    });
}

async function main() {
    try {
        const asciiArt = await getImage("example.jpg", 3);
        if (asciiArt) {
            const asciiResultElement = document.createElement('pre');
            asciiResultElement.textContent = asciiArt;
            document.body.appendChild(asciiResultElement);
        } else {
            console.error('Failed to generate ASCII art.');
        }
    } catch (error) {
        console.error('Error processing image:', error);
    }
}

main();
