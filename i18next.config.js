/** @type {import('i18next-cli').I18nextToolkitConfig} */
export default {
  locales: [
    "en",
    "ka"
  ],
  extract: {
    input: "src/**/*.{js,jsx,ts,tsx}",
    output: "public/locales/{{language}}/{{namespace}}.json"
  }
}