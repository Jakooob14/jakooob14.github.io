"use client";

import {CSSProperties, HTMLAttributes, useId} from "react";

interface SpinningCircleTextProps extends HTMLAttributes<HTMLDivElement> {
    text: string;
    textClassName?: string;
    textStyle?: CSSProperties;
}

export default function SpinningCircleText({ text, className, textClassName, textStyle, ...props }: SpinningCircleTextProps) {
    return (
        <div className={className || 'relative'} {...props}>
            <div className={'w-[250px] h-[250px]'}></div>
            <div className={'absolute inset-0'}>
                <Layer
                    text={text}
                    textClassName={textClassName}
                    textStyle={textStyle}
                    maskHeightPercentage={60}
                />
                <Layer
                    text={text}
                    textClassName={textClassName}
                    textStyle={textStyle}
                    maskYPercentage={60}
                    maskHeightPercentage={40}
                    color={'black'}
                />
            </div>
        </div>
    )
}

interface LayerProps {
    text: string;
    textClassName?: string;
    textStyle?: CSSProperties;
    maskYPercentage?: number;
    maskHeightPercentage?: number;
    color?: string;
}

function Layer({ text, textClassName, textStyle, maskHeightPercentage = 100, maskYPercentage = 0, color = 'white' }: LayerProps) {
    const maskId = useId();

    return (
        <div className={'absolute select-none'}>
            <svg viewBox="0 0 200 200" width="250" height="250" className="font-black">
                <defs>
                    <mask id={maskId} maskUnits="userSpaceOnUse">
                        <rect x="0" y={maskYPercentage * 2} width="200" height={maskHeightPercentage * 2} fill="white" />
                    </mask>

                    <path
                        id="circle-path"
                        d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                        fill="none"
                    />
                </defs>

                <g mask={`url(#${maskId})`}>
                    <text className={textClassName} style={textStyle} fill={color}>
                        <textPath href="#circle-path" startOffset="0%">
                            {text}
                        </textPath>
                    </text>
                    
                    <g transform="translate(100, 100) scale(0.7) translate(-27, -51)">
                        <path
                            d="M27 2V100M52 75L27 100L2 75"
                            stroke={color}
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                        />
                    </g>
                </g>
            </svg>
        </div>
    )
}