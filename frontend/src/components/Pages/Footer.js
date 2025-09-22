import React from "react";
import { Link } from "react-router-dom"; 
import "../../UI/footer.css";

function Footer() {
  return (
    <footer className="text-center text-lg-start">
      {/* Links Section */}
      <section>
        <div className="container text-center text-md-start">
          <div className="row">
            {/* Company */}
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6>Order</h6>
              <p>
                Here you can use rows and columns to organize your footer content.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>

            {/* Products */}
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6>Products</h6>
              <p><Link to="/menue">Food</Link></p>
              <p><Link to="/menue">Drinks</Link></p>
              <p><Link to="/menue">Deserts</Link></p>
              <p><Link to="/menue">Sauces</Link></p>
            </div>

            {/* Useful links */}
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6>Useful links</h6>
              <p><Link to="/">Home</Link></p>
              <p><Link to="/menue">Menue</Link></p>
              <p><Link to="/my-orders">Orders</Link></p>
              <p><Link to="/contact">Contact-US</Link></p>
            </div>

            {/* Contact */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6>Contact</h6>
              <p><i className="fas fa-home"></i> New York, NY 10012, US</p>
              <p><i className="fas fa-envelope"></i> info@example.com</p>
              <p><i className="fas fa-phone"></i> + 01 234 567 88</p>
              <p><i className="fas fa-print"></i> + 01 234 567 89</p>
            </div>
          </div>
        </div>
      </section>

      {/* Copyright */}
      <div className="text-center">
        © 2025 Copyright:
        <Link to="/"> YourWebsite.com</Link>
      </div>
    </footer>
  );
}

export default Footer;

