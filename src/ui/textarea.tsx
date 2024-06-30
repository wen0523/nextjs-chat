'use client'

import { useRef, useState } from "react";

export default function Textarea() {
    const myRef = useRef<HTMLTextAreaElement>(null)

    function heightChange() {
        const theTextarea = myRef.current;

        if (theTextarea) {
            if (theTextarea.scrollHeight <= 176) {
                theTextarea.style.height = 32 + 'px';
                theTextarea.style.height = theTextarea.scrollHeight + 'px';
            } else {
                if (theTextarea.clientHeight < 176) {
                    theTextarea.style.height = 176 + 'px';
                }
                theTextarea.scrollTop = theTextarea.scrollHeight;
            }
        }
    }

    return (
        <textarea
            ref={myRef}
            style={{ resize: 'none', outline: 'none', whiteSpace: 'pre-wrap' }}
            className="bg-transparent py-1 h-8 w-full my-1.5 mx-1"
            placeholder="Type your message here..."
            onChange={heightChange}
        >
        </textarea>
    )
}