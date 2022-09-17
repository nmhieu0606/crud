module.exports = {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: "Express CRUD",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        type: "text/css",
        href:
          "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      }
    ],
    script: [
      {
        src: "/js/bootstrap.bundle.min.js",
        type: "text/javascript"
      },
      {
        src: "https://code.jquery.com/jquery-3.3.1.slim.min.js",
        type: "text/javascript"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#ff0000" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    // "bootstrap-vue/nuxt",
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/auth",

    "vue-sweetalert2/nuxt"
  ],

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/api/users/login",
            method: "post",
            propertyName: "token"
          },
          logout: true,
          user: {
            url: "/api/users/user",
            method: "get",
            propertyName: "user"
          }
        },
        tokenRequired: true,
        tokenType: "Bearer"
      }
    },
    redirect: {
      login: "/user/login", // User will be redirected to this path if login is required
      logout: "/", // User will be redirected to this path if after logout, current route is protected
      home: "/" // User will be redirect to this path after login if accessed login page directly
    },
    rewriteRedirects: true
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },

  serverMiddleware: ["~/api/index.js"]
};
