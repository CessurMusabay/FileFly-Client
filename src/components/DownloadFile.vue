<template>
  <div class="main-container">
    <Card style="width: 350px">
      <template #title> {{ data.title }}</template>
      <template #subtitle>{{ data.message }}</template>
      <template #content>
        <div>
          <span class="p-float-label">
            <InputText v-model="password" id="password" type="password"/>
            <label for="password">Password</label>
           </span>
          <small style="color: red">{{ errorMsg }}</small>

        </div>
      </template>
      <template #footer>
        <Button @click="download();" :label="data.file"/>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from 'primevue/card';
import Button from "primevue/button";
import InputText from "primevue/inputtext";


export default {
  name: "DownloadFile",
  components: {Card, Button, InputText},
  mounted() {
    this.fetchTransfer();
  },
  methods: {
    fetchTransfer() {
      let id = this.$route.params.id;
      this.axios({
        url: `transfer/${id}/`,
        method: 'get',
      }).then((response) => {
        this.data = response.data;
      }).catch((error) => {
        this.errorMsg = error;
      });
    },
    download() {
      let id = this.$route.params.id;
      let data = new FormData();
      data.append('password', this.password);
      this.axios({
        url: `download/${id}/`,
        responseType: 'blob',
        method: 'POST',
        headers: [
          {"Content-Type": "application/x-www-form-urlencoded"}
        ],
        data: data,
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        console.log(response);
        link.setAttribute('download', this.data.file);
        document.body.appendChild(link);
        link.click();
      }).catch((e) => {
        if (e.response !== undefined && e.response.status === 401) {
          this.errorMsg = "Invalid password";
          return;
        }
        alert(e);
      });
    }
  },
  data() {
    return {
      data: {},
      password: '',
      errorMsg: '',
    }
  },
}
</script>

<style scoped>

.transfer {
  padding: 10px;
}

.transfer .title {
  font-weight: bold;
  font-size: 1.25rem;
  text-transform: capitalize;
}

</style>