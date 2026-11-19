<template>
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="isOpen" class="fixed inset-0 touch-none" @click="close()">
                <div
                    class="h-full bg-background/40 will-change-[opacity]"
                    :class="{ [SETTLE_TRANSITION_CLASS]: !isDragging }"
                    :style="{ opacity: backdropOpacity }"
                />
            </div>
        </Transition>
        <Transition name="slide-up">
            <div v-if="isOpen" class="pointer-events-none fixed inset-0">
                <div
                    ref="sheet"
                    class="pointer-events-auto flex flex-col h-full rounded-t-3xl bg-bottom-sheet-bg will-change-[translate]"
                    :class="{ [SETTLE_TRANSITION_CLASS]: !isDragging }"
                    :style="{ translate: `0 ${offset * 100}%` }"
                >
                    <button
                        type="button"
                        class="flex flex-none w-full touch-none items-center justify-center py-5"
                        @pointerdown="onPointerDown"
                        @pointermove="onPointerMove"
                        @pointerup="onPointerUp"
                        @pointercancel="onPointerUp"
                        @click="onClick"
                    >
                        <span class="bg-bottom-sheet-grabber rounded-full w-1/8 h-3" />
                    </button>
                    <div class="flex flex-none items-center justify-between gap-5 px-9">
                        <div>
                            <span class="uppercase text-xs font-medium text-bottom-sheet-fg">
                                <slot name="subtitle" />
                            </span>
                            <h2><slot name="title" /></h2>
                        </div>
                        <button type="button" class="bg-bottom-sheet-close-bg transition-[background-color] focus:bg-bottom-sheet-close-bg-active rounded-full p-5" @click="close()">
                            <BaseIcon name="x" size="sm" />
                        </button>
                    </div>
                    <div class="flex-1 overflow-y-auto px-9 my-5 text-bottom-sheet-fg">
                        <slot name="content" />
                    </div>
                    <!--
                        Takes the place of the part pushed below the screen, so the scroll area ends at the screen edge.
                        Sized from the resting detent (not the live drag) to avoid a layout on every frame.
                    -->
                    <div aria-hidden="true" class="flex-none" :style="{ height: `${restingOffset * 100}%` }" />
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import BaseIcon from '#/components/base/BaseIcon.vue';
import { useBottomSheetDrag } from '#/composables/useBottomSheetDrag';
import { computed, useTemplateRef, watch } from 'vue';

type Detent = 'md' | 'lg';

const props = defineProps<{
    detent: Detent;
}>();

const isOpen = defineModel<boolean>('open', { required: true });

function close() {
    isOpen.value = false;
}

const sheet = useTemplateRef<HTMLElement>('sheet');

const DETENT_OFFSETS: Record<Detent, number> = {
    lg: 0.2,
    md: 0.4
};

/** Animates the sheet and the backdrop back into place after a gesture (disabled while dragging). */
const SETTLE_TRANSITION_CLASS = 'transition-[translate,opacity] duration-(--transition-enter-duration) ease-(--transition-ease)';

const { offset, restingOffset, isDragging, reset, onPointerDown, onPointerMove, onPointerUp, onClick } = useBottomSheetDrag({
    sheet,
    snapOffsets: [DETENT_OFFSETS.lg, DETENT_OFFSETS.md],
    initialOffset: DETENT_OFFSETS[props.detent],
    onDismiss: close
});

/** Fully dimmed at any detent, then fades out as the sheet is dragged below the lowest one. */
const backdropOpacity = computed(() => {
    const progress = (1 - offset.value) / (1 - DETENT_OFFSETS.md);
    return Math.min(Math.max(progress, 0), 1);
});

watch(isOpen, (open) => {
    if (open) {
        reset(DETENT_OFFSETS[props.detent]);
    }
});
</script>
