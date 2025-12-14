import { createPersistedState } from 'pinia-plugin-persistedstate'

// Pinia持久化插件配置
export const persistedStatePlugin = (app) => {
  const pinia = app.config.globalProperties.$pinia
  pinia.use(createPersistedState())
}