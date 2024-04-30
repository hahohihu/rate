"use client";
import { useState } from "react";
import { Modal } from "antd";
import './editor.css';

export function ButtonModal({ className, children, button }: {
    className?: string,
    button: string,
    children: React.ReactNode
}) {
    const [modalOpen, setOpen] = useState(false);
    const openModal = async () => {
        setOpen(true);
    };
    const closeModal = () => setOpen(false);

    return (
        <>
            <button className={className} onClick={openModal}>{button}</button>
            <Modal open={modalOpen} onCancel={closeModal} footer={<></>}>
                {children}
            </Modal>
        </>
    );
}

