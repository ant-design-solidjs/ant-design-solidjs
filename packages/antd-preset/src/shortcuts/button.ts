import type { Shortcut } from '@unocss/core';

export default function (): Shortcut[] {
    return [
        [
            'btn',
            [
                'outline-none',
                'relative',
                'inline-block',
                'whitespace-nowrap',
                'text-center',
                'cursor-pointer',
                'select-none',
                'border-transparent',
                'border-1',
                'line-height-normal',
                'touch-manipulation',
                'transition-all',
                'disabled:pointer-events-none',
                'duration-200',
                'focus-visible:outline-4',
                'focus-visible:outline-primary-3',
            ],
        ],
        [
            'btn-primary',
            'text-white bg-primary-9 active:bg-primary-10 hover:bg-primary-5 shadow shadow-primary-11/10 border-solid disabled:border-gray-2 disabled:shadow-none disabled:text-black/25 disabled:cursor-not-allowed disabled:bg-black/4',
        ],
    ];
}
