<template>
  <div class="main-container">
    <Card style="width: 350px">
      <template #title> FileFly</template>
      <template #subtitle> Upload any file you want to share</template>
      <template #content>
      <span class="p-float-label">
        <InputText v-model="title" id="title"/>
        <label for="title">Title</label>
      </span>
        <span class="p-float-label">
        <Textarea v-model="message" auto-resize rows="5" cols="30"/>
        <label>Message</label>
      </span>
        <span class="p-float-label">
        <InputText v-model="password" id="password" type="password"/>
        <label for="password">Password</label>
      </span>


        <input v-if="progress === undefined" id="file" class="file-upload" type="file"/>
        <ProgressBar v-else :value="progress"></ProgressBar>
      </template>
      <template #footer>
        <Button @click="submitForm();" label="Share it"/>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from 'primevue/card';
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import axios from "axios";
import Dialog from "primevue/dialog";
import ProgressBar from "primevue/progressbar";

export default {
  name: "UploadForm",
  components: {Card, Button, InputText, Textarea, Dialog, ProgressBar},
  data() {
    return {
      title: '',
      message: '',
      password: '',
      file: undefined,
      progress: undefined,
    }
  },
  methods: {
    submitForm() {
      const formData = new FormData();
      formData.append('file', document.querySelector('#file').files[0]);
      formData.append('title', this.title);
      formData.append('message', this.message);
      formData.append('password', this.password);
      const headers = {'Content-Type': 'multipart/form-data'};
      axios.post('upload/', formData, {
        headers,
        onUploadProgress: (progressEvent) => {
          let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          this.progress = percentCompleted;
        }
      }).then((response) => {
        this.$router.push({
          name: 'file',
          params: {id: response.data.id},
        });
      }).catch(function (error) {
        alert(error);
      });
    },
  }
}
</script>

<style scoped></style>