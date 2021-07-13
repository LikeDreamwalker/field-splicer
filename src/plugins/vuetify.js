import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#0066ff",
        secondary: "#c0c0c0",
        danger: "#ff4500",
        info: "#00bbff",
      },
      dark: {
        primary: "#0066ff",
        secondary: "#c0c0c0",
        danger: "#ff4500",
        info: "#00bbff",
      },
    },
  },
});
