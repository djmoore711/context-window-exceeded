<template>
  <Transition
    name="page"
    mode="out-in"
    appear
    @before-enter="onBeforeEnter"
    @after-enter="onAfterEnter"
    @before-leave="onBeforeLeave"
    @after-leave="onAfterLeave"
  >
    <slot />
  </Transition>
</template>

<script setup lang="ts">
// Optional: Add transition hooks for additional control
const onBeforeEnter = (el: Element) => {
  // Ensure smooth scrolling to top on new page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const onAfterEnter = (el: Element) => {
  // Focus management for accessibility
  const main = el.querySelector('main')
  if (main) {
    main.focus()
  }
}

const onBeforeLeave = (el: Element) => {
  // Add any pre-leave logic
}

const onAfterLeave = (el: Element) => {
  // Cleanup after transition
}
</script>

<style>
/* Page transition styles */
.page-enter-active,
.page-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity;
}

.page-enter-from {
  opacity: 0;
  transform: translate3d(0, 24px, 0);
}

.page-leave-to {
  opacity: 0;
  transform: translate3d(0, -24px, 0);
}

/* Layout transition styles */
.layout-enter-active,
.layout-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

/* Reduce motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active,
  .layout-enter-active,
  .layout-leave-active {
    transition: opacity 0.2s ease;
  }
  
  .page-enter-from,
  .page-leave-to {
    transform: none;
  }
  
  .layout-enter-from,
  .layout-leave-to {
    transform: none;
  }
}

/* Ensure proper z-index layering during transitions */
.v-leave-active {
  position: absolute;
  width: 100%;
}

/* Performance optimizations */
.page-enter-active,
.page-leave-active {
  backface-visibility: hidden;
  perspective: 1000px;
  transform-style: preserve-3d;
}
</style>
