<template>
    <!-- Every page sits in the same grid cell, so the leaving and entering pages overlap during the transition -->
    <div class="grid h-dvh overflow-hidden *:[grid-area:1/1]">
        <RouterView v-slot="{ Component, route }">
            <Transition :name="route.meta.transition" :css="Boolean(route.meta.transition)">
                <component :is="Component" />
            </Transition>
        </RouterView>
    </div>
</template>
