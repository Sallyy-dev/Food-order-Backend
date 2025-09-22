import React from "react";
import '../../UI/categories.css';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";  
import Rating from "@mui/material/Rating";
import { motion } from "framer-motion";

import image1 from '../../images/f273401861db130d47525cdbcf113bad91763c94.png';
import image2 from '../../images/773c61960d856bd6b70a825ca8cdb6eee4b81688.png';
import image3 from '../../images/53e9847480ccba9eb11af5abd3be5a6b914def0d.png';
import image4 from '../../images/5c9c3c0fbebb21d6d7bd08fb3850ede5c9eb9d9e.png';
import image5 from '../../images/a72461e43ce636c9a873a6a923e0ea5532729119.png';
import image6 from '../../images/1eb74c1099f1cab96bf53e18d686012e3aece6c7.png';

const categories = [
  { id: 1, name: "Burgers & Fast food", rating: 4.5, image: image1},
  { id: 2, name: "Salads", rating: 5, image: image2 },
  { id: 3, name: "Pasta & Casuals", rating: 4.2, image: image3 },
  { id: 4, name: "Pizza", rating: 5, image: image4 },
  { id: 5, name: "Breakfast", rating: 4.0, image: image5},
  { id: 6, name: "Soups", rating: 3, image: image6 },
  { id: 7, name: "Breads", rating: 5, image: image6 },
];

function Categories(){
  const navigate = useNavigate();

  const orderMenue = () => {
    navigate("/menue"); 
  };

  return (
    <section className="categories-section">
      <Container maxWidth="lg">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }} 
        >
          Popular Categories
        </motion.h2>

        <div className="categories-grid">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              className="category-card"
              initial={{ 
                opacity: 0, 
                y: index % 2 === 0 ? -50 : 50   
              }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true, amount: 0.2 }} 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.img 
                src={cat.image} 
                alt={cat.name} 
                className="category-img"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />

              <div className="category-info">
                <h3>{cat.name}</h3>
                <Rating
                  name="read-only"
                  value={cat.rating}
                  precision={0.5}
                  readOnly
                  size="small"
                />

                <div className="cate-btn">
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={orderMenue}
                    sx={{ backgroundColor:"#fc8a06" }}
                  >
                    View
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Categories;
