import {Schema, model} from 'mongoose';

const commentSchema = Schema({
    comment:{
        type: String,
        required: [true, "Comment is required"]
    },
    auth:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    post:{
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    }
},
{
    versionKey: false,
    timestamps: true
})

commentSchema.methods.toJSON = function(){
    const {_id, ...comment} = this.toObject()
    comment.cid = _id
    return comment
}

export default model('Comment', commentSchema);