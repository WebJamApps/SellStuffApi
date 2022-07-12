import mongoose from 'mongoose';

const options = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const { Schema } = mongoose;

const blogSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, required: false },
  author: { type: String, required: false },
  dateOfPub: { type: Number, required: false },
  body: { type: String, required: true },
}, options);

export default mongoose.model('Blog', blogSchema);
