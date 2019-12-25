export const pushTime = {
  data() {
    return {
      newPushDay: null,
      newPushHour: null,
      newPushMinute: null
    }
  },
  computed: {
    pushDay() {
      this.newPushDay = this.$store.state.user.pushDay;
      return this.$store.state.user.pushDay;
    },
    pushTime: {
      get() {
        this.newPushHour = this.$store.state.user.pushTime.hour;
        this.newPushMinute = this.$store.state.user.pushTime.minute;
        let d = new Date();
        d.setHours(this.$store.state.user.pushTime.hour);
        d.setMinutes(this.$store.state.user.pushTime.minute);
        return d;
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