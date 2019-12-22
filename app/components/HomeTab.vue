<template>
  <ScrollView class="page-bg">
    <FlexboxLayout flexDirection="column" justifyContent="center" class="p-y-20">
      <Label textWrap="true" text="Meine nächsten Sammeltermine" class="h1 p-x-20"/>
      <FlexboxLayout justifyContent="space-between" alignItems="center" class="action-item action-item-first">
        <Label text="Tour" class="text-primary" flexGrow="0"/>
        <Label :text="tour" class="text-secondary"/>
      </FlexboxLayout>
      <FlexboxLayout justifyContent="space-between" alignItems="center" class="action-item action-item-first" @tap="showAllPaper = !showAllPaper">
        <Label text="Papier" class="text-primary" flexGrow="0"/>
        <FlexboxLayout justifyContent="flex-end" alignItems="center" flexGrow="1">
          <Label class="text-secondary text-right" :text="days[nextPaper.weekday] + ', ' +  nextPaper.day + '. ' + months[nextPaper.month] + ' ' + nextPaper.year" />
          <StackLayout>
            <Image src="res://appicons/icon-plus-circle" stretch="none" class="m-l-10"/>
          </StackLayout>
        </FlexboxLayout>
      </FlexboxLayout>
      <StackLayout v-if="showAllPaper" class="all-dates">
        <Label class="p-y-10 text-secondary" v-for="(date, index) in futurePaper" :key="index" :text="days[date.weekday] + ', ' +  date.day + '. ' + months[date.month] + ' ' + date.year" />
      </StackLayout>
      <FlexboxLayout justifyContent="space-between" alignItems="center" class="action-item action-item-first" @tap="showAllCarton = !showAllCarton">
        <Label text="Karton" class="text-primary" flexGrow="0"/>
        <FlexboxLayout justifyContent="flex-end" alignItems="center" flexGrow="1">
          <Label class="text-secondary text-right" :text="days[nextCarton.weekday] + ', ' +  nextCarton.day + '. ' + months[nextCarton.month] + ' ' + nextCarton.year" />
          <StackLayout>
            <Image src="res://appicons/icon-plus-circle" stretch="none" class="m-l-10"/>
          </StackLayout>
        </FlexboxLayout>
      </FlexboxLayout>
      <StackLayout v-if="showAllCarton" class="all-dates">
        <Label class="p-y-10 text-secondary" v-for="(date, index) in futureCarton" :key="index" :text="days[date.weekday] + ', ' +  date.day + '. ' + months[date.month] + ' ' + date.year" />
      </StackLayout>
    </FlexboxLayout>
  </ScrollView>
</template>

<script>
export default {
  data() {
    return {
      days: ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."],
      months: [
        "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"
      ],
      showAllPaper: false,
      showAllCarton: false
    }
  },
  computed: {
    tour() {
      return this.$store.state.user.tour;
    },
    paperDates() {
      let tour = this.tour;
      let paperDates = this.$store.state.dates.paper[tour];
      let parsedDates = [];
      let today = new Date();

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
      let cartonDates = this.$store.state.dates.carton[tour];
      let parsedDates = [];
      let today = new Date();

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