import mongoose from 'mongoose';


const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        'https://www.wearemarketing.com/media/cache/dynamic/rc/VsD7aTMT//uploads/media/default/0001/21/8bcacf6ee1ac43959288f6f80c669191324bbc36.jpeg',
    },
    category: {
      type: String,
      default: 'uncategorized',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
const Post = mongoose.model('Post', postSchema);
export default Post;