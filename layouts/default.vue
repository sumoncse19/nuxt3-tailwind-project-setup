<script setup lang="ts"></script>
<template>
  <div>
    <h1>Header</h1>
    <div role="main">
      <slot />
    </div>
    <h2>Footer</h2>
  </div>
</template>

<style>
@import "~/assets/scss/default.scss";
</style>
