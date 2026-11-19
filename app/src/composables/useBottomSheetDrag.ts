import { readonly, ref, type Ref } from 'vue';

/*
 * Offsets are fractions of the sheet height, applied as a translateY:
 * 0 = fully expanded, 1 = completely off screen (dismissed).
 */
const DISMISSED_OFFSET = 1;

/** Only the most recent pointer samples are used to compute the release velocity. */
const VELOCITY_WINDOW_MS = 100;

/** How long a flick keeps travelling after release: a fast swipe skips past nearby detents. */
const MOMENTUM_DURATION_MS = 200;

/** Resistance when pulling above the highest detent (0 = blocked, 1 = no resistance). */
const RUBBER_BAND_FACTOR = 0.2;

/** Below this distance, a press on the grabber is a tap, not a drag. */
const TAP_TOLERANCE_PX = 4;

type PointerSample = {
    y: number;
    time: number;
};

type UseBottomSheetDragOptions = {
    sheet: Readonly<Ref<HTMLElement | null>>;
    /** Offsets the sheet can rest at, sorted from the highest (smallest offset) to the lowest. */
    snapOffsets: readonly number[];
    initialOffset: number;
    onDismiss(): void;
};

function findClosest(values: readonly number[], target: number) {
    return values.reduce((closest, value) => Math.abs(value - target) < Math.abs(closest - target) ? value : closest);
}

export function useBottomSheetDrag({ sheet, snapOffsets, initialOffset, onDismiss }: UseBottomSheetDragOptions) {
    /** Live position, follows the finger while dragging. */
    const offset = ref(initialOffset);
    /** Detent the sheet rests at (or is settling to): only changes when a gesture ends. */
    const restingOffset = ref(initialOffset);
    const isDragging = ref(false);

    let startY = 0;
    let startOffset = 0;
    let sheetHeight = 0;
    let hasMoved = false;
    let samples: PointerSample[] = [];

    function settleTo(to: number) {
        offset.value = to;
        restingOffset.value = to;
    }

    function reset(to: number) {
        settleTo(to);
        isDragging.value = false;
    }

    function onPointerDown(event: PointerEvent) {
        if (!sheet.value || !event.isPrimary) return;

        // Keeps receiving the events even when the finger leaves the grabber
        (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);

        sheetHeight = sheet.value.offsetHeight;
        startY = event.clientY;
        startOffset = offset.value;
        hasMoved = false;
        samples = [{ y: event.clientY, time: event.timeStamp }];
        isDragging.value = true;
    }

    function applyRubberBand(rawOffset: number) {
        const highestOffset = snapOffsets[0] ?? 0;
        if (rawOffset >= highestOffset) return rawOffset;

        return highestOffset - (highestOffset - rawOffset) * RUBBER_BAND_FACTOR;
    }

    function onPointerMove(event: PointerEvent) {
        if (!isDragging.value || !event.isPrimary) return;

        const deltaY = event.clientY - startY;
        if (Math.abs(deltaY) > TAP_TOLERANCE_PX) hasMoved = true;

        offset.value = applyRubberBand(startOffset + deltaY / sheetHeight);

        samples.push({ y: event.clientY, time: event.timeStamp });
        samples = samples.filter((sample) => event.timeStamp - sample.time <= VELOCITY_WINDOW_MS);
    }

    /** Pixels per millisecond, positive when moving down. */
    function computeVelocity() {
        const first = samples[0];
        const last = samples[samples.length - 1];
        if (!first || !last || last.time === first.time) return 0;

        return (last.y - first.y) / (last.time - first.time);
    }

    function onPointerUp() {
        if (!isDragging.value) return;
        isDragging.value = false;

        const projectedOffset = offset.value + computeVelocity() * MOMENTUM_DURATION_MS / sheetHeight;
        const target = findClosest([...snapOffsets, DISMISSED_OFFSET], projectedOffset);

        if (target === DISMISSED_OFFSET) {
            onDismiss();
            return;
        }

        settleTo(target);
    }

    /** Tap or keyboard activation: moves to the next detent, back to the first after the last. */
    function onClick() {
        if (hasMoved) {
            hasMoved = false;
            return;
        }

        const currentIndex = snapOffsets.indexOf(offset.value);
        settleTo(snapOffsets[(currentIndex + 1) % snapOffsets.length] ?? initialOffset);
    }

    return {
        offset: readonly(offset),
        restingOffset: readonly(restingOffset),
        isDragging: readonly(isDragging),
        reset,
        onPointerDown,
        onPointerMove,
        onPointerUp,
        onClick
    };
}
