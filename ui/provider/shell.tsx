"use client";

import { css } from "@emotion/css";
import { useState } from "react";

const hiddenChildren = css`
    li:nth-child(n+5) {
        display: none;
    }
`;

export function ProviderShell({ header, expandable, children, id }: { header: React.ReactNode, expandable: boolean, children: React.ReactNode, id?: string }) {
    let [minimized, setMinimized] = useState(expandable);
    return (
        <div className={"relative border-y sm:border w-[100vw] sm:w-[400px]"} id={id}>
            <h1 className="absolute bg-color-bottom px-1 -top-3 left-2">{header}</h1>
            <ul className={`p-5 space-y-3 overflow-hidden ${minimized ? hiddenChildren : ""}`}>
                {children}
            </ul>
            {
                expandable ?
                    <button onClick={() => setMinimized(!minimized)} className="text-center w-full border-t action-link">{minimized ? "expand" : "minimize"}</button>
                    : null
            }
        </div>
    );
}
