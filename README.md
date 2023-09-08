1. npx nuxi@latest init <project-name>
2. yarn add pinia @pinia/nuxt --> add @pinia/nuxt in nuxt.config under modules:['@pinia/nuxt']
3. yarn add --dev @nuxtjs/tailwindcss --> add @nuxtjs/tailwindcss in nuxt.config under modules:['@nuxtjs/tailwindcss']
4. npx tailwindcss init --> rename tailwind.config.js to tailwind.config.ts

   a. config tailwind.config.ts like this:

   ```
   import type { Config } from 'tailwindcss'

   export default <Partial<Config>>{
     darkMode: 'class',
     content: [
       "./components/**/*.{js,vue,ts}",
       "./layouts/**/*.vue",
       "./pages/**/*.vue",
       "./plugins/**/*.{js,ts}",
       "./nuxt.config.{js,ts}",
       "./app.vue",
     ],
     theme: {
       extend: {
         screens: {
           'xs': '400px',
           'lgx': '1200px',
           'lgdx': '1280px',
           'dx': '1366px',
           '2dx': '1440px',
           '3xl': '1920px',
         },
         colors: {
           heading: "#2F2F2F",
           orange: "#FF7B00",
           "primary": "#FDB21D",
           "light-white": "#F0F0F0",
         },
       },
     },
     plugins: [],
   }
   ```

   b. Create this folder `assets/css/main.css` and this line:

   ```
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

   c. Add this line in nuxt.config.ts file:

   ```
   css: ['~/assets/css/main.css'],
   ```

5. For toaster: `yarn add vue-toastification@2.0.0-rc.5`
   a. Create this folder `plugins/vue-toastification.client.ts` and this line:

   ```
    import Toast from "vue-toastification";
    // Import the CSS or use your own!
    import "vue-toastification/dist/index.css";
    import { useToast } from "vue-toastification";
    import { ErrorMessage } from "~/types/toaster";

    const options = {
      // You can set your default options here
      position: 'top-center',
      timeout: 2000,
      keepOnHover: true,
      hideProgressBar: true,
      icon: false,
      closeButton: false,
    };

    const $toast = useToast()

    export default defineNuxtPlugin(nuxtApp => {
      // Doing something with nuxtApp
      nuxtApp.vueApp.use(Toast, options)
      nuxtApp.provide('toast', (name: string, value: ErrorMessage) => {
        if (name === 'error') {
          $toast.error(value.message, { toastClassName: value.className })
        } else if (name === 'success') {
          $toast.success(value.message, { toastClassName: value.className })
        } else if (name === 'clear') {
          $toast.clear()
        }
      })
    })
   ```

   b. Create this folder `types/toaster.ts` and this line:

   ```
   export interface ErrorMessage{
    message: string,
    className: string,
   }
   ```

   c. For using toater write these code under setup:

   ```
    const nuxtApp = useNuxtApp();

    nuxtApp.$toast("clear");
    // For alert
    nuxtApp.$toast("error", {
      message: "There have no more blog post.",
      className: "alert_error",
    });
    // For success
    nuxtApp.$toast("success", {
      message: "There have no more blog post.",
      className: "alert_error",
    });
   ```

6. From v7.2.0, we shipped a Nuxt module to enable auto importing for Nuxt 3 and Nuxt Bridge.: `yarn add -D @vueuse/nuxt @vueuse/core`
   a. Add this link in nuxt.config under modules: `'@vueuse/nuxt'`
   b. Now your can use this package like this:

   ```
    import { useLocalStorage, useMouse, usePreferredDark, breakpointsTailwind, useBreakpoints } from '@vueuse/core'

    // tracks mouse position
    const { x, y } = useMouse()

    // is user prefers dark theme
    const isDark = usePreferredDark()

    // persist state in localStorage
    const store = useLocalStorage(
      'my-storage',
      {
        name: 'Apple',
        color: 'red',
      },
    )

    // use tailwind breakpoints:
    const breakpoints = useBreakpoints(breakpointsTailwind);
    const isLarge = breakpoints.greaterOrEqual("xl");
    const isTab = breakpoints.greaterOrEqual("md");
   ```

7. For validation you can use this packages: `yarn add @vuelidate/core @vuelidate/validators`
   a. Here i add a demo:

   ```
    import { required, maxLength } from "@vuelidate/validators";
    import { useVuelidate } from "@vuelidate/core";

    const billingAddress = ref("");
    const rules = {
      billingAddress: {
        required,
        maxLength: maxLength(60),
      },
    };

    const v$ = useVuelidate(rules, { billingAddress });

    `in template`

    `
    <input
      id="autoComplete"
      ref="origin"
      v-model="billingAddress"
      class=""
      type="text"
      placeHolder="Billing Address"
      @blur="v$.billingAddress.$touch()"
    />
    `
   ```

8. For using sass: `yarn add -D sass`
   a. In self page or component: <style lang="scss" scoped></style>
   b. In css file -> just create a file like this: `assets/scss/default.scss` and import it into default.vue like this:
   ```
     <style>
       @import "~/assets/scss/default.scss";
     </style>
   ```
