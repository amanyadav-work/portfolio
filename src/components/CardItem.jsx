import React from 'react'
import { motion } from "framer-motion";

import Button from './Button';
import './styles/CardItem.css'

const CardItem = ({ image, title, url, actionLabel }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.05 }}
        className="card first-childern" >
        <img src={image} width='400' height='250' className="card-img-top position-absolute h-100 object-fit-cover" alt={title}/>

        <div className="card-body z-3 d-flex justify-content-end flex-column" style={{ boxShadow: "inset 0px -50px 100px -27px #000000" }}>
          <h5 className="card-title opacity-100 gradient-title1 g-yellow">{title}</h5>
          <Button label={actionLabel || "See Live"} href={url} className=" transparent-btn " backgroundColor="transparent" color="yellow" />

        </div>


      </motion.div>

    </>
  )
}

export default CardItem
