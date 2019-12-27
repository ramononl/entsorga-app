// reset settings (used settings)

import * as ApplicationSettings from "application-settings";
import Setup from "../components/Setup";
import { pushHandling } from "../mixins/pushHandling";

export const resetSettings = {
  mixins: [pushHandling],
  methods: {
    resetApp() {
      confirm({
        title: "Sind Sie sicher?",
        message:
          "Ihre Einstellungen werden gelöscht und Sie werden nicht mehr über Entsorgungstermine informiert.",
        okButtonText: "OK",
        cancelButtonText: "Abbrechen"
      }).then(result => {
        if (result) {
          // navigate to setup screen
          this.$navigateTo(Setup, {
            clearHistory: true
          });

          // clear local application settings
          ApplicationSettings.clear();

          // clear store
          this.$store.commit("resetState");

          // remove all notifications
          this.cancelAllNotifications();
        }
      });
    }
  }
};
