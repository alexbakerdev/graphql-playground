import { createActions } from 'redux-actions'

export const {
  setSettingsString,
  setConfigString,
  openHistory,
  closeHistory,
  setDemoMode,
} = createActions({
  SET_SETTINGS_STRING: settingsString => ({ settingsString }),
  SET_CONFIG_STRING: configString => ({ configString }),
  SET_DEMO_MODE: value => ({ value }),
  OPEN_HISTORY: () => ({}),
  CLOSE_HISTORY: () => ({}),
})
