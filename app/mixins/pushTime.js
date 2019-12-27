// get/set push day and time (used in setup and settings)

export const pushTime = {
  data() {
    return {
      newPushDay: null,
      newPushHour: null,
      newPushMinute: null
    }
  },
  mounted() {
    console.log(this.newPushDay);
    if (!this.newPushDay && this.$store.state.user.pushDay) {
      this.newPushDay = this.$store.state.user.pushDay;
    } else if (!this.newPushDay) {
      this.newPushDay = 0;
    }
    console.log(this.newPushDay);
  },
  computed: {
    pushTime: {
      get() {
        if (!this.newPushHour && !this.newPushMinute && this.$store.state.user.pushTime.hour && this.$store.state.user.pushTime.minute) {
          this.newPushHour = this.$store.state.user.pushTime.hour;
          this.newPushMinute = this.$store.state.user.pushTime.minute;
          let d = new Date();
          d.setHours(this.newPushHour);
          d.setMinutes(this.newPushMinute);
          return d;
        } else if (!this.newPushHour && !this.newPushMinute) {
          this.newPushHour = 7;
          this.newPushMinute = 30;
          let d = new Date();
          d.setHours(this.newPushHour);
          d.setMinutes(this.newPushMinute);
          return d;
        }
      },
      set(value) {
        this.newPushHour = value.getHours();
        this.newPushMinute = value.getMinutes();
      }
    },
    listOfPushDays() {
      return this.$store.state.listOfPushDays;
    }
  },
  methods: {
    selectedIndexChanged(value) {
      this.newPushDay = value;
      console.log(this.newPushDay);
    }
  }
}