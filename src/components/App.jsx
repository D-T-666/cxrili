import { Component, lazy, Suspense } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"

import NavBar from "components/navbar/NavBar"
import { Confirm } from "components/popup"

import { AuthProvider } from "contexts/AuthContext"
import { PopupProvider } from "contexts/PopupContext"
import { NotesProvider } from "contexts/NotesContext"
import ls from "local-storage"

const DayViewPage = lazy(() => import("components/dayView/DayViewPage"))
const WeekTable = lazy(() => import("components/weekView/WeekTable"))
const HomeworkView = lazy(() => import("components/homeworkView"))
const SettingsPage = lazy(() => import("components/settings/SettingsPage"))

class App extends Component {
  constructor(props) {
    super(props)

    const day = new Date().getDay()
    this.state = {
      colorTheme: "light",
      today: day % 6 && day - 1 // [0 1 2 3 4 5 6] -> [0 0 1 2 3 4 0]
    }
  }

  componentDidMount() {
    const currentTheme = ls.get("colorTheme")
    if (currentTheme) {
      this.switchTheme(currentTheme)
    }
  }

  switchTheme(colorTheme) {
    // Set this.state.colorTheme to the argument provided
    // and update the classes attached to the document.
    if (colorTheme !== this.state.colorTheme)
      this.setState((state) => {
        document.getElementById("theme-color").content =
          state.colorTheme === "dark" ? "#f3e1c8" : "#141418"

        document.body.classList.remove(state.colorTheme + "-theme")
        document.body.classList.add(colorTheme + "-theme")

        return { colorTheme }
      })
  }

  render() {
    return (
      <Router>
        <AuthProvider>
          <div className='App'>
            <PopupProvider>
              <Suspense
                fallback={() => <div className='content-box'>loading..</div>}>
                <Switch>
                  <Route path='/day/:d?' component={DayViewPage} />

                  <Route
                    path='/week'
                    component={() => <WeekTable today={this.state.today} />}
                  />

                  <Route
                    path='/homework'
                    component={() => (
                      <NotesProvider>
                        <HomeworkView />
                      </NotesProvider>
                    )}
                  />

                  <Route
                    path='/settings'
                    component={() => (
                      <SettingsPage switchTheme={this.switchTheme.bind(this)} />
                    )}
                  />

                  <Route path='/' component={() => <Redirect to='/day' />} />
                </Switch>
              </Suspense>

              <Confirm />
            </PopupProvider>

            <Switch>
              <Route
                path='/'
                exact
                component={({ match }) => (
                  <NavBar
                    match={match}
                    onThemeSwitch={this.switchTheme.bind(this)}
                  />
                )}
              />

              <Route
                path='/:page'
                component={({ match }) => (
                  <NavBar
                    match={match}
                    onThemeSwitch={this.switchTheme.bind(this)}
                  />
                )}
              />
            </Switch>
          </div>
        </AuthProvider>
      </Router>
    )
  }
}

export default App
