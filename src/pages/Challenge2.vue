<script setup lang="ts">
import { ref, computed } from 'vue'
import { Package } from '../types';
import { ONE_HOUR, PRIVIEW_PLACEHOLDER_URL, WIN_PROBABILITY } from '../constants';
import { PackageType, Severity } from '../enums';

const selectedPackage = ref<Package | null>(null)
const packages: Package[] = [
  { name: 'Prints (4x6)', value: PackageType.Prints, width: 4, height: 6 },
  { name: 'Panoramas (6x12)', value: PackageType.Panoramas, width: 6, height: 12 },
  { name: 'Strips (2x6 x2)', value: PackageType.Strips, width: 2, height: 6 }
]
const result = ref<string>('')
const resultSeverity = ref<Severity>(Severity.Info)
const lastWinTime = ref<Date | null>(null)
const previewImageSrc = ref<string>(PRIVIEW_PLACEHOLDER_URL)

const previewOverlayText = computed<string>(() => {
  if (!selectedPackage.value) return 'Select a package'
  return `${selectedPackage.value.width}" x ${selectedPackage.value.height}"`
})

const selectPackage = (pkg: Package): void => {
  selectedPackage.value = pkg
}

const checkLucky = (): void => {
  const now = new Date()
  if (lastWinTime.value && now.getTime() - lastWinTime.value.getTime() < ONE_HOUR) {
    result.value = "Not eligible. Try again later."
    resultSeverity.value = Severity.Warn
    return
  }
  const isLucky: boolean = Math.random() < WIN_PROBABILITY
  if (isLucky) {
    lastWinTime.value = now
    result.value = `Congratulations! You've won the other two packages for free with your ${selectedPackage.value?.name}!`
    resultSeverity.value = Severity.Success
  } else {
    result.value = `Sorry, not lucky this time with your ${selectedPackage.value?.name}. Better luck next time!`
    resultSeverity.value = Severity.Info
  }
}
</script>

<template>
  <div class="challenge-container">
    <h2 class="challenge-title">Challenge 2: I'm feeling lucky!</h2>
    <Card>
      <template #content>
        <div class="p-fluid">
          <div class="preview-container mb-3">
            <h3>Photo Size Preview</h3>
            <div class="preview-image">
              <img :src="previewImageSrc" alt="Preview" />
              <div class="preview-overlay">{{ previewOverlayText }}</div>
            </div>
          </div>
          <div class="p-field">
            <label>Select a photo package:</label>
            <div class="button-container">
              <Button
                v-for="pkg in packages"
                :key="pkg.value"
                :label="pkg.name"
                :class="{ 'p-button-outlined': selectedPackage !== pkg, 'p-button-sm': true }"
                @click="selectPackage(pkg)"
              />
            </div>
          </div>
          <Button label="Try Your Luck!" icon="pi pi-check" @click="checkLucky" :disabled="!selectedPackage" class="mt-3" />
        </div>
        <Message v-if="result" :severity="resultSeverity" :text="result" class="mt-3" />
      </template>
    </Card>
  </div>
</template>

<style scoped>
.challenge-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.challenge-title {
  color: var(--text-color);
  margin-bottom: 1rem;
  text-align: center;
}

.preview-container {
  text-align: center;
  margin-bottom: 1rem;
}

.preview-container h3 {
  margin-bottom: 0.5rem;
}

.preview-image {
  position: relative;
  display: inline-block;
}

.preview-image img {
  width: 300px;
  height: 200px;
  object-fit: cover;
}

.preview-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 1.2em;
}

.button-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.p-button-sm {
  font-size: 0.875rem;
  padding: 0.4rem 0.8rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}
</style>