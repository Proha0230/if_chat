import { createStore } from 'vuex'

export default createStore({
  state: {
    settingON: false,
    userID: null,
    idRecordContactInDB: null,
    contactDelete: null,
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
