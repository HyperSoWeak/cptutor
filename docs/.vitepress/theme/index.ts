import DefaultTheme from "vitepress/theme";
import Problem from "./components/Problem.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("Problem", Problem);
  },
};
