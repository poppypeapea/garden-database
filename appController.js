const express = require('express');
const appService = require('./appService');

const router = express.Router();

// ----------------------------------------------------------
// API endpoints
// Modify or extend these routes based on your project's needs.
router.get('/check-db-connection', async (req, res) => {
    const isConnect = await appService.testOracleConnection();
    if (isConnect) {
        res.send('connected');
    } else {
        res.send('unable to connect');
    }
});

router.get('/housepeople', async (req, res) => {
    const tableContent = await appService.fetchHousePeopleFromDb();
    res.json({ data: tableContent });
});

router.get('/plant', async (req, res) => {
    const tableContent = await appService.fetchPlantsFromDb();
    res.json({ data: tableContent });
})

router.get('/harvest', async (req, res) => {
    const tableContent = await appService.fetchHarvestFromDb();
    res.json({ data: tableContent });
});

router.post('/filter', async (req, res) => {
    const { plantid, harvestid, qty, harvestDate, compare } = req.body;
    const filterResult = await appService.filterHarvest(plantid, harvestid, qty, harvestDate, compare);
    if (filterResult !== null) {
        res.json({ data: filterResult, success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.get('/garden', async (req, res) => {
    const tableContent = await appService.fetchGardenFromDb();
    res.json({ data: tableContent });
});

router.get('/workson', async (req, res) => {
    const tableContent = await appService.fetchWorksOnFromDb();
    res.json({ data: tableContent });
});

router.post('/division', async (req, res) => {
    const { username } = req.body;
    const divisionResult = await appService.findDivision(username);
    if (divisionResult !== null) {
        res.json({ data: divisionResult, success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

// Route to handle fetching garden data
router.post('/project', async (req, res) => {
    const { garden_name, garden_loc, soil_type, garden_size } = req.body;
    // name is database
    let selectedColumns = [];
    if (garden_name) selectedColumns.push('gardenName');
    if (garden_loc) selectedColumns.push('loc');
    if (soil_type) selectedColumns.push('soilType');
    if (garden_size) selectedColumns.push('gardenSize');

    try {
        const data = await appService.fetchGardenProjFromDb(selectedColumns);
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: `Error fetching data from database: ${error.message}` });
    }
});

/**
 * ALL API ENDPOINTS RELATED TO WATERING
 */

// For fetching watering entries from R2 and R1
router.get('/watering', async (req, res) => {
    const tableContent = await appService.fetchWateringFromDb();
    res.json({ data: tableContent });
});
// For fetching watering entries from R2
router.get('/wateringR2', async (req, res) => {
    const tableContent = await appService.fetchWateringR2FromDb();
    res.json({ data: tableContent });
});
// For fetching watering entries from R1
router.get('/wateringR1', async (req, res) => {
    const tableContent = await appService.fetchWateringR1FromDb();
    res.json({ data: tableContent });
});
// Inserting into watering R2 and R1
router.post('/insertWatering', async (req, res) => {
    const { wateringId, pH, temperature, wateringDate, amount, plantId } = req.body;
    const insertResult = await appService.insertWatering(wateringId, pH, temperature, wateringDate, amount, plantId);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});
// Deleting WateringR1 and cascading it to WateringR2
router.post('/deleteWatering', async (req, res) => {
    const { wateringDate, temperature, pH } = req.body;
    const deleteResult = await appService.deleteWatering(wateringDate, temperature, pH);
    if (deleteResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});
// Update Tuple in WateringR2
router.post('/updateWateringR2', async (req, res) => {
    const { wateringId, wateringDate, temperature, pH, plantId } = req.body;
    const updateResult = await appService.updateWateringR2(wateringId, wateringDate, temperature, pH, plantId);
    if (updateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});
// Group By COUNT() in WateringR2
router.post('/groupbywateringR2', async (req, res) => {
    const { orderBy } = req.body;
    const groupByResult = await appService.groupByWateringR2(orderBy);
    res.json({ data: groupByResult });
});
// Having COUNT() in WateringR2
router.post('/havingWateringR2', async (req, res) => {
    const { havingQuery, numEntries } = req.body;
    const havingResult = await appService.havingWateringR2(havingQuery, numEntries);
    res.json({ data: havingResult });
});
// Nested aggregation for joined WateringR1 and WateringR2
router.post('/nestedaggregation', async (req, res) => {
    const { query } = req.body;
    const nestedaggregationResult = await appService.nestedAggregation(query);
    if (nestedaggregationResult !== null) {
        res.json({ data: nestedaggregationResult, success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

module.exports = router;