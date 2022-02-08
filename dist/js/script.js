const colorThief = new ColorThief();
const imagePreview = document.querySelector('#image-preview');
const imageUpload = document.querySelector('#image-upload');

if ('src' in localStorage) {
    imagePreview.src = localStorage.getItem('src');
} else {
    localStorage.setItem(
        'src',
        './assets/img/lidya-nada-tXz6g8JYYoI-unsplash.jpg'
    );
    imagePreview.src = localStorage.getItem('src');
}

getAll(imagePreview);

function RGBToHex(r, g, b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;

    return '#' + r + g + b;
}

function getColor() {
    const color = colorThief.getColor(imagePreview);
    const hexColor = RGBToHex(color[0], color[1], color[2]);
    const dominantColor = document.querySelector('#dominant-color');

    dominantColor.innerHTML = `<div class="shadow-xl shadow-[${hexColor}]/40 h-10 w-10 rounded-full" style="background-color: ${hexColor}; --tw-shadow-color: rgb(${color[0]} ${color[1]} ${color[2]} / 0.4); --tw-shadow: var(--tw-shadow-colored); "></div><span class="font-bold uppercase text-gray-800">${hexColor}</span>`;
}

function getPalette() {
    const colors = colorThief.getPalette(imagePreview);

    let allColor = '';

    colors.forEach((color) => {
        const hexColor = RGBToHex(color[0], color[1], color[2]);
        const palette = document.querySelector('#palette');

        allColor += `<div class="flex gap-1 items-center"><div class="shadow-xl shadow-[${hexColor}]/40 h-10 w-10 rounded-full" style="background-color: ${hexColor}; --tw-shadow-color: rgb(${color[0]} ${color[1]} ${color[2]} / 0.4); --tw-shadow: var(--tw-shadow-colored);"></div><span class="font-bold uppercase text-gray-800">${hexColor}</span></div>`;

        palette.innerHTML = allColor;
    });
}

function getAll() {
    if (imagePreview.complete) {
        getColor();
        getPalette();
    } else {
        imagePreview.addEventListener('load', function () {
            getColor();
            getPalette();
        });
    }
}

imageUpload.addEventListener('change', (e) => {
    const oFReader = new FileReader();

    if (e.target.files[0]['type'].split('/')[0] === 'image') {
        oFReader.readAsDataURL(e.target.files[0]);

        oFReader.onload = function (oFREvent) {
            const src = oFREvent.target.result;
            imagePreview.src = src;

            localStorage.setItem('src', src);
        };
    } else {
        alert('Looks like what you uploaded is not an image :(');
        imagePreview.src = localStorage.getItem('src');
    }

    getAll();
});
