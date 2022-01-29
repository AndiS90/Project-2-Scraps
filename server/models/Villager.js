const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const villagerSchema = new Schema({
    villagerUser: {
        type: String,
        // required: true,
        trim: true,
      },
    name: {
        type: String,
        // required: true,
      },
    apiId: {
        type: Number,
        // required: true,
    },
    birthdayStr: {
      type: String,
      // required: true,
    },
    species: {
      type: String,
      // required: true,
    },
    icon: {
      type: String,
    },
    image: {
      type: String,
    },
    saying: {
      type: String,
      // required: true,
    },
    personality: {
      type: String,
      // required: true,
    },
    comments: [
      {
        commentText: {
          type: String,
          // required: true,
          minlength: 1,
          maxlength: 280,
        },
        commentAuthor: {
          type: String,
          // required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
          get: (timestamp) => dateFormat(timestamp),
        },
      },
    ],
  });

const Villager = model('Villager', villagerSchema);


module.exports = Villager;