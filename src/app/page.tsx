import { SubmitButton } from "./client";

export interface ResponseData {
    ok?: boolean;
    name?: string;
    fileName?: string;
}

export default async function Page() {
    return (
        <>
        <div className="w-full h-fit flex flex-col gap-y-8 items-center justify-center">
            <div className="w-16 h-8 flex gap-x-4">
                <a
                    href="https://github.com/worldofchami/FootballerChartGenerator"
                    target="_blank"
                >
                    <div className="flex-grow-1 h-full flex justify-center items-center">
                        <img src="/github.png" alt="My GitHub" />
                    </div>
                </a>
                <a
                    href="https://www.linkedin.com/in/tino-chaminuka-803b8622b/"
                    target="_blank"
                >
                    <div className="flex-grow-1 h-full flex justify-center items-center">
                        <img src="/linkedin.png" alt="My LinkedIn" />
                    </div>
                </a>
            </div>
            <h1 className="text-white font-bold text-9xl max-sm:text-6xl max-md:text-8xl">
                Welcome.
            </h1>
            <span className="text-white text-xl">
                Enter a footballer's name:
            </span>
            <form className="w-96 max-md:w-72 h-10 rounded-full glow z-0" id="select_player">
                <input
                    type="text"
                    name="name"
                    className="h-full w-full rounded-full pl-4 text-white absolute bg-transparent z-10"
                />
            </form>
			<SubmitButton form="select_player" />
        </div>
        </>
    );
}
