<script setup lang="ts">
import { ref } from 'vue'

const sentence = ref<string>('')
const reversedSentence = ref<string>('')

const reverseSentence = (): void => {
  reversedSentence.value = sentence.value.split(' ').reverse().join(' ')
}
</script>

<template>
  <div class="challenge-container">
    <Card>
      <template #title>
        Challenge 1: Mirror, Mirror on the Screen!
      </template>
      <template #content>
        <div class="p-inputgroup">
          <InputText v-model="sentence" placeholder="Enter a sentence" @keyup.enter="reverseSentence" />
          <Button label="Reverse" icon="pi pi-refresh" @click="reverseSentence" />
        </div>
        <div class="mirror-container">
          <div class="mirror">
            <p class="mirror-text" :class="{ 'has-content': reversedSentence }">
              {{ reversedSentence || 'Enter a sentence above' }}
            </p>
          </div>
        </div>
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

.p-inputgroup {
  margin-bottom: 2rem;
}

.mirror-container {
  position: relative;
  width: 100%;
  height: 200px;
  perspective: 1000px;
}

.mirror {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #e6e6e6, #ffffff);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotateX(5deg);
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  overflow: hidden;
}

.mirror::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0));
  pointer-events: none;
}

.mirror-text {
  font-size: 1.5rem;
  color: #2c3e50;
  opacity: 0.7;
  transform: scaleX(-1);
  transition: all 0.3s ease;
}

.mirror-text.has-content {
  opacity: 1;
  text-shadow: 0 0 10px rgba(66,185,131,0.5);
}

</style>