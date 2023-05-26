import { createStore } from 'vuex'

export default createStore({
  state: {
    settingON: false,
    userID: null,
    contactDelete: false,
    contactAdded: false,
    newMessageTrue: false,
    usersChatList: '',
    allListUsers: '',
    newMessageUserInChatList: '',
    newMessageUser: {},
    loading: false,
    userEmail: '',
    userInfo: '',
    userName:'',
    userStatus:'',
    userImg:'',
    messageSending: false
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
