import { Schema, model, Document } from 'mongoose';

export interface CategoryDocument extends Document {
  id: String,
  name: String
}

const CategorySchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  name: {
    type: String,
    require: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

const Category = model<CategoryDocument>('category', CategorySchema);
export default Category;
