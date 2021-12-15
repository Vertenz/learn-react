import React, {useState, Suspense} from "react";
import "./App.css"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useHistory
} from "react-router-dom"
import Description from "./Components/Description"
import TextV from "./Components/TextV"
const Adventure = React.lazy(() => import('./Components/Adventure'));

function App() {
    let history = useHistory()
    const descriptionText = 'Hi, this is my react training project. I\'m getting a little bored with all usual staff ' +
        'like to-do list, input form, ect. That is exactly why I created This :)  You can use the Adventure mode or ' +
        'Text version to see other my project. ' +
        'I used here React, functional components, react-router-dom, lazy, useEffect, useRef, useState'

    let [showDescription, setshowDescription] = useState(true)

    function changeShow() {
        setshowDescription(showDescription = !showDescription)
    }


    return (
        <div className="App">
            {showDescription ? <Description description={descriptionText}/> : null}
                <Router>
                    <main className='main'>
                        {showDescription ? <div className="btn-block">
                            <Link to='/just-text' className='btn btn_link' onClick={changeShow}>
                                Text version
                            </Link>
                            <Link to='/adventure' className='btn btn_link'>
                                Adventure mode
                            </Link>
                        </div>
                            : null}
                        <Switch>
                            <Route path="/just-text">
                                <TextV changeShow={changeShow} showDescription={showDescription} />
                            </Route>
                            <Route path="/adventure">
                                <Suspense fallback={<div>Загрузка...</div>}>
                                 <Adventure changeShow={changeShow} showDescription={showDescription} history={history} />
                                </Suspense>
                            </Route>
                        </Switch>
                    </main>
                </Router>
        </div>
    );
}

export default App;
