document.addEventListener('DOMContentLoaded', function () {

    // COLOR PALETTE
    const colors = ['black', 'white', 'gold', 'orange', 'red', 'DarkViolet', 'DodgerBlue', 'LimeGreen'];
    const colorPickerContainer = document.getElementById('colorpicker');
    
    let activeColor = colors[0]; // Set initial active color to the first color in the array
    let canvasColor = 'white';
    let borderColor = 'grey';
    let borderColorChanged = 'grey';
    let highlightColor = 'white';
    
    let borderThickness = 0.5; 
    let gridIsOn = true;

    // Color Palette Creation
    colors.forEach((color, index) => {
        const colorOption = document.createElement('div');
        colorOption.classList.add('color-option');
        colorOption.style.backgroundColor = color;
        if (index === 0) { // Add white border to the first color option
            colorOption.style.border = "2px solid " + highlightColor;
        }
        colorOption.addEventListener('click', function () {
            activeColor = color;
            changeSelectedColor = true;
              deleteColorSelection();
              if (activeColor == 'white'){highlightColor = 'grey';}else{highlightColor = 'white';}
            colorOption.style.border =  "2px solid "+highlightColor;
        });
        colorPickerContainer.appendChild(colorOption);
    });

    function deleteColorSelection() {
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
// Save to png
document.getElementById('saveCanvas').addEventListener('click', function() {
    //alert("save clicked!");
    html2canvas(document.getElementById('pixelgrid'), {
        scale: 5, // Increase scale for higher resolution (e.g., 2 for double resolution)
        quality: 3, // JPEG quality (0 to 1, 1 being the highest)
        logging: true, // PNG compression level (true for less compression, false for default)
        dpi: 144,

        onrendered: function(canvas) {
            // Convert the Canvas to a data URL
            var imageData = canvas.toDataURL('image/png');

            // Create a link to download the image
            var link = document.createElement('a');
            link.href = imageData;
            link.download = 'paint a pixel.png';
            
            // Append the link to the document and click it to trigger the download
            document.body.appendChild(link);
            link.click();

            // Remove the link from the document
            document.body.removeChild(link);
        }
    });
});



});
