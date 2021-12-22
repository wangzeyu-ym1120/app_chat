<template>
  <n-dialog-provider>
    <n-message-provider>
      <slot />
    </n-message-provider>
  </n-dialog-provider>
</template>

<script setup>
import { NMessageProvider, NDialogProvider } from 'naive-ui'
</script>