<template>
  <ScrollView class="w-full">
    <FlexboxLayout flexDirection="column" justifyContent="center" class="page-padding">
      <Label text="Wo kann ich was entsorgen?" textWrap="true" class="h1 p-x-20"/>
      <StackLayout v-for="(type, index) in infos" :key="index" class="bg-white-transparent rounded-sm p-x-20 p-y-10 m-t-10">
        <Label :text="type.name" textWrap="true" class="text-primary font-bold"/>
        <Label :text="type.desc" textWrap="true" class="text-secondary"/>
      </StackLayout>
    </FlexboxLayout>
  </ScrollView>
</template>

<script>
import infos from "~/assets/infos.json";

export default {
  data() {
    return {
      infos: infos.types
    }
  }
}
</script>

<style>

</style>