import mongoose from "mongoose";

interface UserAttrs{
   email: string ;
   password: string ;
}

interface userModel extends mongoose.Model<userDocument>{
    build(attrs: UserAttrs): userDocument;
}

interface userDocument extends mongoose.Document{
    email: string,
    password: string,
    updatedAt: String
}
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const userModel = mongoose.model<userDocument, userModel>('User', userSchema);


userSchema.statics.build = (attrs: UserAttrs) => {
    return new userModel(attrs);
}

export {userModel};