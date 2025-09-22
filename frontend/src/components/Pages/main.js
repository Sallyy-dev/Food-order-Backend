import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import image from "../../images/408da7d640abc99b6edf6290110ecf4a706ecaa8 (2).png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../../UI/main.css";

function Main() {
  const navigate = useNavigate();

  const orderMenue = () => {
    navigate("/menue");
  };

  return (
    <>
      <div className="section-one">
        <div className="shadow"></div>
        <Container maxWidth="xl">
          <div className="section">
            
            <motion.div
              initial={{ opacity: 0, y: -80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="section-title">
                <div className="title">
                  <h2>
                    Feast Your Senses,<span>Fast and Fresh</span>
                  </h2>
                </div>

                <div className="order">
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={orderMenue}
                  >
                    Order Now!
                  </Button>
                </div>
              </div>
            </motion.div>

           
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="image-part">
                <div className="burger-image">
                  <img src={image} alt="burger" />
                </div>

                <div className="rating-card">
                  <h3>3.4 ⭐</h3>
                  <p>1,200 reviews</p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Main;
