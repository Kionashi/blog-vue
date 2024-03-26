
<script setup lang="ts">
import type { Post } from '@/interfaces/post';
import { onMounted } from 'vue';

    defineProps<{
        post: Post
    }>()

    onMounted(() => {
    console.log(`the post detail is mounted.`)
    })
</script>

<template>
  <div class="item">
    <div class="details">
      <h2>
        {{post.title}}
      </h2>
      <h3>{{ post.body }}</h3>
      <p>name: {{ post.author.name+ ' ('+post.author.username+')'}}</p>
      <p>email: {{ post.author.email }}</p>
      <p>tlf: {{ post.author.phone }}</p>
    </div>
  </div>
</template>

<style scoped>
</style>
