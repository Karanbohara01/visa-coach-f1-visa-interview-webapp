'use client';
import { useEffect, useState } from 'react';

export default function LastUpdated() {
    const [time, setTime] = useState('');

    useEffect(() => {
        setTime(new Date().toLocaleTimeString());
    }, []);

    return (
        <div className="text-sm">
            Last updated: {time}
        </div>
    );
}
