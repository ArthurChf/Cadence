<template>
    <div class="relative flex flex-col justify-between h-full">
        <main class="relative w-full h-max flex flex-col overflow-y-auto px-10 pb-10 gap-1">
            <slot />
        </main>
        <BottomNav />
    </div>
</template>

<script setup lang="ts">
import BottomNav from '#/components/BottomNav.vue';
</script>
