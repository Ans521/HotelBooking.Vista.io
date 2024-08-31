const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  hotel: { type: Schema.Types.ObjectId, ref: 'Accommodation', required: true },
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
