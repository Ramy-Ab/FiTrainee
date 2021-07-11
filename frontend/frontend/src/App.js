import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import FoodAiScreen from "./screens/FoodAiScreen";
import HomePageScreen from "./screens/HomePageScreen/HomePageScreen";
import Dashboard from "./screens/Dashboard";
import TraineeScreen from "./screens/TraineeScreen";
import traineeOrderScreen from "./screens/traineeOrderScreen";
import ObjectifScreen from "./screens/ObjectifScreen";
import ProgressScreen from "./screens/ProgressScreen";

import React from "react";

function App() {
  return (
    <Router>
      {window.location.href.split("/")[4] === "dashboard" ? "" : <NavBar />}
      <main className=" mt-5 py-3-main">
        <Route path="/dashboard" component={Dashboard} exact />
        <Route path="/shop" component={HomeScreen} exact />
        <Route path="/" component={HomePageScreen} exact />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} exact />
        <Route path="/trainee" component={TraineeScreen} exact />
        <Route path="/trainee/orders" component={traineeOrderScreen} />
        <Route path="/trainee/objectif" component={ObjectifScreen} />
        <Route path="/trainee/progress" component={ProgressScreen} />

        <Route path="/profile" component={ProfileScreen} />
        <Route path="/shipping" component={ShippingScreen} />
        <Route path="/placeorder" component={PlaceOrderScreen} />
        <Route path="/order/:id" component={OrderScreen} />
        <Route path="/payment" component={PaymentScreen} />
        <Route path="/product/:id" component={ProductScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/foodai" component={FoodAiScreen} />
        <Route path="/admin/userlist" component={UserListScreen} />
        <Route path="/admin/user/:id/edit" component={UserEditScreen} />

        <Route path="/admin/productlist" component={ProductListScreen} />
        <Route path="/admin/product/:id/edit" component={ProductEditScreen} />

        <Route path="/admin/orderlist" component={OrderListScreen} />
      </main>
      {window.location.href.split("/")[4] === ""
        ? console.log("true")
        : console.log("false")}

      {window.location.href.split("/")[4] === "" ? <Footer /> : ""}
    </Router>
  );
}

export default App;
