import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import Logo from "../logo";

const Navbar = () => {
    const [currentTheme, setCurrentTheme] = useState<string>();

    useEffect(() => {
        if (
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            document.documentElement.classList.add("dark");
            setCurrentTheme("dark");
        } else {
            document.documentElement.classList.remove("dark");
            setCurrentTheme("light");
        }
    }, []);

    const changeTheme = () => {
        if (currentTheme === "dark") {
            document.documentElement.classList.remove("dark");
            localStorage.theme = "light";
            setCurrentTheme("light");
        } else {
            document.documentElement.classList.add("dark");
            localStorage.theme = "dark";
            setCurrentTheme("dark");
        }
    };

    return (
        <nav className="fixed inset-x-0 top-0 z-40 border-b bg-white py-2 dark:border-b-zinc-800 dark:bg-black">
            <div className="container flex items-center justify-between">
                <Logo theme={currentTheme} className="h-8" />
                <div className="flex gap-1">
                    <a
                        href="https://github.com/abnvlf/image-to-palette"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid size-12 place-items-center rounded-lg bg-zinc-500/20 transition-all duration-200 hover:bg-zinc-800 hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-zinc-800"
                    >
                        <span className="sr-only">Github</span>
                        <Icon icon="mdi:github" className="text-2xl" />
                    </a>
                    <button
                        onClick={changeTheme}
                        className="grid size-12 place-items-center rounded-lg bg-zinc-500/20 transition-all duration-200 hover:bg-zinc-800 hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-zinc-800"
                    >
                        <span className="sr-only">Switch Mode</span>
                        {currentTheme === "dark" ? (
                            <Icon icon="ph:sun" className="text-2xl" />
                        ) : (
                            <Icon icon="ph:moon" className="text-2xl" />
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
