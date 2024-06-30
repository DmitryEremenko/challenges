<script lang="ts" setup>
const props = defineProps(['challenge']);
</script>

<template>
  <Card class="challenge-card">
    <template #header>
      <img
        alt="challenge image"
        src="https://via.placeholder.com/300x100"
        class="challenge-image"
      />
    </template>
    <template #title>
      {{ props.challenge.title }}
    </template>
    <template #subtitle>
      {{ props.challenge.subtitle }}
    </template>
    <template #content>
      <p>{{ props.challenge.description }}</p>
    </template>
  </Card>
</template>
