const { Schema, model, Types } = require('mongoose');

// Create Reaction Schema
const ReactionsSchema = new Schema(
    {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function() {
            return new Date().toISOString();
        },
    }
    },
    {
    toJSON: {
        getters: true
    } 
    }
);

// Create Thouhght Schema
const ThoughtSchema = new Schema(
    {
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function() {
            return new Date().toISOString();
        },    
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionsSchema]
    },
    {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
    }
);

// Count reactions
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// Initialize the Thought model
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;