"use client";
import { fetchEntry } from "@/data/entry";
import { fetchThing } from "@/data/thing";
import { useState } from "react";
import { Entry, Thing } from "@/data/drizzle/schema";
import { ThingTitle } from "../text";
import { Form, Input, Modal } from "antd";
import { addEntry } from "@/data/entry";
import { Label, Slider, SliderOutput, SliderThumb, SliderTrack } from "react-aria-components";
import { ratingColor } from "@/lib/utility";

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
    const [rating, setRating] = useState(0.5);
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
                        <div className='relative w-full my-3' aria-hidden={true}>
                            <Slider minValue={-3} maxValue={3} step={.01} value={rating} onChange={setRating} className="orientation-horizontal:grid orientation-vertical:flex grid-cols-[1fr_auto] flex-col items-center gap-2 orientation-horizontal:w-64">
                                <SliderTrack className="h-6">
                                    {({ state }) => {
                                        let rating = state.getThumbValue(0);
                                        let fillStyle: any = {
                                            width: `${100 * Math.abs(rating) / 6}%`
                                        };
                                        fillStyle["background-color"] = ratingColor(rating);
                                        if (rating >= 0) {
                                            fillStyle.left = "50%";
                                        } else {
                                            fillStyle.right = "50%";
                                        }
                                        return (<>
                                            {/* track */}
                                            <div className="absolute h-2 top-[50%] translate-y-[-50%] w-full rounded-full bg-color-bottom" />
                                            {/* fill */}
                                            <div className="absolute h-2 top-[50%] translate-y-[-50%]" style={fillStyle} />
                                            {/* tick marks */}
                                            <div className="h-3 w-full absolute top-[50%] flex justify-evenly pointer-events-none">
                                                {[-2, -1, 0, 1, 2].map(n => {
                                                    return <div key={n} className="relative -top-1 h-2 w-0 border-4 border-color-fly">
                                                        <div className="absolute w-4 top-2 text-center -left-2">{n}</div>
                                                    </div>;
                                                })}
                                            </div>
                                            <SliderThumb className="h-4 w-4 top-[50%] rounded-full border border-solid border-black bg-white transition dragging:bg-purple-100 outline-none focus-visible:ring-2 ring-black">
                                                {/* <div className="w-8 absolute -top-[150%] -left-1">
                                                    {rating}
                                                </div> */}
                                            </SliderThumb>
                                        </>);
                                    }}
                                </SliderTrack>
                            </Slider>
                        </div>
                        <input className="hidden p-1 bg-color-star w-14 " id="rating-num" name="rating" type="number" step=".01" value={rating} onInput={syncRating} />
                    </div>
                </form>
            </Modal>
        </>
    );
}
