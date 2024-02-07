import { Routes, Route, HashRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import routes from './config/routes'
// import { Provider } from 'react-redux'
import AuthChecker from './auth/AuthChecker'
function App() {
  return (
    <HashRouter>
      <Navbar />
        {/* <Provider store={store}> */}
          <Routes>
            { routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  route.protected ? (
                  <AuthChecker>
                    <route.component />
                  </AuthChecker>
                  ) : (
                    <route.component />
                  )
                }
                />
            )) }
          </Routes>
        {/* </Provider> */}
    </HashRouter>
  )
}
export default App