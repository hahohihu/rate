"use client";
import { fetchEntry } from "@/data/entry";
import { fetchThing } from "@/data/thing";
import { CSSProperties, useState } from "react";
import { Entry, Thing } from "@/data/drizzle/schema";
import { StylizedRating, ThingTitle, dmMono } from "../text";
import { Modal } from "antd";
import { addEntry } from "@/data/entry";
import { Label, Slider, SliderThumb, SliderTrack } from "react-aria-components";
import { ratingColor } from "@/lib/utility";
import styles from './style.module.css';

function RatingSlider({ name }: { name: string }) {
    return <Slider minValue={-3} maxValue={3} step={.1} defaultValue={0} className="flex flex-col w-full relative mb-3">
        <Label className="w-full text-color-reach">rating</Label>
        <SliderTrack className="h-7">
            {(state) => {
                let rating = state.state.values[0];
                let fillStyle: CSSProperties = {
                    width: `${100 * Math.abs(rating) / 6}%`
                };
                fillStyle.backgroundColor = ratingColor(rating);
                if (rating >= 0) {
                    fillStyle.left = "50%";
                } else {
                    fillStyle.right = "50%";
                }
                return (<>
                    {/* track */}
                    <div aria-hidden={true} className="absolute h-2 top-[33%] translate-y-[-50%] w-full rounded-full bg-color-bottom" />
                    {/* fill */}
                    <div aria-hidden={true} className="absolute h-2 top-[33%] translate-y-[-50%]" style={fillStyle} />
                    {/* tick marks */}
                    <div aria-hidden={true} className="h-3 w-full absolute top-[33%] flex justify-evenly pointer-events-none">
                        {[-2, -1, 0, 1, 2].map(n => {
                            return <div key={n} className="relative -top-1 h-2 w-0 border-4 border-color-fly">
                                <div className={`absolute w-8 top-2 text-center -left-4 ${dmMono.className}`}>{n}</div>
                            </div>;
                        })}
                    </div>
                    <SliderThumb name={name} className={`h-5 w-5 top-[33%] ${styles.rating_thumb}`}>
                        <StylizedRating className={"w-max absolute top-[120%] -left-[70%] text-xs bg-color-bottom rounded px-1 py-[2px]"} rating={rating} />
                    </SliderThumb>
                </>);
            }}
        </SliderTrack>
    </Slider>;
}

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
        const [thing, entry] = await Promise.all([fetchThing(ctx.thingId), ctx.entryId ? fetchEntry(ctx.entryId) : undefined]);
        setThing(thing);
        setEntry(entry);
        setOpen(true);
    };
    const closeModal = () => setOpen(false);
    const action = addEntry.bind(null, ctx.thingId);

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
                <form action={action} id="entry-form" className="select-none flex flex-col">
                    <RatingSlider name="rating" />
                    <div className="flex flex-col">
                        <label htmlFor="review" className="text-color-reach">review</label>
                        <textarea id="review" name="review" className="bg-color-bottom p-2 min-h-[120px]"></textarea>
                    </div>
                </form>
            </Modal>
        </>
    );
}
