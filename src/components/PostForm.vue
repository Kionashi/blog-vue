<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
});
const emit = defineEmits<{
        submit: [
            post: {
                title: String | null,
                authorId: Number | null,
                body: String | null
            }
        ]
    }>()
    const isError = ref(false)
    const showMessage = ref(false)
    const message = ref('')

const onSubmit = (postToSubmit: {
    title: String | null,
    authorId: Number | null,
    body: String | null
}) => {
    showMessage.value = false;
    axiosInstance.post('/posts', postToSubmit).then( () => {
        showMessage.value = true;
        isError.value = false;
        message.value = 'Post Created sucessfully'
    }).catch(error => {
        showMessage.value = true;
        isError.value = true;
        message.value = error.response.data.detail
    });
}

const post = ref<{
    title: String | null,
    authorId: Number | null,
    body: String | null
}>({title: null, authorId: null, body: null})
</script>

<template>
  <div class="form">
    <form @submit.prevent="onSubmit(post)">
      <label for="title">Title</label>
      <input type="text" v-model="post.title" name="title" id="title" />
      <label for="authorId">Author</label>
      <select name="authorId" v-model="post.authorId" id="authorId">
        <option :value="1">Leanne Graham</option>
        <option :value="2">Ervin Howell</option>
        <option :value="3">Clementine Bauch</option>
      </select>
      <label for="body">Body</label>
      <textarea name="body" v-model="post.body" id="body" />
      <input type="submit"/>
      <p v-if="showMessage" :class="!isError ? 'green': 'red'">{{ message }}</p>
    </form>
  </div>
</template>

<style scoped>
input[type='text'], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}
textarea {
  width: 100%;
  height: 5em;
}

input[type=button], input[type=submit], input[type=reset] {
  background-color: #04AA6D;
  border: none;
  color: white;
  padding: 16px 32px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
}

.red {
    color: red;
}
</style>
