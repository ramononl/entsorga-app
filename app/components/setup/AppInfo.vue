<template>
  <StackLayout verticalAlignment="middle" class="h-full">
    <Carousel height="200" width="100%" pageChanged="myChangeEvent" pageTapped="mySelectedEvent" indicatorColor="#ffffff" finite="true" bounce="true" showIndicator="true" verticalAlignment="top" android:indicatorAnimation="swap" color="white">
      <CarouselItem id="slide1" verticalAlignment="middle" horizontalAlignment="center">
        <Image src="res://startseite" stretch="none" horizontalAlignment="center"/>
        <Label text="Slide 1" class="text-center"/>
      </CarouselItem>
      <CarouselItem id="slide2" verticalAlignment="middle" horizontalAlignment="center">
        <Image src="res://startseite" stretch="none" horizontalAlignment="center"/>
        <Label text="Slide 2" class="text-center"/>
      </CarouselItem>
      <CarouselItem id="slide3" verticalAlignment="middle" horizontalAlignment="center">
        <Image src="res://startseite" stretch="none" horizontalAlignment="center"/>
        <Label text="Slide 3" class="text-center"/>
      </CarouselItem>
      <CarouselItem id="slide4" verticalAlignment="middle" horizontalAlignment="center">
        <Image src="res://startseite" stretch="none" horizontalAlignment="center"/>
        <Label text="Slide 4" class="text-center"/>
      </CarouselItem>
    </Carousel>
    <Button text="Jetzt loslegen" @tap="onButtonTap" class="m-t-30 w-full"/>
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