<template>
    <div class="flex-1 flex flex-col min-h-0">
        <header class="shrink-0 bg-background p-10">
            <slot name="header" />
        </header>
        <main class="flex flex-col flex-1 min-h-0 gap-4 overflow-y-auto p-10 pt-1">
            <slot />
        </main>
    </div>
</template>
