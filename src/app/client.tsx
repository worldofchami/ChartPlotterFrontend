"use client"

import { HTMLProps } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { submit } from "@/utils/actions";

export function SubmitButton({ form, ...props }: { form: string, props?: HTMLProps<HTMLButtonElement> }) {
    const { pending } = useFormStatus();
    const [state, formAction] = useFormState(submit, null);

    return (
        <>
        <div className="flex flex-col gap-y-4">
            <button
                {...props}
                form={form}
                disabled={pending}
                className="w-40 h-8 rounded-full font-bold mx-auto flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-75 disabled:bg-transparent"
                type="submit"
                formAction={formAction}
            >
                { pending &&
                    // Source: Flowbite
                    <svg className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                }
                { pending ? "GENERATING..." : "GENERATE" }
            </button>
            {pending && (
                <span className="text-base text-white absolute mx-auto left-0 right-0 bottom-5 text-center">
                    generating...
                </span>
            )}
            {!pending && state?.ok && (
                <>
                <div className="w-full h-fit px-8">
                    <img
                        src={`data:image/png;base64, ${state?.message}`}
                        className="w-full object-cover"
                    />
                </div>
                <div className="w-full h-fit px-8 text-white flex flex-col justify-center">
                    <h1 className="text-2xl font-bold">
                        Stat Explanations:
                    </h1>
                    <br />
                    <span>
                        Stat(#) {"->"} Per 90 percentile score among players
                        in a similar position across Europe's top leagues
                        over the last 365 days.
                    </span>
                    <br />
                    <small>
                        e.g. PC% (95) means the player is in the 95th
                        percentile for pass completion rate per 90.
                    </small>
                    <br />
                    <br />
                    <span className="font-bold italic">
                        Stat Abbreviations:
                    </span>
                    <br />
                    <small>xAG {"->"} Expected Assisted Goals</small>
                    <br />
                    <small>ST {"->"} Shots Total</small>
                    <br />
                    <small>NPx {"->"} Non-Penalty Expected Goals</small>
                    <br />
                    <small>NPG {"->"} Non Penalty Goals</small>
                    <br />
                    <small>PPR {"->"} Progressive Passes Received</small>
                    <br />
                    <small>
                        TAP {"->"} Touches (Opposition Penalty Area)
                    </small>
                    <br />
                    <small>
                        STO {"->"} Touches (Opposition Penalty Area)
                    </small>
                    <br />
                    <small>PC {"->"} Successful Passes</small>
                    <br />
                    <small>PC% {"->"} Pass Completion Rate</small>
                    <br />
                    <small>SCA {"->"} Shot-Creating Actions</small>
                </div>
                </>
            )}
            {!pending && !state?.ok && (
                <span className="text-base text-white absolute mx-auto left-0 right-0 bottom-5 text-center">
                    {state?.message}
                </span>
            )}
        </div>
        </>
    )
}