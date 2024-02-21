// JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Colors fixed now, make them choosable later
    let backgroundFillColor = 'white';
    let activeColor = 'black';
    
    let isDrawing = false;

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
    const pixels = document.querySelectorAll('.pixel');

    pixels.forEach(pixel => {
        pixel.addEventListener('mousedown', function () {
            isDrawing = true;
            // Just the first dot here:
            this.style.backgroundColor = activeColor;
            
        });

        // Mousemove instead of mouseover because of better performance handling
        pixel.addEventListener('mousemove', function () {
            if (isDrawing == true) {
                this.style.backgroundColor = activeColor;
            }
        });
    });
    // Stop Drawing
    document.addEventListener('mouseup', function () {
        isDrawing = false;
    });



    // Clear Canvas
    var clearButton = document.getElementById('Clear');
    clearButton.addEventListener('click', function () {
        var pixels = document.querySelectorAll('.pixel');
        pixels.forEach(function (pixel) {
            pixel.style.backgroundColor = backgroundFillColor;
        });
    });

});
