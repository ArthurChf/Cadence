<template>
    <div class="flex flex-col h-dvh">
        <RouterView />
        <BottomNav />
    </div>
</template>

<script setup lang="ts">
import BottomNav from '#/components/BottomNav.vue';
</script>
