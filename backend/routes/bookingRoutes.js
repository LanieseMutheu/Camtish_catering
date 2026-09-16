const express = require("express");

const router = express.Router();

const db = require("../config/database");


// CREATE BOOKING
router.post("/", async (req, res) => {

  try {

    const {
      customer_name,
      customer_email,
      customer_phone,
      event_type,
      event_date,
      appliance_id,
      quantity,
      notes,
    } = req.body;


    // Basic validation

    if (
      !customer_name ||
      !customer_email ||
      !customer_phone ||
      !event_date ||
      !appliance_id ||
      !quantity
    ) {

      return res.status(400).json({
        message: "Please fill in all required fields.",
      });

    }


    // Get appliance

    const [appliances] = await db.query(
      "SELECT * FROM appliances WHERE id = ?",
      [appliance_id]
    );


    if (appliances.length === 0) {

      return res.status(404).json({
        message: "Appliance not found.",
      });

    }


    const appliance = appliances[0];


    // Check quantity

    if (quantity > appliance.available_quantity) {

      return res.status(400).json({
        message:
          `Only ${appliance.available_quantity} units are currently available.`,
      });

    }


    // Calculate total

    const total_amount =
      Number(appliance.price) * Number(quantity);


    // Save booking

    const [result] = await db.query(
      `
      INSERT INTO bookings
      (
        customer_name,
        customer_email,
        customer_phone,
        event_type,
        event_date,
        appliance_id,
        quantity,
        total_amount,
        notes
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        customer_name,
        customer_email,
        customer_phone,
        event_type,
        event_date,
        appliance_id,
        quantity,
        total_amount,
        notes || null,
      ]
    );


    res.status(201).json({

      message:
        "Booking request submitted successfully.",

      booking: {
        id: result.insertId,

        total_amount,

        status: "pending",
      },

    });


  } catch (error) {

    console.error("Create booking error:", error);

    res.status(500).json({
      message: "Failed to create booking.",
    });

  }

});


// GET BOOKINGS
router.get("/", async (req, res) => {

  try {

    const [bookings] = await db.query(`
      SELECT
        bookings.*,
        appliances.name AS appliance_name,
        appliances.category AS appliance_category
      FROM bookings
      INNER JOIN appliances
        ON bookings.appliance_id = appliances.id
      ORDER BY bookings.created_at DESC
    `);


    res.json(bookings);

  } catch (error) {

    console.error("Get bookings error:", error);

    res.status(500).json({
      message: "Failed to load bookings.",
    });

  }

});


// UPDATE BOOKING STATUS
router.patch("/:id/status", async (req, res) => {

  try {

    const { status } = req.body;


    const validStatuses = [
      "pending",
      "confirmed",
      "rejected",
      "completed",
      "cancelled",
    ];


    if (!validStatuses.includes(status)) {

      return res.status(400).json({
        message: "Invalid booking status.",
      });

    }


    const [result] = await db.query(
      `
      UPDATE bookings
      SET status = ?
      WHERE id = ?
      `,
      [
        status,
        req.params.id,
      ]
    );


    if (result.affectedRows === 0) {

      return res.status(404).json({
        message: "Booking not found.",
      });

    }


    res.json({
      message: "Booking status updated successfully.",
    });


  } catch (error) {

    console.error("Update booking error:", error);

    res.status(500).json({
      message: "Failed to update booking.",
    });

  }

});


// DELETE BOOKING
router.delete("/:id", async (req, res) => {

  try {

    const [result] = await db.query(
      "DELETE FROM bookings WHERE id = ?",
      [req.params.id]
    );


    if (result.affectedRows === 0) {

      return res.status(404).json({
        message: "Booking not found.",
      });

    }


    res.json({
      message: "Booking deleted successfully.",
    });


  } catch (error) {

    console.error("Delete booking error:", error);

    res.status(500).json({
      message: "Failed to delete booking.",
    });

  }

});


module.exports = router;