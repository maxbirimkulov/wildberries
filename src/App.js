import React, {Suspense} from "react";
import {Routes, Route} from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import './i18n'
import Referals from "./Pages/Referals/Referals";
import Order from "./Pages/Order/Order";
import Storage from "./Pages/Storage/Storage";

function App() {
  return (
      <Suspense fallback={'Loading...'}>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path='' element={<Home/>}/>
            <Route path='/referals' element={<Referals/>}/>
            <Route path='/order' element={<Order/>}/>
            <Route path='/storage' element={<Storage/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Route>
        </Routes>
      </Suspense>
  );
}

export default App;
