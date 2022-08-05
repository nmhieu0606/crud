import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    state: { count: 5 },

    mutations: {
      increment: store => store.count += 1,
      decrement: store => store.count -= 1
    },
  
    getters: {
      count: store => store.count
    }
    
  })
}

export default createStore