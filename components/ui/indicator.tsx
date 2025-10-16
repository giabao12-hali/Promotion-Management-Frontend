'use client'

import React from 'react'

interface IndicatorProps {
    className?: string;
    indicator?: string;
    dot?: string;
}

export default function Indicator({ className, indicator, dot }: IndicatorProps) {
    return (
        <span className={`relative flex size-3 ${className}`}>
            <span className={`${indicator} absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 bg-sky-500`}></span>
            <span className={`${dot} relative inline-flex size-3 rounded-full bg-sky-500`}></span>
        </span>
    )
}
