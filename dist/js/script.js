const colorThief = new ColorThief();
const container = document.querySelectorAll('div[data-warna="container"]');
const upload = document.querySelector('[data-warna="upload"]');
const form = document.querySelector('[data-warna="form"]');

getColour("load");

form.addEventListener('submit', (e) => {
   e.preventDefault();

   getColour("submit");

   form.reset();
})

upload.addEventListener('change', () => {
   getColour("upload");
});

function getColour(data) {
   for (let i = 0; i < container.length; i++) {
      const img = container[i].querySelector('img');
      const dominan = container[i].querySelector('[data-warna="dominan"]');
      const dominanHex = container[i].querySelector('[data-warna="dominan-hex"]');
      const palet = container[i].querySelectorAll('[data-warna="palet"]');
      const paletHex = container[i].querySelectorAll('[data-warna="palet-hex"]');
      img.crossOrigin = "Anonymous";

      if (data == "submit") {
         img.setAttribute('src', document.querySelector('[data-warna="input"]').value);

         img.onerror = function (e) {
            img.setAttribute('src', 'assets/img/wQLAGv4_OYs.png');
            alert("Maaf, gambar tidak bisa kami temukan!")
         };
      } else if (data == "upload") {
         const [file] = upload.files
         if (file) {
            img.src = URL.createObjectURL(file)
         }

         img.onerror = function (e) {
            img.setAttribute('src', 'https://abinoval.github.io/image-to-palette/assets/img/wQLAGv4_OYs.png');
            alert("Maaf, sepertinya yang ada upload bukan gambar!")
         };
      }

      if (img.complete) {
         const colour = colorThief.getColor(img);
         const palette = colorThief.getPalette(img);
         dominan.style.background = `rgb(${colour})`;
         dominanHex.innerHTML = RGBToHex(colour[0], colour[1], colour[2]);
         for (let i = 0; i < palette.length; i++) {
            palet[i].style.background = `rgb(${palette[i]})`;
            paletHex[i].innerHTML = RGBToHex(palette[i][0], palette[i][1], palette[i][2]);
         }
      } else {
         img.addEventListener('load', () => {
            const colour = colorThief.getColor(img);
            const palette = colorThief.getPalette(img);
            dominan.style.background = `rgb(${colour})`;
            dominanHex.innerHTML = RGBToHex(colour[0], colour[1], colour[2]);
            for (let i = 0; i < palette.length; i++) {
               palet[i].style.background = `rgb(${palette[i]})`;
               paletHex[i].innerHTML = RGBToHex(palette[i][0], palette[i][1], palette[i][2]);
            }
         });
      }
   }
}

function RGBToHex(r, g, b) {
   r = r.toString(16);
   g = g.toString(16);
   b = b.toString(16);

   if (r.length == 1)
      r = "0" + r;
   if (g.length == 1)
      g = "0" + g;
   if (b.length == 1)
      b = "0" + b;

   return "#" + r + g + b;
}