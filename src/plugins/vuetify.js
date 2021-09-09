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
        info: "#81B4FF",
        github: "#000000",
      },
      dark: {
        primary: "#ff4500",
        secondary: "#c0c0c0",
        danger: "#0066ff",
        info: "#FFA07D",
        github: "#000000",
      },
    },
  },
});
