import "./App.css";
import { Routes, Route } from "react-router-dom";

import ResponsiveAppBar from "./components/Bars/ResponsiveAppBar";
import Main from "./components/Pages/main";
import Categories from "./components/Pages/Categories";
import CustomerReviews from "./components/Pages/Review";
import Footer from "./components/Pages/Footer";
import SignupForm from "./components/Register/Signup";
import LoginForm from "./components/Register/Login";
// import CartSidebar from './components/Sidebar';
import Menu from "./components/Menue/Menue";
import FoodCard from "./components/FoodDetails/FoodCard";
import Checkout from "./components/Orders/Checkout";
import MyOrders from "./components/Orders/MyOrders";
import ContactUs from "./components/Pages/ContactUs";
import MapWithCard from "./components/Pages/MapWithCard";
import SplashScreen from "./components/Pages/Splash";

function App() {
  return (
    <div className="App">
      <SplashScreen />
      <ResponsiveAppBar />

      {/* <CartSidebar /> */}

      {/* <OurMenue/> */}
      <Routes>
        <Route path="/menue" element={<Menu />} />
        <Route path="/products" element={<FoodCard />} />
        <Route path="/food/:id" element={<FoodCard />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route
          path="/"
          element={
            <>
              <Main />
              <Categories />
              <CustomerReviews />
              {/* <Footer /> */}
            </>
          }
        />

        <Route path="/register" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        {/* <Route path="/logout" element={<LogoutButton />} /> */}
      </Routes>
      <MapWithCard />
      <Footer />
    </div>
  );
}

export default App;
