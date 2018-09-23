import Vue from 'vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

Raven
  .config('https://b65ddccb9c594cbcb1d6a114d7d9d5c4@sentry.io/152451')
  .addPlugin(RavenVue, Vue)
  .install()
