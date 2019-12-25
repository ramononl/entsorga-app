<template>
  <ScrollView class="w-full">
    <FlexboxLayout flexDirection="column" justifyContent="center" class="page-padding">
      <Label textWrap="true" text="Meine nächsten Sammeltermine" class="h1 p-x-20"/>
      <!-- <Button @tap="onTapHasPermission" class="btn" text="Has Permission?"></Button>
      <Button @tap="createNotifications" class="btn" text="Schedule Notification"></Button>
      <Button @tap="cancelAllNotifications" class="btn" text="Cancel notifications"></Button> -->
      <FlexboxLayout justifyContent="space-between" alignItems="center" flexWrap="wrap" class="p-x-20 p-y-10">
        <Label text="Adresse" class="text-pink-100 font-bold" flexGrow="0"/>
        <Label :text="userAddress" class="text-pink-100"/>
      </FlexboxLayout>
      <FlexboxLayout justifyContent="space-between" alignItems="center" :class="[showAllPaper ? 'rounded-t-sm' : 'rounded-sm']" class="action-item action-item-first" @tap="showAllPaper = !showAllPaper">
        <Label text="Papier" class="text-primary font-bold" flexGrow="0"/>
        <FlexboxLayout justifyContent="flex-end" alignItems="center" flexGrow="1">
          <Label class="text-secondary text-right" :text="days[nextPaper.weekday] + ' ' +  nextPaper.day + '. ' + months[nextPaper.month] + ' ' + nextPaper.year" />
          <StackLayout>
            <Image :class="[showAllPaper ? 'rotate-90' : 'rotate-0']" src="res://icon-cheveron" stretch="none" class="cheveron"/>
          </StackLayout>
        </FlexboxLayout>
      </FlexboxLayout>
      <StackLayout v-if="showAllPaper" class="all-dates border-gray-800 border-t rounded-b-sm">
        <Label class="p-y-10 text-secondary" v-for="(date, index) in futurePaper" :key="index" :text="daysFull[date.weekday] + ', ' +  date.day + '. ' + months[date.month] + ' ' + date.year" />
      </StackLayout>
      <FlexboxLayout justifyContent="space-between" alignItems="center" :class="[showAllCarton ? 'rounded-t-sm' : 'rounded-sm']" class="action-item action-item-first" @tap="showAllCarton = !showAllCarton">
        <Label text="Karton" class="text-primary font-bold" flexGrow="0"/>
        <FlexboxLayout justifyContent="flex-end" alignItems="center" flexGrow="1">
          <Label class="text-secondary text-right" :text="days[nextCarton.weekday] + ' ' +  nextCarton.day + '. ' + months[nextCarton.month] + ' ' + nextCarton.year" />
          <StackLayout>
            <Image :class="[showAllCarton ? 'rotate-90' : 'rotate-0']" src="res://icon-cheveron" stretch="none" class="cheveron"/>
          </StackLayout>
        </FlexboxLayout>
      </FlexboxLayout>
      <StackLayout v-if="showAllCarton" class="all-dates border-gray-800 border-t rounded-b-sm">
        <Label class="p-y-10 text-secondary" v-for="(date, index) in futureCarton" :key="index" :text="daysFull[date.weekday] + ', ' +  date.day + '. ' + months[date.month] + ' ' + date.year" />
      </StackLayout>
    </FlexboxLayout>
  </ScrollView>
</template>

<script>
// import { pushHandling } from "../mixins/pushHandling";
import dates from "~/assets/dates.json";

export default {
  data() {
    return {
      days: ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."],
      daysFull: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
      months: [
        "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"
      ],
      showAllPaper: false,
      showAllCarton: false,
      dates: dates.tours
    }
  },
  // mixins: [pushHandling],
  computed: {
    tour() {
      return this.$store.state.user.tour;
    },
    userAddress() {
      let streetName = this.$store.state.user.streetName;
      let streetNumber = this.$store.state.user.streetNumber;
      let tour;
      if (this.tour === "tour1") {
        tour = 1;
      } else if (this.tour === "tour2") {
        tour = 2;
      } else {
        tour = 3;
      }
      if (streetNumber !== "") {
        return `${streetName} ${streetNumber} (Tour ${tour})`;
      } else {
        return `${streetName} (Tour ${tour})`;
      }
    },
    paperDates() {
      let tour = this.tour;
      let paperDates = this.dates.paper[tour];
      let parsedDates = [];
      let today = new Date();
      today.setDate(today.getDate() - 1);

      for (let i = 0; i < paperDates.length; i++) {
        let date = new Date(paperDates[i]);
        if (date >= today) {
          parsedDates.push(date);
        }
      }

      let dateObjects = [];
      for (let i = 0; i < parsedDates.length; i++) {
        dateObjects[i] = {
          weekday: parsedDates[i].getDay(),
          day: parsedDates[i].getDate(),
          month: parsedDates[i].getMonth(),
          year: parsedDates[i].getFullYear()
        }
      }
        
      return dateObjects;
    },
    nextPaper() {
      return this.paperDates[0];
    },
    futurePaper() {
      return this.paperDates.slice(1,5);
    },
    cartonDates() {
      let tour = this.tour;
      let cartonDates = this.dates.carton[tour];
      let parsedDates = [];
      let today = new Date();
      today.setDate(today.getDate() - 1);

      for (let i = 0; i < cartonDates.length; i++) {
        let date = new Date(cartonDates[i]);
        if (date >= today) {
          parsedDates.push(date);
        }
      }

      let dateObjects = [];
      for (let i = 0; i < parsedDates.length; i++) {
        dateObjects[i] = {
          weekday: parsedDates[i].getDay(),
          day: parsedDates[i].getDate(),
          month: parsedDates[i].getMonth(),
          year: parsedDates[i].getFullYear()
        }
      }
        
      return dateObjects;
    },
    nextCarton() {
      return this.cartonDates[0];
    },
    futureCarton() {
      return this.cartonDates.slice(1,5);
    }
  }
}
</script>

<style>

</style>