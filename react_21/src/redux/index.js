import {configureStore} from '@reduxjs/toolkit'
import {reducer as pagesInitialSliceReducer} from './pages/initial'
import {reducer as pagesPathsSliceReducer} from './pages/paths'
import {reducer as pagesUrlsSliceReducer} from './pages/urls'
import {reducer as uiLayoutHeaderNotificationSliceReducer} from './ui/layout-header-notification'
import {reducer as pagesAuthSliceReducer} from './pages/auth/auth'
import {reducer as pagesProfileSliceReducer} from './pages/profile/profile'
const store = configureStore({
  reducer: {
    pagesInitial: pagesInitialSliceReducer,
    pagesPaths: pagesPathsSliceReducer,
    pagesUrls: pagesUrlsSliceReducer,
    uiLayoutHeaderNotification: uiLayoutHeaderNotificationSliceReducer,
    pagesAuth: pagesAuthSliceReducer,
    pagesProfile: pagesProfileSliceReducer
  }
})
export default store
