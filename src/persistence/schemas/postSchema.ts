import { IPostPersistence } from '../../dataschema/IPostPersistence';
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      unique: true,
    },

    userId: {
      type: String,
      required: [true, 'It is mandatory to supply userId for posts'],
      index: true,
    },

    content: {
      type: String,
      minlength: 1,
      maxlength: 10000,
      required: [true, 'Empty posts are not allowed'],
    },

    tags: [
      {
        type: String,
        minlength: 1,
        maxlength: 255,
      },
    ],

    reactions: [
      {
        userId: {
          type: String,
          required: [true, 'It is mandatory to supply userId for reactions'],
          sparse: true,
        },
        reactionType: {
          type: String,
          required: [true, 'It is mandatory to supply a reactionType'],
        },

        createdAt: {
          type: Date,
          immutable: true,
          default: Date.now(),
        },

        updatedAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],

    comments: [
      {
        userId: {
          type: String,
          required: [true, 'It is mandatory to supply userId for comments'],
        },

        content: {
          type: String,
          required: [true, 'Empty comments are not allowed'],
        },

        tags: [
          {
            type: String,
            minlength: 1,
            maxlength: 255,
          },
        ],

        createdAt: {
          type: Date,
          immutable: true,
          default: Date.now(),
        },

        updatedAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model<IPostPersistence & mongoose.Document>('Post', PostSchema);
