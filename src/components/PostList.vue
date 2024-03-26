<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios';
import PostItem from './PostItem.vue';
import type { Post } from '@/interfaces/post';
import PostDetail from './PostDetail.vue';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
});

const posts = ref(Array<{id: Number, title: String, body: String}>)
const selectedPost = ref<Post|null>(null)
const total = ref(0)
const isLoading = ref(false)

onMounted(() => {
  console.log(`the component is now mounted.`)
  getPosts()
})

const getPosts = () => {
    isLoading.value = true;
    axiosInstance.get('/posts').then(response => {
        posts.value = response.data.posts
        total.value = response.data.total
    }).catch(error => {
        console.error("There was an error getting the posts: ", error);
    });
    selectedPost.value = null;
    isLoading.value = false;
} 

const onSelected = (id:Number) => {
    isLoading.value = true;
    axiosInstance.get('/posts/'+id).then(response => {
        selectedPost.value = response.data
    }).catch(error => {
        console.error("There was an error getting the posts: ", error);
    });
    isLoading.value = false;
}

</script>

<template>
    <div style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 2rem;margin-top: 2rem;">
        <div>
            <div class="greetings">
                <h1 class="green">Post List ({{ total }})</h1>
            </div>
            <div v-if="!isLoading">
                <PostItem v-for="post in posts" :key="post.id" :post="post" @selected="onSelected($event)" />
            </div>
            <div v-else>
            <h1>Loading</h1>
            </div>
        </div>
        <div>
            <h1>Detail</h1>
            <div v-if="selectedPost">
                <PostDetail :post="selectedPost"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
