import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {Switch} from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import {Route} from "react-router-dom";
import SpotsIndex from "./components/SpotsIndex";
import SpotDetails from "./components/SpotDetails";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SpotsIndex />
          </Route>
          <Route exact path="/spots/new">
            <h1>Create a new Spot</h1>
          </Route>
          <Route exact path="/spots/:spotId/edit">
            <h1>Edit Form</h1>
          </Route>
          <Route exact path="/spots/:spotId">
            <h3>Spot Details</h3>
            <SpotDetails />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
