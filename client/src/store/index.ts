import { configureStore } from '@reduxjs/toolkit'
import converter ,{ converterType } from './reducers/converter'

const store = configureStore({
  reducer: {
    converter,
  }
})

export type AppStore = {
  converter: converterType
}

export default store