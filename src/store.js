import Vue from 'vue'
import Vuex from 'vuex'
import mockGenerator from './mock'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataList: [],
    average:0
  },
  mutations: {
    getAverage(state, item) {
      state.average = item;
    },
    getData(state, item) {
      state.dataList = item;
    }
  },
  getters: {
    getAverage: state => 0,
    getData: state => state.dataList
  },
  actions: {
    getDataCall (context) {
      // TODO
      mockGenerator()
    }
  }
})
