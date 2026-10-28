const express = require("express");

const router = express.Router();

const db = require("../config/database");


// ============================================================
// CREATE BOOKING
// ============================================================

router.post("/", async (req, res) => {

  try {

    const {
      customer_name,
      customer_phone,
      event_type,
      event_date,
      appliance_id,
      appliance_name,
      quantity,
      quoted_amount,
      location,
      notes,
    } = req.body;

    console.log("📥 BOOKING PAYLOAD:", req.body);

    if (!customer_name || !customer_phone || !event_date) {
      return res.status(400).json({
        message: "Please fill in all required fields.",
        missing: {
          customer_name: !customer_name,
          customer_phone: !customer_phone,
          event_date: !event_date,
        },
      });
    }

    if (!appliance_id && !appliance_name) {
      return res.status(400).json({
        message: "Please select at least one appliance.",
      });
    }

    let resolvedApplianceId = appliance_id || null;
    let resolvedApplianceName = appliance_name || null;
    let resolvedQuantity = Number(quantity) || 1;
    let total_amount = Number(quoted_amount) || 0;

    if (appliance_id) {
      const [appliances] = await db.query(
        "SELECT * FROM appliances WHERE id = ?",
        [appliance_id]
      );

      if (appliances.length === 0) {
        return res.status(404).json({ message: "Appliance not found." });
      }

      const appliance = appliances[0];

      if (resolvedQuantity > appliance.available_quantity) {
        return res.status(400).json({
          message: `Only ${appliance.available_quantity} units are currently available.`,
        });
      }

      total_amount = Number(appliance.price) * resolvedQuantity;
      resolvedApplianceName = appliance.name;
    }

    const [result] = await db.query(
      `
      INSERT INTO bookings
      (
        customer_name,
        customer_phone,
        event_type,
        event_date,
        appliance_id,
        appliance_name,
        quantity,
        total_amount,
        quoted_amount,
        location,
        message,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
      `,
      [
        customer_name,
        customer_phone,
        event_type || null,
        event_date,
        resolvedApplianceId,
        resolvedApplianceName,
        resolvedQuantity,
        total_amount,
        total_amount,
        location || null,
        notes || null,
      ]
    );

    res.status(201).json({
      message: "Booking request submitted successfully.",
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
      error: error.message,
    });

  }

});


// ============================================================
// GET ALL BOOKINGS
// ============================================================

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM bookings ORDER BY id DESC"
    );
    res.json(rows);
  } catch (error) {
    console.error("BOOKING DATABASE ERROR:", error);
    res.status(500).json({
      message: "Failed to retrieve bookings",
      error: error.message,
    });
  }
});


// ============================================================
// UPDATE BOOKING STATUS
// ============================================================

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
      return res.status(400).json({ message: "Invalid booking status." });
    }

    const [result] = await db.query(
      `UPDATE bookings SET status = ? WHERE id = ?`,
      [status, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res.json({ message: "Booking status updated successfully." });

  } catch (error) {
    console.error("Update booking error:", error);
    res.status(500).json({ message: "Failed to update booking." });
  }
});


// ============================================================
// DELETE BOOKING
// ============================================================

router.delete("/:id", async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM bookings WHERE id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res.json({ message: "Booking deleted successfully." });

  } catch (error) {
    console.error("Delete booking error:", error);
    res.status(500).json({ message: "Failed to delete booking." });
  }
});


module.exports = router;