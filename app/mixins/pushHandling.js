// create/destroy push notifications based on store (used in setup and settings)

import { LocalNotifications } from "nativescript-local-notifications";

import dates from "~/assets/dates.json";

export const pushHandling = {
  data() {
    return {
      dates: dates.tours
    };
  },
  created() {
    LocalNotifications.addOnMessageReceivedCallback(notificationData => {
      this.message =
        "Notification received: " + JSON.stringify(notificationData);
    });
  },
  methods: {
    permissionGranted() {
      LocalNotifications.hasPermission().then(
        function(granted) {
          console.log("Permission granted? " + granted);
        });
    },
    createNotifications() {
      let days = ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."];
      let months = [
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember"
      ];
      let tour = this.$store.state.user.tour;

      if (this.$store.state.user.pushPaper) {
        var paperDates = this.dates.paper[tour];
        var paperDateObjects = [];
        for (let i = 0; i < paperDates.length; i++) {
          let splittedDate = paperDates[i].split("-");
          paperDateObjects[i] = {
            year: parseInt(splittedDate[0]),
            month: parseInt(splittedDate[1]) - 1,
            day: parseInt(splittedDate[2]),
            weekday: days[new Date(paperDates[i]).getDay()],
            monthName: months[new Date(paperDates[i]).getMonth()]
          };
        }
      }

      if (this.$store.state.user.pushCarton) {
        var cartonDates = this.dates.carton[tour];
        var cartonDateObjects = [];
        for (let i = 0; i < cartonDates.length; i++) {
          let splittedDate = cartonDates[i].split("-");
          cartonDateObjects[i] = {
            year: parseInt(splittedDate[0]),
            month: parseInt(splittedDate[1]) - 1,
            day: parseInt(splittedDate[2]),
            weekday: days[new Date(cartonDates[i]).getDay()],
            monthName: months[new Date(cartonDates[i]).getMonth()]
          };
        }
      }

      let hour = this.$store.state.user.pushTime.hour;
      let minute = this.$store.state.user.pushTime.minute;
      let numberOfDaysBefore = this.$store.state.user.pushDay;

      let notificationArr = [];
      let id = 1;

      if (this.$store.state.user.pushPaper) {
        for (let i = 0; i < paperDateObjects.length; i++) {
          let notification = {
            id: id,
            title: `Papiersammlung am ${paperDateObjects[i].weekday} ${paperDateObjects[i].day}. ${paperDateObjects[i].monthName}`,
            body:
              "Demnächst wird an Ihrer Adresse Papier gesammelt. Nutzen Sie die Gelegenheit, Ihr Altpapier gebündelt bereitzustellen.",
            image: "https://entsorga.ramon.onl/assets/paper.jpg",
            forceShowWhenInForeground: true,
            // at: new Date(new Date().getTime() + 5 * 1000)
            at: new Date(
              paperDateObjects[i].year,
              paperDateObjects[i].month,
              paperDateObjects[i].day - numberOfDaysBefore,
              hour,
              minute
            )
          };
          notificationArr.push(notification);
          id++;
        }
      }

      if (this.$store.state.user.pushCarton) {
        for (let i = 0; i < cartonDateObjects.length; i++) {
          let notification = {
            id: id,
            title: `Kartonsammlung am ${cartonDateObjects[i].weekday} ${cartonDateObjects[i].day}. ${cartonDateObjects[i].monthName}`,
            body:
              "Demnächst wird an Ihrer Adresse Karton gesammelt. Nutzen Sie die Gelegenheit, Ihren Altkarton gebündelt bereitzustellen.",
            image: "https://entsorga.ramon.onl/assets/carton.jpg",
            forceShowWhenInForeground: true,
            // at: new Date(new Date().getTime() + 5 * 1000)
            at: new Date(
              cartonDateObjects[i].year,
              cartonDateObjects[i].month,
              cartonDateObjects[i].day - numberOfDaysBefore,
              hour,
              minute
            )
          };
          notificationArr.push(notification);
          id++;
        }
      }

      // clear all previous notifications, then create updated notifications
      LocalNotifications.cancelAll()
        .then(() => {
          console.log("all canceled");
          if (notificationArr && notificationArr.length) {
            LocalNotifications.schedule(notificationArr)
              .then(() => {
                console.log(notificationArr.length + " notifications created");
              })
              .catch(error => console.log("doSchedule error: " + error));
            // console.log("created notifications");
          } else {
            console.log("no notifications to create");
          }
        })
        .catch(error => console.log("doCancelAll error: " + error));
    },
    cancelAllNotifications() {
      LocalNotifications.cancelAll()
        .then(() => {
          console.log("all notifications canceled");
        })
        .catch(error => console.log("doCancelAll error: " + error));
    },
    requestNotificationPermission() {
      LocalNotifications.requestPermission().then(
        function(granted) {
          console.log("Permission granted? " + granted);
        }
      )
    }
  }
};
