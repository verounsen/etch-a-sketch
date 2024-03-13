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
    let gridDimension = 625;
    let pixelSize = 25;
    if (pixelSize >= 150){pixelSize = 150}else if (pixelSize <= 10) {pixelSize = 10};
    let gridSize = gridDimension / pixelSize;

    
    // Ensure pixel grid has a relative or absolute position
    pixelgrid.style.position = 'relative';

    for (let i = 0; i < gridSize; i++) {
        const row = document.createElement('div');
        row.classList.add('row');

        // Create Row // PIXEL Times GRIDSIZE
        for (let j = 0; j < gridSize; j++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            pixel.style.height = pixelSize + 'px'; // Set height
            pixel.style.width = pixelSize + 'px'; // Set width
            row.appendChild(pixel);
        }
        // Append Rows // ROW Times GRIDSIZE
        pixelgrid.appendChild(row);
    }

    // Clear Canvas
    const clearButton = document.getElementById('clear');
    clearButton.addEventListener('click', function () {
        pixels.forEach(function (pixel) {
            pixel.style.backgroundColor = 'white';
            pixel.style.border = '';
        });
    });

    // Toggle Grid

    let toggleVisible = true;
    //const pixelBorder = "0.5px ridge";
    //  const pixelBorderColor = "grey";


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
                this.style.borderColor = '' // Removes the border color when leaving the pixel
            }
        });
    });

    // Stop Drawing
    document.addEventListener('mouseup', function () {
        isDrawing = false;
    });

    
    // COLORED CURSOR
    document.addEventListener('mousemove', function(e) {
        const cursor = document.querySelector('.cursor');
        cursor.style.backgroundColor = activeColor;
        cursor.style.left = e.pageX - (cursor.offsetWidth / 2) + 'px';
        cursor.style.top = e.pageY - (cursor.offsetHeight / 2) + 'px';
    });  
    });

