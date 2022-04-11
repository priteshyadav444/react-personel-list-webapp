import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./components/AppNavbar";
import ShopingList from "./components/ShopingList";
import { Provider } from "react-redux";
import store from "./store";
import ItemModal from "./components/ItemModal";
import { loadUser } from "./action/authAction";
import React, { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [loadUser]);
  // useEffect(() => {
  //   store.dispatch(async function () {
  //     await loadUser();
  //   });
  // }, [loadUser]);

  return (
    <Provider store={store}>
      <div>
        <AppNavbar />
        <ShopingList />
        <ItemModal />
      </div>
    </Provider>
  );
}

export default App;
