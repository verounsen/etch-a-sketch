// JavaScript
document.addEventListener('DOMContentLoaded', function () {
    const colors = ['black', 'white', 'red', 'blue', 'yellow'];
    const colorPickerContainer = document.getElementById('colorpicker');

    colors.forEach(color => {
        const colorOption = document.createElement('div');
        colorOption.classList.add('color-option');
        colorOption.style.backgroundColor = color;
        colorOption.addEventListener('click', function() {
            activeColor = color;
            color.style.backgroundColor = color+10;
        });
        colorPickerContainer.appendChild(colorOption);
    });


    // Create Grid
    let gridSize = 30;
    const pixelgrid = document.getElementById('pixelgrid');

    for (let i = 0; i < gridSize; i++) {
        const row = document.createElement('div');
        row.classList.add('row');

        // Create Row // PIXEL X GRIDSIZE
        for (let j = 0; j < gridSize; j++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            row.appendChild(pixel);
        }
        // Append Rows // ROW X GRIDSIZE
        pixelgrid.appendChild(row);
    }

    // Drawing
    let isDrawing = false; // Ensure this variable is declared here
    let activeColor = 'black'; // Ensure this variable is declared here

    const pixels = document.querySelectorAll('.pixel');

    pixels.forEach(pixel => {
        pixel.addEventListener('mousedown', function () {
            isDrawing = true;
            this.style.backgroundColor = activeColor;
        });

        pixel.addEventListener('mousemove', function () {
            if (isDrawing) {
                this.style.backgroundColor = activeColor;
            }
        });
    });

    // Stop Drawing
    document.addEventListener('mouseup', function () {
        isDrawing = false;
    });

    // Clear Canvas
    const clearButton = document.getElementById('Clear');
    clearButton.addEventListener('click', function () {
        pixels.forEach(function (pixel) {
            pixel.style.backgroundColor = 'white';
        });
    });
});
