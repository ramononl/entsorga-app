<template>
  <StackLayout verticalAlignment="middle" class="h-full">
    <Carousel height="80%" width="100%" pageChanged="myChangeEvent" pageTapped="mySelectedEvent" indicatorColor="#ffffff" finite="true" bounce="true" showIndicator="true" verticalAlignment="top" android:indicatorAnimation="swap" color="white">
      <CarouselItem id="slide1" verticalAlignment="middle" horizontalAlignment="center">
        <Image src="res://slide01" stretch="aspectFit" width="60%" horizontalAlignment="center"/>
        <Label text="Entsorgung & Recycling" width="80%" textWrap="true" class="text-center m-t-10 font-bold"/>
        <Label text="Hier finden Sie Informationen, Tipps und Hinweise rund um das einfache und ökologische Entsorgen in Chur." width="90%" textWrap="true" class="text-center m-t-2 text-sm p-x-20 w-full"/>
      </CarouselItem>
      <CarouselItem id="slide2" verticalAlignment="middle" horizontalAlignment="center">
        <Image src="res://slide02" stretch="aspectFit" width="60%" horizontalAlignment="center"/>
        <Label text="Wo ist was zu entsorgen?" width="80%" textWrap="true" class="text-center m-t-10 font-bold"/>
        <Label text="Suchen Sie Sammelstellen für Glas, Büchsen, Dosen und Batterien in Ihrer Umgebung auf der Karte." width="90%" textWrap="true" class="text-center m-t-2 text-sm p-x-20 w-full"/>
      </CarouselItem>
      <CarouselItem id="slide3" verticalAlignment="middle" horizontalAlignment="center">
        <Image src="res://slide03" stretch="aspectFit" width="60%" horizontalAlignment="center"/>
        <Label text="Bleiben Sie informiert" width="80%" textWrap="true" class="text-center m-t-10 font-bold"/>
        <Label text="Die «entsorga»-App erinnert Sie an bevorstehende Papier- und Kartonsammlungen für Ihre Wohnadresse." width="90%" textWrap="true" class="text-center m-t-2 text-sm p-x-20 w-full"/>
      </CarouselItem>
    </Carousel>
    <StackLayout height="20%" verticalAlignment="middle" class="p-x-20">
      <Button text="Jetzt loslegen" @tap="onButtonTap" class="m-t-30 w-full action-button"/>
    </StackLayout>
  </StackLayout>
</template>

<script>
export default {
  methods: {
    onButtonTap() {
      this.$emit("nextstep", "SetupStreetSelect")
    }
  }
}
</script>

<style>

</style>