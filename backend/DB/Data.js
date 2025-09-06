const mongoose = require('mongoose');
const validator = require("validator");
require('dotenv').config();


mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ Database connected'))
  .catch(err => console.error('❌ DB connection error:', err));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: {
    type: String, required: true, unique: true,
    validate: validator.isEmail
  },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, default: 'user', enum: ['user', 'admin'] },
  creatAT: { type: Date, default: Date.now }
});

const versionSchema = new mongoose.Schema({
  versionNumber: { type: Number, required: true },
  fileUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const commentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  project: { type: String, required: true },
  keywords: { type: [String], default: [] },
  summary: { type: String, default: '' },
  comments: { type: [commentSchema], default: [] },
  versions: { type: [versionSchema], default: [] },
  fileUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Document = mongoose.model('Document', documentSchema);

module.exports = { User, Document };
