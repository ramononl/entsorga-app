<template>
  <Page>
    <ActionBar title="entsorga" android:flat="true"/>
    <TabView :selectedIndex="selectedIndex" @selectedIndexChange="indexChange" iosIconRenderingMode="alwaysTemplate" selectedTabTextColor="#53ba82" tabTextColor="#718096">
      <TabViewItem title="Startseite" iconSource="res://tabicons/home">
        <HomeTab class="p-30"></HomeTab>
      </TabViewItem>
      <TabViewItem title="Standorte"  iconSource="res://tabicons/map">
        <PlacesTab class="p-30"></PlacesTab>
      </TabViewItem>
      <TabViewItem title="Infos"  iconSource="res://tabicons/recycle">
        <InfosTab class="p-30"></InfosTab>
      </TabViewItem>
      <TabViewItem title="Einstellungen"  iconSource="res://tabicons/cog">
        <SettingsTab></SettingsTab>
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script>
  import * as ApplicationSettings from "application-settings";
  import HomeTab from "./HomeTab";
  import PlacesTab from "./PlacesTab";
  import InfosTab from "./InfosTab";
  import SettingsTab from "./SettingsTab";
  
  export default {
    name: 'Main',
    components: { HomeTab, PlacesTab, InfosTab, SettingsTab },
    props: {
      selectedIndex: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {}
    },
    mounted() {
      this.$store.subscribe((mutations, state) => {
        ApplicationSettings.setString("store", JSON.stringify(state));
      });
      this.$store.commit("load");
    },
    methods: {
      indexChange(args) {
        let newIndex = args.value
        console.log('Current tab index: ' + newIndex)
      }
    }
  }
</script>

<style>

</style>
