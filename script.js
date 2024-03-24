document.addEventListener('DOMContentLoaded', function () {

    // COLOR PALETTE
    const colors = ['black', 'white', 'gold', 'orange', 'red', 'DarkViolet', 'DodgerBlue', 'LimeGreen'];
    const colorPickerContainer = document.getElementById('colorpicker');
    
    let activeColor = 'black';
    let canvasColor = 'white';
    let borderColor = 'grey';
    let borderColorChanged = 'grey';
    let highlightColor = 'white';
    
    let borderThickness = 0.5; 
    let gridIsOn = true;

    // Color Palette Creation
    colors.forEach(color => {
        const colorOption = document.createElement('div');
        colorOption.classList.add('color-option');
        colorOption.style.backgroundColor = color;
        colorOption.addEventListener('click', function () {
            activeColor = color;
            changeSelectedColor = true;
              changeColorSelection();
            colorOption.style.border =  "2px solid "+highlightColor;
        });
        colorPickerContainer.appendChild(colorOption);
    });

    function changeColorSelection() {
        if (changeSelectedColor == true) {
            const colorOptions = document.querySelectorAll('.color-option');
            colorOptions.forEach(option => {
                option.style.border = "none"; // Remove border from all color options
            });
            changeSelectedColor = false;
        }
    }

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
                pixel.style.border = borderThickness + 'px solid ' + borderColor;
                row.appendChild(pixel);
            }
            // Append Rows // ROW Times GRIDSIZE
            pixelgrid.appendChild(row);
        }
    }

    // Clear Canvas
    const clearButton = document.getElementById('clear');
    clearButton.addEventListener('click', function () {
        document.querySelectorAll('.pixel').forEach(function (pixel) {
            pixel.style.backgroundColor = canvasColor;
        });
        borderChange();
    });

    // Toggle Grid Button
    const toggleGridButton = document.getElementById('toggleGrid');
    toggleGridButton.addEventListener('click', function () {
        if (gridIsOn) {
            borderColorChanged = canvasColor;
            gridIsOn = false;
            borderThickness = 0;
        }
        else {
            borderColorChanged = borderColor;
            gridIsOn = true;
            borderThickness = 0.5;
        }
        borderChange();
    });

    // Grid Size Radio Buttons
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

    // Function to Update Grid Size
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
            if (!isDrawing && this.style.backgroundColor !== activeColor) {
                this.style.border = '2px dashed';
                this.style.borderColor = activeColor; // Sets the border color when hovering over the pixel
            }
        });

        pixel.addEventListener('mouseleave', function () {
            if (!isDrawing && this.style.backgroundColor !== activeColor) {
                pixel.style.border = borderThickness + 'px solid ' + borderColorChanged;
                this.style.borderColor = borderColorChanged; // Removes the border color when leaving the pixel
            }
        });
    });

    // Stop Drawing
    document.addEventListener('mouseup', function () {
        isDrawing = false;
        borderChange();
    });

    function borderChange(){
        // Change border of every Pixel
        pixels.forEach(pixel => {
            pixel.style.border = borderThickness + 'px solid ' + borderColorChanged;
            pixel.style.borderColor = borderColorChanged; // Restore default border color
        });
    }

    // NEXT STEP:
    // SAVE BUTTON FUNKTION :)
    // Border rund um die Ausgewählte Farbe

});
