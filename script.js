document.addEventListener('DOMContentLoaded', function () {
    
    // COLOR PALETTE
    const colors = ['black', 'white', 'gold', 'orange', 'red', 'DarkViolet', 'DodgerBlue', 'LimeGreen'];
    const colorPickerContainer = document.getElementById('colorpicker');
    let activeColor = 'black';

    // Color Palette Creation
    colors.forEach(color => {
        const colorOption = document.createElement('div');
        colorOption.classList.add('color-option');
        colorOption.style.backgroundColor = color;
        colorOption.addEventListener('click', function () {
            activeColor = color;
        });
        colorPickerContainer.appendChild(colorOption);
    });

    // CREATE GRID / CANVAS
    const pixelgrid = document.getElementById('pixelgrid');
    let gridSize = 25;

    // Ensure pixel grid has a relative or absolute position
    pixelgrid.style.position = 'relative';
    generateGrid();

    function generateGrid() {
        for (let i = 0; i < gridSize; i++) {
            const row = document.createElement('div');
            row.classList.add('row');

            // Create Row // PIXEL Times GRIDSIZE
            for (let j = 0; j < gridSize; j++) {
                const pixel = document.createElement('div');
                pixel.classList.add('pixel');
                pixel.classList.add('pixel-size-medium');
                row.appendChild(pixel);
            }
            // Append Rows // ROW Times GRIDSIZE
            pixelgrid.appendChild(row);
        }
    }

    // Clear Canvas
    const clearButton = document.getElementById('clear');
    clearButton.addEventListener('click', function () {
        pixels.forEach(function (pixel) {
            pixel.style.backgroundColor = 'white';
            pixel.style.border = '';
        });
    });

    // Event listener for radio buttons
    const radioButtons = document.querySelectorAll('input[type="radio"][name="gridSize"]');
    radioButtons.forEach(radioButton => {
        radioButton.addEventListener('change', function () {
            if (this.checked) {
                const chosenSize = parseInt(this.value);
                gridSize = chosenSize;
                updateGrid();
            }
        });
    });

    // Function to update grid size
    function updateGrid() {
        const pixels = document.querySelectorAll('.pixel');
        pixels.forEach(pixel => {
            // Remove existing pixel size class
            pixel.classList.remove('pixel-size-small', 'pixel-size-medium', 'pixel-size-big');

            // Add the appropriate pixel size class
            if (gridSize === 10) {
                pixel.classList.add('pixel-size-small');
            } else if (gridSize === 25) {
                pixel.classList.add('pixel-size-medium');
            } else if (gridSize === 50) {
                pixel.classList.add('pixel-size-big');
            }
        });
    }

    // DRAWING
    let isDrawing = false;
    const pixels = document.querySelectorAll('.pixel');

    pixels.forEach(pixel => {
        pixel.addEventListener('mousedown', function () {
            isDrawing = true;
            this.style.backgroundColor = activeColor; // Coloring in a pixel if pixel is clicked
        });

        pixel.addEventListener('mousemove', function () {
            if (isDrawing) {
                this.style.backgroundColor = activeColor; // Color while move the mouse
            }
        });

        pixel.addEventListener('mouseenter', function () {
            if (!isDrawing) {
                this.style.border = '2px dashed';
                this.style.borderColor = activeColor; // Sets the border color when hovering over the pixel
            }
        });

        pixel.addEventListener('mouseleave', function () {
            if (!isDrawing) {
                this.style.border = '';
                this.style.borderColor = ''; // Removes the border color when leaving the pixel
            }
        });
    });

    // Stop Drawing
    document.addEventListener('mouseup', function () {
        isDrawing = false;
    });

    // COLORED CURSOR
    document.addEventListener('mousemove', function (e) {
        const cursor = document.querySelector('.cursor');
        cursor.style.backgroundColor = activeColor;
        cursor.style.left = e.pageX - (cursor.offsetWidth / 2) + 'px';
        cursor.style.top = e.pageY - (cursor.offsetHeight / 2) + 'px';
    });
});
