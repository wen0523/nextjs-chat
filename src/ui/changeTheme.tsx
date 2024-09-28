import axios from "axios";

export default function ChangeTheme() {
    function changeTheme(e: React.MouseEvent<HTMLInputElement>) {
        const theme = (e.target as HTMLInputElement).value
        sessionStorage.setItem("theme", theme);
        const username = sessionStorage.getItem('username') 
        if (username) {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('theme', theme);
            axios.post('http://127.0.0.1:5000/setBaInfor',formData)
        }else{
            console.log("username is null")
        }
    }

    return (
        <>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="mr-6 rounded-[6px] hover:bg-base-300 h-9 w-16 flex items-center justify-center">
                    <span>主题</span>
                    <svg
                        width="12px"
                        height="12px"
                        className="inline-block ml-2 h-2 w-2 fill-current opacity-60"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 2048 2048">
                        <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                    </svg>
                </div>
                <ul tabIndex={0} className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 mt-2 shadow-2xl">
                    <li>
                        <input
                            onClick={changeTheme}
                            type="radio"
                            name="theme-dropdown"
                            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                            aria-label="Light"
                            value="light" />
                    </li>
                    <li>
                        <input
                            onClick={changeTheme}
                            type="radio"
                            name="theme-dropdown"
                            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                            aria-label="Dark"
                            value="dark" />
                    </li>
                    <li>
                        <input
                            onClick={changeTheme}
                            type="radio"
                            name="theme-dropdown"
                            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                            aria-label="Synthwave"
                            value="synthwave" />
                    </li>
                    <li>
                        <input
                            onClick={changeTheme}
                            type="radio"
                            name="theme-dropdown"
                            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                            aria-label="Retro"
                            value="retro" />
                    </li>
                    <li>
                        <input
                            onClick={changeTheme}
                            type="radio"
                            name="theme-dropdown"
                            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                            aria-label="Cyberpunk"
                            value="cyberpunk" />
                    </li>
                    <li>
                        <input
                            onClick={changeTheme}
                            type="radio"
                            name="theme-dropdown"
                            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                            aria-label="Valentine"
                            value="valentine" />
                    </li>
                    <li>
                        <input
                            onClick={changeTheme}
                            type="radio"
                            name="theme-dropdown"
                            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                            aria-label="Halloween"
                            value="halloween" />
                    </li>
                    <li>
                        <input
                            onClick={changeTheme}
                            type="radio"
                            name="theme-dropdown"
                            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                            aria-label="Aqua"
                            value="aqua" />
                    </li>
                    <li>
                        <input
                            onClick={changeTheme}
                            type="radio"
                            name="theme-dropdown"
                            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                            aria-label="Dracula"
                            value="dracula" />
                    </li>
                    <li>
                        <input
                            onClick={changeTheme}
                            type="radio"
                            name="theme-dropdown"
                            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                            aria-label="Lemonade"
                            value="lemonade" />
                    </li>
                </ul>
            </div>
        </>
    )
}