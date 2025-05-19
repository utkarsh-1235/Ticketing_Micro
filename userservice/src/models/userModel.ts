import mongoose from "mongoose";
import { Password } from "../services/password";

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
},{
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id;
            delete ret.password;
            delete ret._v
        }
    }
})

userSchema.pre('save', async function (done){
    if(this.isModified('password')){
        const hashed = await Password.tohash(this.get('password'));
        this.set('password', hashed);
    }
    done();
})

const userModel = mongoose.model<userDocument, userModel>('User', userSchema);


userSchema.statics.build = (attrs: UserAttrs) => {
    return new userModel(attrs);
}

export {userModel};  