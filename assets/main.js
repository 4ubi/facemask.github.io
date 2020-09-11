let width, height;

let trackerFace, webCamInput;

let mask, pennywise;

/**
 *
 */
function preload() {
    mask = loadImage('Access-Control-Allow-Origin: https://pngimg.com/uploads/sloth/sloth_PNG45.png Vary: Origin');
    pennywise = loadImage('Access-Control-Allow-Origin: https://toppng.com/uploads/preview/in-by-randy-mcpherson-on-clowns-of-many-colors-pennywise-the-clown-drawi-11562980497sr6c81k3kp.png Vary: Origin');
}

/**
 *
 */
function setup() {
    const maxWidth = Math.min(windowWidth, windowHeight);
    pixelDensity(1);
    const selImage = createSelect();
    const selectList = ['mask', 'pennywise'];

    height = maxWidth * 0.75;
    width = maxWidth;

    createCanvas(width, height);

    webCamInput = createCapture(VIDEO);
    webCamInput.size(width, height);
    webCamInput.hide();

    selImage.options('Select filter', -1);

    for (let i = 0; i < selectList.length; i++) {
        selImage.options(selectList[i], i);
    }

    selImage.changed(maskFilter);

    trackerFace = new clm.tracker();
    trackerFace.init();
    trackerFace.start(webCamInput.elt);

}

/**
 *
 */
function maskFilter() {
    sel = this.selected();
}

/**
 *
 * @param touchMask
 */
function drawMask(touchMask) {
    const positions = trackerFace.getCurrentPosition();
    definitionConfig(touchMask, positions);

}

/**
 *
 * @param mask
 * @param positions
 */
function definitionConfig(mask, positions)
{
    if (positions !== false) {
        push();

        const wx = Math.abs(positions[13][0] - positions[1][0]) * 1.6;
        const wy = Math.abs(positions[7][1] - Math.min(positions[16][1], positions[20][1])) * 1.6;

        translate(-wx/2, -wy/2);
        image(mask, positions[62][0], positions[62][1], wx, wy);
        pop();
    }
}

/**
 *
 */
function draw() {
    image(webCamInput, 0, 0, width, height);

    switch (sel) {
        case '-1':
            break;
        case '0':
            drawMask(mask);
            break;
        case '1':
            drawMask(pennywise);
            break;
    }
}

function resize()
{
    const maxWidth = Math.min(windowWidth, windowHeight);
    pixelDensity(1);
    height = maxWidth * 0.75;
    width = maxWidth;
    resizeCanvas(width, height);
}