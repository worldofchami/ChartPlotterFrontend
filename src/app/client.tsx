"use client"

import { HTMLProps, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { submit } from "@/utils/actions";

export function SubmitButton({ form, ...props }: { form: string, props?: HTMLProps<HTMLButtonElement> }) {
    const { pending } = useFormStatus();
    const [state, formAction] = useFormState(submit, null);

    const [sent, setSent] = useState(false);

    if(!pending && state && !sent) {
        setSent(true);
    }

    return (
        <>
        <div className="flex flex-col gap-y-4">
            <button
                {...props}
                form={form}
                className="w-28 h-8 rounded-full font-bold mx-auto disabled:opacity-75"
                type="submit"
                formAction={formAction}
                disabled={pending}
            >
                {sent && pending ? "SUBMITTING..." : "SUBMIT"}
            </button>
            {pending && (
                <span className="text-base text-white absolute mx-auto left-0 right-0 bottom-5 text-center">
                    generating...
                </span>
            )}
            {sent && state?.ok && (
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
            {sent && !state?.ok && (
                    <span className="text-base text-white absolute mx-auto left-0 right-0 bottom-5 text-center">
                        No data exists for that player! Try again...
                    </span>
            )}
        </div>
        </>
    )
}