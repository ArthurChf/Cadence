<template>
    <svg class="select-none inline-flex shrink-0" :class="[sizeToClass(size)]" stroke-width="2">
        <use :href="`#${iconName}`" />
    </svg>
</template>

<script setup lang="ts">
import spriteContent from '#/assets/icons.svg?raw';
import type { IconName, Size } from '#/types/ui';
import { sizeToClass } from '#/utils/sizeToClass';
import { onMounted } from 'vue';

const { name: iconName } = defineProps<{
    name: IconName;
    size: Size;
}>();

onMounted(() => {
    const injectSprite = (content: string, hotReload?: boolean) => {
        const spriteId = 'svg-sprite';
        const existingSprite = document.getElementById(spriteId);

        if (hotReload && existingSprite) {
            existingSprite.innerHTML = content;
        }

        if (!existingSprite) {
            const div = document.createElement('div');
            div.id = spriteId;
            div.style.display = 'none';
            div.inert = true;
            div.innerHTML = content;
            document.body.appendChild(div);
        }
    };

    injectSprite(spriteContent);

    if (import.meta.hot) {
        import.meta.hot.accept('#/assets/icons.svg?raw', (newModule) => {
            if (newModule) {
                injectSprite(newModule.default, true);
            }
        });
    }
});
</script>
