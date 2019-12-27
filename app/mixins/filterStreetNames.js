// filter street names (used in setup and settings)

import ranges from "~/assets/ranges.json";

export const filterStreetNames = {
  data() {
    return {
      searchBar: "",
      streetNames: ranges.data
    };
  },
  computed: {
    filteredNames() {
      let term = this.searchBar.toLowerCase();
      if (term !== "") {
        let filteredNames = this.streetNames.filter(function(value) {
          let name = value.name.toLowerCase();
          if (name.indexOf(term) > -1) return value;
        });
        return filteredNames;
      }
      return this.streetNames;
    }
  }
};
