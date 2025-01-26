const mongoose = require('mongoose');

// Schema for blocks within anagrams
const blockSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    showInOption: {
        type: Boolean,
        required: true,
    },
    isAnswer: {
        type: Boolean,
        required: true,
    },
});

// Main schema for anagrams
const anagramSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            set: (value) => {
                // Handle cases where _id is provided as { "$oid": "value" }
                if (value && typeof value === 'object' && value.$oid) {
                    return new mongoose.Types.ObjectId(value.$oid);
                }
                // Cast directly to ObjectId if it's a string
                return new mongoose.Types.ObjectId(value);
            },
        },
        type: {
            type: String,
            required: true,
          
        },
        anagramType: {
            type: String,
            required: false,
        },
        blocks: {
            type: [blockSchema],
            required: false,
        },
        options: {
            type: [
                new mongoose.Schema({
                    text: String,
                    isCorrectAnswer: Boolean,
                }),
            ],
            required: false,
        },
        siblingId: {
            type: mongoose.Schema.Types.ObjectId,
            set: (value) => {
                if (value && typeof value === 'object' && value.$oid) {
                    return new mongoose.Types.ObjectId(value.$oid);
                }
                return value ? new mongoose.Types.ObjectId(value) : null;
            },
        },
        solution: {
            type: String,
            required: false
        },
        title: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Creating and exporting the Mongoose model
const Type = mongoose.model('Type', anagramSchema);

module.exports = Type;
