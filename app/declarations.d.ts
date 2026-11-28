export { };

declare module 'vue-router' {
    interface RouteMeta {
        transition?: 'slide-push' | 'slide-pop';
    }
}
