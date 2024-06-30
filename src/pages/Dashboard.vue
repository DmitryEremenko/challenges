<script lang="ts" setup>
import ChallengeCard from '../components/ChallengeCard.vue'
import { ref } from 'vue';
import { Routes } from '../enums';
const challenges = ref([
  {
    title: 'Challenge 1',
    subtitle: 'Mirror, Mirror on the Screen!',
    description: 'Reverse the order of words in a sentence.',
    route: `/${Routes.ChallengeOne}`,
  },
  {
    title: 'Challenge 2',
    subtitle: "I'm feeling lucky!",
    description: 'Implement the "feeling lucky" feature for photo packages.',
    route: `/${Routes.ChallengeTwo}`,
  },
  {
    title: 'Challenge 3',
    subtitle: 'Only two things in life are guaranteed...',
    description: 'Calculate tax owed based on monthly revenue and free packages.',
    route: `/${Routes.ChallengeThree}`,
  },
]);
</script>

<template>
  <div class="dashboard">
    <h1 class="title">Apple Industries Code Challenges</h1>
    <div class="challenge-container">
      <div
        v-for="(challenge, index) in challenges"
        :key="index"
        class="challenge-card-wrapper"
        @click="$router.push(challenge.route)"
      >
        <ChallengeCard :challenge="challenge"></ChallengeCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.title {
  font-size: 2.5rem;
  color: var(--text-color);
  margin-bottom: 2rem;
  text-align: center;
}

.challenge-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.challenge-card-wrapper {
  flex: 0 0 calc(33.333% - 1.333rem);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.challenge-card-wrapper:hover {
  transform: translateY(-5px);
}

.challenge-card {
  height: 100%;
  transition: box-shadow 0.3s ease;
}

.challenge-card-wrapper:hover .challenge-card {
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2) !important;
}

.challenge-card ::v-deep .p-card-body {
  display: flex;
  flex-direction: column;
}

.challenge-card ::v-deep .p-card-content {
  flex-grow: 1;
}

.challenge-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

@media (max-width: 768px) {
  .challenge-card-wrapper {
    flex: 0 0 100%;
  }
}
</style>
