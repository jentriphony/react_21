import {lazy, Suspense} from 'react'
import {useSelector} from 'react-redux'
import {Routes, Route, Navigate} from 'react-router-dom'
import Loading from './../UI/Loading'
import NotFound from './../UI/NotFound'
const Auth = lazy(() => import('./../../pages/Auth'))
const Home = lazy(() => import('./../../pages/Home'))
const Profile = lazy(() => import('./../../pages/Profile'))
const Component = props => {
  const pagesPathsSlice = useSelector(store => store.pagesPaths)
  const pagesAuthSlice = useSelector(store => store.pagesAuth)
  return <Suspense fallback={<Loading/>}>
    <Routes>
      <Route path={pagesPathsSlice.home.home} element={<Home/>}/>
      <Route path={pagesPathsSlice.auth.auth} element={!pagesAuthSlice.data.idToken ? <Auth/> : <Navigate to={pagesPathsSlice.home.home}/>}/>
      <Route path={pagesPathsSlice.profile.profile} element={!!pagesAuthSlice.data.idToken ? <Profile/> : <Navigate to={pagesPathsSlice.auth.auth}/>}/>
      <Route path='/' element={<Navigate to={pagesPathsSlice.home.home} replace={true}/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  </Suspense>
}
export default Component