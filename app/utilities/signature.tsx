'use client'

import { useEffect } from 'react';

export default function Signature() {
    useEffect(() => {
        fetch('/sig')
            .then((r) => r.text())
            .then(text  => {
                console.log(text);
            })
    }, []);
    return (<></>)
}