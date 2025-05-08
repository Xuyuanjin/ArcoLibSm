import { createStore } from 'vuex'

export default createStore({
  state: {
    userName:""
  },
  getters: {
  },
  mutations: {
    changeFun(state,userName){
      state.userName = userName
    },
  },
  actions: {
    setValue(context,userName){
      context.commit('changeFun',userName)
    },
  },
  modules: {
  }
})
