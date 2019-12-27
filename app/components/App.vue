<template>
  <Page class="page-bg" actionBarHidden="true">
    <DockLayout stretchLastChild="true">
      <LogoBar/>
      <GridLayout dock="bottom" columns="*,*,*,*" rows="50" class="tab-navigation">
        <FlexboxLayout row="0" col="0" :class="[index === 0 ? 'active' : '']" @tap="tabChange(0)">
          <Image src="res://startseite" stretch="none"/>
          <Label text="Startseite"/>
        </FlexboxLayout>
        <FlexboxLayout row="0" col="1" :class="[index === 1 ? 'active' : '']" @tap="tabChange(1)">
          <Image src="res://standorte" stretch="none"/>
          <Label text="Standorte"/>
        </FlexboxLayout>
        <FlexboxLayout row="0" col="2" :class="[index === 2 ? 'active' : '']" @tap="tabChange(2)">
          <Image src="res://infos" stretch="none"/>
          <Label text="Infos"/>
        </FlexboxLayout>
        <FlexboxLayout row="0" col="3" :class="[index === 3 ? 'active' : '']" @tap="tabChange(3)">
          <Image src="res://einstellungen" stretch="none"/>
          <Label text="Einstellungen"/>
        </FlexboxLayout>
      </GridLayout>
      <HomeTab v-if="setupDone" v-show="index === 0"/>
      <PlacesTab v-if="setupDone" v-show="index === 1"/>
      <InfosTab v-if="setupDone" v-show="index === 2"/>
      <SettingsTab v-if="setupDone" v-show="index === 3"/>
    </DockLayout>
  </Page>
</template>

<script>
  import LogoBar from "./common/LogoBar";
  import * as ApplicationSettings from "application-settings";
  import HomeTab from "./HomeTab";
  import PlacesTab from "./PlacesTab";
  import InfosTab from "./InfosTab";
  import SettingsTab from "./SettingsTab";
  
  export default {
    name: 'Main',
    components: { LogoBar, HomeTab, PlacesTab, InfosTab, SettingsTab },
    props: {
      selectedIndex: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        index: this.selectedIndex
      }
    },
    computed: {
      setupDone() {
        return this.$store.state.setupDone;
      }
    },
    mounted() {
      this.$store.subscribe((mutations, state) => {
        ApplicationSettings.setString("store", JSON.stringify(state));
      });
      this.$store.commit("load");
    },
    methods: {
      tabChange(selectedIndex) {
        this.index = selectedIndex;
      }
    }
  }
</script>

<style>

</style>
