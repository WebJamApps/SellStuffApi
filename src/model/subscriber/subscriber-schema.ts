import mongoose from 'mongoose';

const options = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const { Schema } = mongoose;

const subscriberSchema = new Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  street: { type: String, required: false },
  city: { type: Number, required: false },
  state: { type: String, required: false },
  zip: { type: String, required: false },
  phone: { type: Number, required: false },
  verified: { type: Number }, // send code to user email with link to verify
  connection: { type: String, required: false },
}, options);

export default mongoose.model('Subscriber', subscriberSchema);
