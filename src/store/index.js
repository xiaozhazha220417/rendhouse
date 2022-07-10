import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    currentCity: { label: '北京', value: 'AREA|88cff55c-aaa4-e2e0', pinyin: 'beijing', short: 'bj' },
    community: {}
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setCurrentCity (state, payload) {
      state.currentCity = payload
    },
    setCommunity (state, payload) {
      state.community = payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
