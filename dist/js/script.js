const colorThief = new ColorThief();
const imagePreview = document.querySelector("#image-preview");
const imageUpload = document.querySelector("#image-upload");

if ("src" in localStorage) {
	imagePreview.src = localStorage.getItem("src");
} else {
	localStorage.setItem("src", "./assets/img/lidya-nada-tXz6g8JYYoI-unsplash.jpg");
	imagePreview.src = localStorage.getItem("src");
}

getAll(imagePreview);

function RGBToHex(r, g, b) {
	r = r.toString(16);
	g = g.toString(16);
	b = b.toString(16);

	if (r.length == 1) r = "0" + r;
	if (g.length == 1) g = "0" + g;
	if (b.length == 1) b = "0" + b;

	return "#" + r + g + b;
}

function getColor() {
	try {
		const color = colorThief.getColor(imagePreview);
		const hexColor = RGBToHex(color[0], color[1], color[2]);
		const dominantColor = document.querySelector("#dominant-color");

		dominantColor.innerHTML = `<div class="shadow-xl shadow-[${hexColor}]/40 h-10 w-10 rounded-full" style="background-color: ${hexColor}; --tw-shadow-color: rgb(${color[0]} ${color[1]} ${color[2]} / 0.4); --tw-shadow: var(--tw-shadow-colored); "></div><span class="font-bold uppercase text-gray-800 dark:text-gray-100">${hexColor}</span>`;
	} catch (e) {
		alert("There was an error when picking the dominant color!! Please re-upload the image!");
		localStorage.setItem("src", "./assets/img/lidya-nada-tXz6g8JYYoI-unsplash.jpg");
		imagePreview.src = localStorage.getItem("src");
		getColor();
		getPalette();
	}
}

function getPalette() {
	try {
		const colors = colorThief.getPalette(imagePreview);

		let allColor = "";

		colors.forEach((color) => {
			const hexColor = RGBToHex(color[0], color[1], color[2]);
			const palette = document.querySelector("#palette");

			allColor += `<div class="flex gap-1 items-center"><div class="shadow-xl shadow-[${hexColor}]/40 h-10 w-10 rounded-full" style="background-color: ${hexColor}; --tw-shadow-color: rgb(${color[0]} ${color[1]} ${color[2]} / 0.4); --tw-shadow: var(--tw-shadow-colored);"></div><span class="font-bold uppercase text-gray-800 dark:text-gray-100">${hexColor}</span></div>`;

			palette.innerHTML = allColor;
		});
	} catch (e) {
		alert("There was an error retrieving the color palette! Please re-upload the image!");
		localStorage.setItem("src", "./assets/img/lidya-nada-tXz6g8JYYoI-unsplash.jpg");
		imagePreview.src = localStorage.getItem("src");
		getColor();
		getPalette();
	}
}

function getAll() {
	if (imagePreview.complete) {
		getColor();
		getPalette();
	} else {
		imagePreview.addEventListener("load", function () {
			getColor();
			getPalette();
		});
	}
}

imageUpload.addEventListener("change", (e) => {
	const oFReader = new FileReader();

	if (e.target.files[0]["type"].split("/")[0] === "image") {
		oFReader.readAsDataURL(e.target.files[0]);

		oFReader.onload = function (oFREvent) {
			const src = oFREvent.target.result;
			imagePreview.src = src;

			localStorage.setItem("src", src);
			getAll();
		};
	} else {
		alert("Looks like what you uploaded is not an image :(");
		imagePreview.src = localStorage.getItem("src");
		getAll();
	}
});

// Dark Mode

const lightMode = document.querySelector("#lightMode");
const darkMode = document.querySelector("#darkMode");

if (
	localStorage.theme === "dark" ||
	(!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
	document.documentElement.classList.add("dark");
	darkMode.classList.add("hidden");
	lightMode.classList.add("block");
} else {
	document.documentElement.classList.remove("dark");
	darkMode.classList.remove("hidden");
	lightMode.classList.add("hidden");
}

darkMode.addEventListener("click", () => {
	localStorage.theme = "dark";
	document.documentElement.classList.add("dark");
	darkMode.classList.add("hidden");
	lightMode.classList.remove("hidden");
});

lightMode.addEventListener("click", () => {
	localStorage.theme = "light";
	document.documentElement.classList.remove("dark");
	darkMode.classList.remove("hidden");
	lightMode.classList.add("hidden");
});
