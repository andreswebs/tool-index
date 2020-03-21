const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden')();
const uniqueValidator = require('mongoose-unique-validator');
const xssFilters = require('xss-filters');

// the Tool model will sanitize user inputs that can be published to a front-end client

const ToolSchema = new mongoose.Schema({
  title: { 
    type: String,
    maxlength: [ 120, 'Exceeded maximum length: 120 characters' ],
    trim: true,
    required: true,
    unique: true
  },
  link: { 
    type: String,
    default: '',
    maxlength: [240, 'Exceeded maximum length: 120 characters' ],
    trim: true
  },
  description: { 
    type: String,
    default: '',
    maxlength: [2400, 'Exceeded maximum length: 2400 characters' ],
    trim: true
  },
  tags: [
    { 
      type: String,
      maxlength: [ 60, 'Exceeded maximum length: 60 characters'  ],
      trim: true,
      lowercase: true
    }
  ]
}, { timestamps: true });

// enable 'id' property via virtual getter
// https://mongoosejs.com/docs/guide.html#virtuals
ToolSchema.set('toJSON', { virtuals: true });
ToolSchema.set('toObject', { virtuals: true });

// hide _id,  __v, and timestamp properties from responses
ToolSchema.plugin(mongooseHidden, { hidden: { createdAt: true, updatedAt: true } });

ToolSchema.plugin(uniqueValidator);

// apply xss-filters to user inputs that will be published to front-end
ToolSchema.pre('save', function (next) {

  const tool = this;

  const props = Object.keys(tool);

  try {
    // sanitize relevant properties
    for (let prop of props) {
      
      if (prop === 'title' || prop === 'description') {
        tool[prop] = xssFilters.inHTMLData(tool[prop]);
      }

      if (prop === 'link') {
        tool[prop] = xssFilters.uriComponentInHTMLData(tool[prop]);
      }

      if (prop === 'tags') {
        tool[prop].map(tag => xssFilters.inHTMLData(tag));
      }

    }
  }

  catch (error) {
    return next(error);
  }
  
  return next();
});

const Tool = mongoose.model('Tool', ToolSchema);

module.exports = Tool;