const router = require("express").Router();
const Question = require("../models/Type.js"); // Schema based on the problem statement
const questions = require("../config/speakx_questions.json"); // JSON data

// Search questions endpoint
router.post("/questions", async (req, res) => {
    try {
        const { query, page = 1, limit = 10 ,type} = req.body;
        
        const type1 = type || "";
        const search = query || ""; // Search query from the frontend
        const pageNumber = parseInt(page) - 1 || 0;
        const itemsPerPage = parseInt(limit) || 10;

        // Search the database for questions matching the query
        const results = await Question.find({
            title: { $regex: search, $options: "i" }, // Search by title (case-insensitive),
            type: {$regex : type1, $options:"i"}
        })
            .skip(pageNumber * itemsPerPage) // Pagination: skip documents
            .limit(itemsPerPage); // Limit results

        // Get the total count of matching questions
        const total = await Question.countDocuments({
            title: { $regex: search, $options: "i" },
            type: {$regex : type1, $options:"i"}
        });

        // Response structure
        const response = {
            error: false,
            total,
            currentPage: pageNumber + 1,
            limit: itemsPerPage,
            questions: results,
        };

        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

// Insert initial questions into the database
const insertQuestions = async () => {
    try {
        // const docs = await Question.insertMany(questions);
        console.log("hi it is working.");
    } catch (err) {
        console.error("Error inserting questions:", err);
    }
};

// Insert questions on server startup
insertQuestions();

// Export the router
module.exports = router;
