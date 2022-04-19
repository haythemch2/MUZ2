const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const Reservation = mongoose.model("reservation");


router.get("/getByReservedFor", requireLogin, async (req, res) => {
  const id = req.user._id;
  try {
    const data =await Reservation.find({
     
    })
    console.log({data});
    return res.json(data)
  } catch (e) {
    console.log({e});
    return res.json([])
  }
});

router.post("/", async (req, res) => {
  const reservation = req.body;
  try {
    const data = await Reservation.create(reservation)
    return res.json(data)
  } catch (e) {
    return res.sendStatus(500)
  }
});

router.put("/", requireLogin, async (req, res) => {
  const { reservationId, state } = req.query;
  console.log({ reservationId, state });
  try {
    await Reservation.findOneAndUpdate({
      _id: reservationId
    }, { $set: {  state } })
    return res.sendStatus(200);
  } catch (e) {
    return res.sendStatus(500);
  }
});


module.exports = router;
