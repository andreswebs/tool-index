import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import xssFilters from 'xss-filters';
import mongooseHiddenSetup from 'mongoose-hidden';

const mongooseHidden = mongooseHiddenSetup();

const ToolSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxlength: [120, 'Exceeded maximum length: 120 characters'],
      trim: true,
      required: true,
      unique: true,
    },
    link: {
      type: String,
      default: '',
      maxlength: [240, 'Exceeded maximum length: 120 characters'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
      maxlength: [2400, 'Exceeded maximum length: 2400 characters'],
      trim: true,
    },
    tags: [
      {
        type: String,
        maxlength: [60, 'Exceeded maximum length: 60 characters'],
        trim: true,
        lowercase: true,
      },
    ],
  },
  { timestamps: true }
);

// enable 'id' property via virtual getter
// https://mongoosejs.com/docs/guide.html#virtuals
ToolSchema.set('toJSON', { virtuals: true });
ToolSchema.set('toObject', { virtuals: true });

// hide _id,  __v, and timestamp properties from responses
ToolSchema.plugin(mongooseHidden, {
  hidden: { createdAt: true, updatedAt: true },
});

ToolSchema.plugin(uniqueValidator);

// apply xss-filters to user inputs that will be published to front-end
ToolSchema.pre('save', function (next) {
  const props = Object.keys(this);

  try {
    // sanitize relevant properties
    for (const prop of props) {
      if (prop === 'title' || prop === 'description') {
        this[prop] = xssFilters.inHTMLData(this[prop]);
      }

      if (prop === 'link') {
        this[prop] = xssFilters.uriComponentInHTMLData(this[prop]);
      }

      if (prop === 'tags') {
        this[prop].map((tag) => xssFilters.inHTMLData(tag));
      }
    }
  } catch (error) {
    return next(error);
  }

  return next();
});

const Tool = mongoose.model('Tool', ToolSchema);

export default Tool;
