import mongoose from 'mongoose';

const FormSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  name: {
    type: String,
    required: [true, 'Please provide a name for this organization.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone number cannot be more than 20 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email for this organization.'],
    maxlength: [100, 'Email cannot be more than 100 characters'],
  },
  domain: {
    type: String,
    maxlength: [100, 'Domain cannot be more than 100 characters'],
  },
  ipAddress: {
    type: String,
    maxlength: [45, 'IP address cannot be more than 45 characters'],
  },
  cryptoAddress: {
    type: String,
    maxlength: [100, 'Crypto address cannot be more than 100 characters'],
  },
  services: {
    darkWeb: {
      type: Boolean,
      default: false,
    },
    companyImpersonation: {
      type: Boolean,
      default: false,
    },
    threatIntelligence: {
      type: Boolean,
      default: false,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Form || mongoose.model('Form', FormSchema);