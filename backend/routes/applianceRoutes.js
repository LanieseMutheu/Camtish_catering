// const express = require('express')
// const router = express.Router()
// const db = require('../config/database')

// /*
// GET ALL APPLIANCES
// */
// router.get('/', async (req, res) => {
//   try {
//     const [appliances] = await db.query(
//       'SELECT * FROM appliances ORDER BY created_at DESC'
//     )

//     res.json(appliances)
//   } catch (error) {
//     console.error(error)

//     res.status(500).json({
//       message: 'Failed to retrieve appliances'
//     })
//   }
// })

// /*
// GET ONE APPLIANCE
// */
// router.get('/:id', async (req, res) => {
//   try {
//     const [rows] = await db.query(
//       'SELECT * FROM appliances WHERE id = ?',
//       [req.params.id]
//     )

//     if (appliances.length === 0) {
//       return res.status(404).json({
//         message: 'Appliance not found'
//       })
//     }

//     res.json(rows[0])
//   } catch (error) {
//     console.error(error)

//     res.status(500).json({
//       message: 'Failed to retrieve appliance'
//     })
//   }
// })

// module.exports = router

const express = require("express");
const router = express.Router();

const db = require("../config/database");

// ======================================
// GET ALL APPLIANCES
// ======================================

router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM appliances"
        );

        console.log("Appliances retrieved:", rows);

        res.json(rows);

    } catch (error) {

        console.error("APPLIANCE DATABASE ERROR:");
        console.error(error);

        res.status(500).json({
            message: "Failed to retrieve appliances",
            error: error.message
        });
    }
});


// ======================================
// GET ONE APPLIANCE
// ======================================

router.get("/:id", async (req, res) => {

    try {

        const [rows] = await db.query(
            "SELECT * FROM appliances WHERE id = ?",
            [req.params.id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Appliance not found"
            });
        }

        res.json(rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to retrieve appliance",
            error: error.message
        });
    }
});


module.exports = router;