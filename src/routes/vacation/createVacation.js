const express = require('express');
const openai = require('openai');
const router = express.Router();
// POST /vacation
router.post('/', (req, res) => {
    // Handle creating a new vacation
    // You can access request data using req.body

    // Example: Create a new vacation in the database
    const newVacation = {
        destination: req.body.destination,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        // Add more properties as needed
    };

    // TODO: Save the new vacation to the database

    // Generate vacation route using ChatGPT
    const gptResponse = openai.complete({
        engine: 'text-davinci-003',
        prompt: `Create a vacation route for ${newVacation.destination}`,
        maxTokens: 100,
        temperature: 0.7,
        n: 1,
        stop: '\n'
    });

    // Extract the generated route from the response
    const generatedRoute = gptResponse.choices[0].text.trim();

    // Return a success response with the generated route
    res.status(201).json({ message: 'Vacation created successfully', vacation: newVacation, route: generatedRoute });
});

module.exports = router;
