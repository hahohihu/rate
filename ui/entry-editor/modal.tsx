"use client";
import { fetchEntry } from "@/data/entry";
import { fetchThing } from "@/data/thing";
import { useState } from "react";
import { Entry, Thing } from "@/data/drizzle/schema";
import { ThingTitle } from "../text";
import { Form, Input, Modal } from "antd";
import { addEntry } from "@/data/entry";

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
                <div className={className}>
                    <div className="flex gap-2 items-end">
                        <ThingTitle className="text-2xl leading-none" name={thing?.name ?? "<name>"} />
                        <span className="text-color-reach text-sm leading-none">{thing?.prod_year ?? "----"}</span>
                    </div>
                    <Form action={action}>
                        <Form.Item>
                            <Input></Input>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
}
