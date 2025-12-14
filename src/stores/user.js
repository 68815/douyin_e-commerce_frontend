import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    /**
     * @type {boolean}
     */
    isLoggedIn: false,
    /**
     * @type {Object|null}
     */
    userInfo: null
  }),
  
  getters: {
    /**
     * @param {{ isLoggedIn: boolean, userInfo: Object|null }} state
     */
    getUserInfo: (state) => state.userInfo,
    /**
     * @param {{ isLoggedIn: boolean, userInfo: Object|null }} state
     */
    getUserName: (state) => state.userInfo ? state.userInfo.userName : '',
    /**
     * @param {{ isLoggedIn: boolean, userInfo: Object|null }} state
     */
    isAuthenticated: (state) => state.isLoggedIn
  },
  
  actions: {
    /**
     * @param {Object} userInfo
     */
    setUser(userInfo) {
      this.userInfo = userInfo
      this.isLoggedIn = true
    },
    
    logout() {
      this.userInfo = null
      this.isLoggedIn = false
    },
    
    /**
     * @param {Object} newInfo
     */
    updateUserInfo(newInfo) {
      this.userInfo = { ...this.userInfo, ...newInfo }
    }
  },
  
  persist: {
    key: 'user-store',
    storage: localStorage,
  },
})