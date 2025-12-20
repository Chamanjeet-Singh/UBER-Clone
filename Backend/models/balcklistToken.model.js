import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // TTL index: documents expire 24 hours (60 * 60 * 24 seconds) after `createdAt`
    expires: 60 * 60 * 24,
  },
});

const BlacklistToken = mongoose.model("BlacklistToken", blacklistTokenSchema);

export default BlacklistToken;
 
