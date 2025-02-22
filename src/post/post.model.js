import {Schema, model} from 'mongoose';

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    auth:
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    status: {
        type: Boolean,
        default: true
    }
});

postSchema.methods.toJSON = function(){
    const {password, _id, ...post} = this.toObject()
    post.pid = _id
    return post
}

export default model('Post', postSchema);

