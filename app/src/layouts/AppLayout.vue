<template>
    <div class="relative flex flex-col justify-between h-full">
        <main class="relative w-full h-max p-20 flex flex-col gap-15">
            <slot />
        </main>
        <BottomNav />
    </div>
</template>

<script setup lang="ts">
import BottomNav from '#/components/BottomNav.vue';
</script>
