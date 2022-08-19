import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    state: { 
      count: 5,
      cart:[],
     
    },

    mutations: {
      increment: store => store.count += 1,
      decrement: store => store.count -= 1,
      addToCart(state,text){
        state.cart.push(text);
      },
     
    },
  
    getters: {
      count: store => store.count,
      cart:store=>store.cart
    },
    actions:{
      

      
    }
    
  })
}

export default createStore