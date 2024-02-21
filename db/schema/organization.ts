import { Schema } from "mongoose";

const organizationSchema = new Schema({
  name: String,
  company: String,
  timestamp: Number,
  owner: String,
});

export default organizationSchema;
