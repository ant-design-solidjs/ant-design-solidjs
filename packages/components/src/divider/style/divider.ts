import { cva } from 'class-variance-authority';

export const dividerStyle = cva('p-0 m-0 text-black/88 line-height-normal list-none border-block-1 border-black-1/6', {
    variants: {
        type: {
            horizontal: 'flex clear-both w-full min-w-full my-6 mx-0',
            vertical: '',
        },
        dashed: {
            true: 'border-dashed',
            false: 'border-solid',
        },
        withText: {
            false: '',
            true: 'before:relative before:w-1/2 before:border-solid before:border-transparent',
        },
    },
});

export const innerDividerStyle = cva('inline-block pe font-medium text-base whitespace-nowrap text-center');
