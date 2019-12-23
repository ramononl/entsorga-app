<template>
  <Page class="page-bg">
    <DockLayout stretchLastChild="true">
      <LogoBar/>
      <Setup v-if="!setupDone"/>
      <GridLayout v-if="setupDone" dock="bottom" columns="*,*,*,*" rows="50" class="tab-navigation">
        <FlexboxLayout row="0" col="0" :class="[index === 0 ? 'active' : '']" @tap="tabChange(0)">
          <Image src="res://tabicons/startseite" stretch="none"/>
          <Label text="Startseite"/>
        </FlexboxLayout>
        <FlexboxLayout row="0" col="1" :class="[index === 1 ? 'active' : '']" @tap="tabChange(1)">
          <Image src="res://tabicons/standorte" stretch="none"/>
          <Label text="Standorte"/>
        </FlexboxLayout>
        <FlexboxLayout row="0" col="2" :class="[index === 2 ? 'active' : '']" @tap="tabChange(2)">
          <Image src="res://tabicons/infos" stretch="none"/>
          <Label text="Infos"/>
        </FlexboxLayout>
        <FlexboxLayout row="0" col="3" :class="[index === 3 ? 'active' : '']" @tap="tabChange(3)">
          <Image src="res://tabicons/einstellungen" stretch="none"/>
          <Label text="Einstellungen"/>
        </FlexboxLayout>
      </GridLayout>
      <HomeTab v-if="index === 0 && setupDone"/>
      <PlacesTab v-if="index === 1 && setupDone"/>
      <InfosTab v-if="index === 2 && setupDone"/>
      <SettingsTab v-if="index === 3 && setupDone"/>
    </DockLayout>
  </Page>
</template>

<script>
  import Setup from "./Setup";
  import LogoBar from "./common/LogoBar";
  import * as ApplicationSettings from "application-settings";
  import HomeTab from "./HomeTab";
  import PlacesTab from "./PlacesTab";
  import InfosTab from "./InfosTab";
  import SettingsTab from "./SettingsTab";
  
  export default {
    name: 'Main',
    components: { Setup, LogoBar, HomeTab, PlacesTab, InfosTab, SettingsTab },
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
