import Color, { Palette } from "color-thief-react";
import defaultPic from "./assets/default.jpg";
import { Icon } from "@iconify/react";
import Navbar from "./components/navbar";
import { toast } from "react-toastify";
import { ChangeEvent, useEffect, useRef, useState } from "react";

function App() {
    const previewRef = useRef<HTMLImageElement>(null);
    const [image, setImage] = useState(defaultPic);

    const copyColour = async (colour: string) => {
        await navigator.clipboard.writeText(colour);
        toast(`Copied ${colour} to clipboard!`);
    };

    const updatePreviewAndLocalStorage = (src: string) => {
        previewRef.current!.src = src;
        setImage(src);
        localStorage.setItem("src", src);
    };

    const changeImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;
        if (!file.type.startsWith("image/"))
            return alert("Looks like what you uploaded is not an image :(");

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function (oFREvent) {
            const src = String(oFREvent.target!.result);
            updatePreviewAndLocalStorage(src);
        };
    };

    useEffect(() => {
        const src = localStorage.getItem("src");
        updatePreviewAndLocalStorage(src ? src : defaultPic);
    }, []);

    return (
        <>
            <Navbar />
            <div className="flex min-h-dvh items-center justify-center py-24">
                <div className="container">
                    <div className="mb-10 space-y-1 border-l-4 border-l-indigo-600 py-2 pl-4 dark:border-l-indigo-400">
                        <h1 className="flex items-center gap-1 font-black text-indigo-600 dark:text-indigo-400">
                            <Icon icon="gridicons:notice" className="text-xl" />
                            Get Palettes from Your Photos!
                        </h1>
                        <p>
                            Explore the vibrant world of color with our
                            innovative tool! Upload your photos and effortlessly
                            extract stunning palettes to bring your creative
                            visions to life.
                        </p>
                    </div>
                    <div className="grid gap-10 lg:grid-cols-2">
                        <div className="space-y-6">
                            <div className="grid gap-2">
                                <label
                                    htmlFor="image"
                                    className="text-xl font-bold text-zinc-800 dark:text-zinc-200"
                                >
                                    Pick a Pic
                                </label>
                                <input
                                    onChange={changeImage}
                                    className="cursor-pointer rounded-xl border px-6 py-4 file:rounded-full file:border-none file:bg-indigo-600 file:px-4 file:py-2 file:text-white dark:border-zinc-800 dark:text-zinc-400 dark:file:bg-indigo-400 dark:file:font-medium dark:file:text-indigo-800"
                                    type="file"
                                    name="image"
                                    id="image"
                                    accept="image/png, image/jpeg"
                                />
                            </div>
                            <img
                                className="w-full rounded-xl"
                                src={image}
                                ref={previewRef}
                                alt="Default picture"
                            />
                        </div>
                        <div className="space-y-2">
                            <Color src={image} format="hex">
                                {({ data }) => (
                                    <>
                                        <h2 className="text-xl font-bold ">
                                            Dominant Colour
                                        </h2>
                                        <button
                                            onClick={() =>
                                                copyColour(data!.toUpperCase())
                                            }
                                            className="grid w-full cursor-copy gap-2"
                                        >
                                            <div
                                                className="h-[4.5rem] w-full rounded-lg"
                                                style={{
                                                    backgroundColor: data,
                                                }}
                                            ></div>
                                            <h4 className="text-center font-black uppercase ">
                                                {data}
                                            </h4>
                                        </button>
                                    </>
                                )}
                            </Color>
                            <Palette src={image} format="hex" colorCount={10}>
                                {({ data }) => (
                                    <>
                                        <h3 className="text-xl font-bold ">
                                            Palette
                                        </h3>
                                        <div className="grid w-full grid-cols-3 gap-2 overflow-hidden sm:grid-cols-5">
                                            {data?.map((colour) => (
                                                <button
                                                    className="grid cursor-copy gap-y-2"
                                                    onClick={() =>
                                                        copyColour(
                                                            colour.toUpperCase(),
                                                        )
                                                    }
                                                    key={colour}
                                                >
                                                    <div
                                                        className="aspect-square rounded-lg"
                                                        style={{
                                                            backgroundColor:
                                                                colour,
                                                        }}
                                                    ></div>
                                                    <h4 className="text-center font-black uppercase ">
                                                        {colour}
                                                    </h4>
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </Palette>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
