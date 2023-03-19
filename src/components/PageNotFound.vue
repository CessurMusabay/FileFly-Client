<template>
  <div class="main-container">
    <Card style="width: 350px">
      <template #title> FileFly</template>
      <template #subtitle> Page not found</template>
      <template #content></template>
      <template #footer>
        <router-link to="/">
          <Button label="Home page"/>
        </router-link>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from "primevue/card";
import Button from "primevue/button";

export default {
  name: "PageNotFound",
  components: {Card,Button},
}
</script>

<style scoped>

</style>