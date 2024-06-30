<template>
  <div id="app">
    <Menubar :model="items" class="app-menubar" />
    <div class="content-wrapper p-4">
      <Card>
        <template #content>
          <router-view />
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { MenuItem } from './types';
import { Routes } from './enums';

const router = useRouter()
const route = useRoute()

const items = ref<MenuItem[]>([
  {
    label: 'Dashboard',
    icon: 'pi pi-fw pi-home',
    command: () => router.push('/'),
  },
  {
    label: 'Challenge 1',
    icon: 'pi pi-fw pi-comment',
    command: () => router.push(`/${Routes.ChallengeOne}`),
  },
  {
    label: 'Challenge 2',
    icon: 'pi pi-fw pi-image',
    command: () => router.push(`/${Routes.ChallengeTwo}`),
  },
  {
    label: 'Challenge 3',
    icon: 'pi pi-fw pi-calendar',
    command: () => router.push(`/${Routes.ChallengeThree}`),
  }
])


const isRouteActive = (routePath: string): boolean => {
  return route.path === routePath
}

const updateActiveState = (): void => {
  items.value.forEach(item => {
    if (item.to) {
      item.class = isRouteActive(item.to) ? 'p-menuitem-active' : ''
    }
  })
}

watch(
  () => route.name,
  () => {
    // Update active state of menu items
    updateActiveState()
  }
)

onMounted(() => {
  // Set initial active state
  updateActiveState()
})
</script>

<style>
@import 'primevue/resources/themes/saga-blue/theme.css';
@import 'primevue/resources/primevue.min.css';
@import 'primeicons/primeicons.css';

body {
  margin: 0;
  padding: 0;
  font-family: var(--font-family);
  background-color: var(--surface-ground);
  color: var(--text-color);
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.app-menubar .p-menuitem-active>.p-menuitem-link {
  background-color: var(--primary-color);
  color: var(--primary-color-text);
}

.app-menubar .p-menuitem-active>.p-menuitem-link .p-menuitem-icon,
.app-menubar .p-menuitem-active>.p-menuitem-link .p-menuitem-text {
  color: var(--primary-color-text);
}
</style>