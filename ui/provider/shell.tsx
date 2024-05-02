"use client";

import { useState } from "react";

export function ProviderShell({ header, expandable, children }: { header: React.ReactNode, expandable: boolean, children: React.ReactNode }) {
    let [minimized, setMinimized] = useState(!expandable);
    return (
        <div className={"relative border"}>
            <h1 className="absolute bg-color-bottom px-1 -top-3 left-2">{header}</h1>
            <ul className={`p-5 space-y-3 overflow-hidden ${minimized ? "max-h-40" : ""}`}>
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
