<template>
  <Page class="page-bg">
    <DockLayout stretchLastChild="true">
      <Label text="entsorga" dock="top" class="app-name border-b border-white-transparent"/>
      <Label text="content"/>
    </DockLayout>
  </Page>
</template>

<script>
import * as ApplicationSettings from "application-settings";

export default {
  name: 'Main',
  mounted() {
    this.$store.subscribe((mutations, state) => {
      ApplicationSettings.setString("store", JSON.stringify(state));
    });
    this.$store.commit("load");
  }
}
</script>

<style>

</style>
