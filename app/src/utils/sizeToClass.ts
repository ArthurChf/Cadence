import type { Size } from '#/types/ui';

export function sizeToClass(size: Size, widthClass = false) {
    if (widthClass) {
        return {
            '2xs': 'w-2xs',
            xs: 'w-xs',
            sm: 'w-sm',
            md: 'w-md',
            lg: 'w-lg',
            xl: 'w-xl'
        }[size];
    }

    return {
        '2xs': 'size-2xs',
        xs: 'size-xs',
        sm: 'size-sm',
        md: 'size-md',
        lg: 'size-lg',
        xl: 'size-xl'
    }[size];
}
