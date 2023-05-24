import {combineReducers, configureStore} from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import userReducer from "./userSlice"
import productReducer from "./productSlice"
import cartReducer from "./cartSlice"
import getProductReducer from "./getProductSlice"
import orderReducer from "./orderSlice"
import logger from 'redux-logger'

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'
  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['product', "theproduct"],

  }
  const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    theproduct: getProductReducer,
    order: orderReducer
  })
  const persistedReducer = persistReducer(persistConfig, rootReducer)

// export default configureStore({
//     reducer:{
//         // auth: authReducer,
//         // user: userReducer,
//         // product: productReducer,
//         // cart: cartReducer,
//         // theproduct: getProductReducer,
//         // order: orderReducer

//     },
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware({

//       })
// })

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
        immutableCheck: false,
      }),
  })

  export let persistor = persistStore(store)
