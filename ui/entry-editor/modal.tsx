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
    const [rating, setRating] = useState(0);
    function syncRating(e: React.ChangeEvent<HTMLInputElement>) {
        setRating(Number(e.target.value));
    }

    return (
        <>
            <button className={className} onClick={openModal}>{children}</button>
            <Modal open={modalOpen} onCancel={closeModal} footer={
                <div className="mt-5">
                    <input className="rounded px-5 py-2 bg-color-brand hover:bg-color-hover duration-150 text-white font-normal" type="submit" form="entry-form" value="submit" onClick={closeModal} />
                </div>
            }>
                <div className="flex gap-2 items-end mb-2">
                    <ThingTitle className="text-2xl leading-none" name={thing?.name ?? "name"} />
                    <span className="text-color-reach text-sm leading-none">{thing?.prod_year ?? "year"}</span>
                </div>
                <form action={action} id="entry-form" className="select-none">
                    <label htmlFor="rating-num">rating</label>
                    <div className="flex h-full">
                        <div className='relative w-full' aria-hidden={true}>
                            <div className="h-full w-full absolute flex justify-evenly pointer-events-none">
                                <div className="h-1/5 w-0 border-l border-color-fly"></div>
                                <div className="h-1/5 w-0 border-l border-color-fly"></div>
                                <div className="h-1/5 w-0 border-l border-color-fly"></div>
                                <div className="h-1/5 w-0 border-l border-color-fly"></div>
                                <div className="h-1/5 w-0 border-l border-color-fly"></div>
                            </div>
                            <input className="w-full h-full" id="rating-slider" value={rating} onInput={syncRating}
                                type="range" min="-3" max="3" step="0.01" />
                        </div>
                        <input className="p-1 bg-color-star w-14" id="rating-num" name="rating"
                            type="number" step=".01" value={rating} onInput={syncRating} />
                    </div>
                </form>
            </Modal>
        </>
    );
}
