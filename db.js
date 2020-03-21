require('dotenv').config();
const mongoose = require('mongoose');
const debug = require('debug')('database');

async function connect () {

  // using options to fix deprecations:
  // https://mongoosejs.com/docs/deprecations.html
  const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  };

  try {

    if (!process.env.DB_HOST) {
      throw new Error('missing environment variable: DB_HOST');
    }

    const db = await mongoose.connect(
      process.env.DB_HOST,
      options
    ).then(connected => {
      debug('Connected');
      return connected;
    });
    
  
    db.connection.on(
      'error', 
      console.error.bind(console, 'Database connection error:')
    );
  
    return db;
  }

  catch(error) {
    debug(error.toString());
    process.exit(1);
  }
  

}

module.exports = { connect };