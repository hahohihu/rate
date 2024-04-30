"use client";
import { fetchEntry } from "@/data/entry";
import { fetchThing } from "@/data/thing";
import { useState } from "react";
import { Entry, Thing } from "@/data/drizzle/schema";
import { ThingTitle } from "../text";
import { Form, Input, Modal } from "antd";
import { addEntry } from "@/data/entry";
import './editor.css';

export function EntryAddButton({ ctx, className, children }: {
    ctx: {
        thingId: number,
        entryId?: number,
    },
    className?: string,
    children: React.ReactNode
}) {
    const [modalOpen, setOpen] = useState(false);
    const [thing, setThing] = useState<Thing | undefined>(undefined);
    const [entry, setEntry] = useState<Entry | undefined>(undefined);
    const openModal = async () => {
        setOpen(true);
        const [thing, entry] = await Promise.all([fetchThing(ctx.thingId), ctx.entryId ? fetchEntry(ctx.entryId) : undefined]);
        setThing(thing);
        setEntry(entry);
    };
    const closeModal = () => setOpen(false);
    const action = addEntry.bind(null, ctx.thingId);

    return (
        <>
            <button className={className} onClick={openModal}>{children}</button>
            <Modal open={modalOpen} onCancel={closeModal} footer={<div>Footer</div>}>
                <div className="flex gap-2 items-end mb-2">
                    <ThingTitle className="text-2xl leading-none" name={thing?.name ?? "<name>"} />
                    <span className="text-color-reach text-sm leading-none">{thing?.prod_year ?? "----"}</span>
                </div>
                <form action={action}>
                    <div className="select-none">
                        <label htmlFor="rating">rating</label>
                        <input className="w-full" id="rating" type="range" min="-3" max="3" step="0.1" defaultValue="0" list="rating-values" />
                        <datalist id="rating-values" className="flex w-full justify-between text-center">
                            {
                                [-3, -2, -1, 0, 1, 2, 3].map(key => (<option key={key} className="w-2 p-0" value={key}>{key}</option>))
                            }
                        </datalist>
                    </div>
                </form>
            </Modal>
        </>
    );
}
