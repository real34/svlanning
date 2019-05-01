import App from "./App.svelte";

const sheetId = "TODO";
const app = new App({
  target: document.body,
  props: {
    planningUrl: `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&id=${sheetId}`
  }
});

export default app;
