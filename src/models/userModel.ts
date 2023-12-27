import mongoose, { Model, Schema } from "mongoose";
import connectDB from "@/database/dbConfig";

connectDB();

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter a username"],
    },
    email: {
        type: String,
        required: [true, "Please enter a email address"],
    },
    authentication: {
        password: {
            type: String,
            required: [true, "Please enter a password"],
            select: false
        },
        salt: {
            type: String,
            select: false,
        },
        sessionToken: {
            type: String,
            select: false,
        },
    },
    totalLikes: {
        type: Number,
        default: 0, // Set a default value if not provided
        required: true,
    },
    totalDisLikes: {
        type: Number,
        default: 0,
        required: true,
    },
    totalSolved: {
        type: Number,
        default: 0,
        required: true,
    },
    problemList: {
        type: [
            {
                _id: {
                    type: Schema.Types.ObjectId,
                    required: true,
                },
                like: {
                    type: Boolean,
                    default: false,
                },
                dislike: {
                    type: Boolean,
                    default: false,
                },
                favorite: {
                    type: Boolean,
                    default: false,
                },
                solved: {
                    type: Boolean,
                    default: false,
                },
                solvedAnswer: {
                    type: String,
                    default: "",
                },
            },
        ],
        select: true,
    },
   
});

let userModel : Model<any>;

try {
    userModel = mongoose.model('users');
} catch {
    userModel = mongoose.model('users', userSchema);  
}


//actions
export const getUsers = () => userModel.find();
export const getUserByEmail = (email : string) => userModel.findOne({email});
export const getUserBySessionToken = (sessionToken : string) => userModel.findOne({"authentication.sessionToken" : sessionToken});
export const getUserById = (id : string) => userModel.findById(id);
export const createUser = (values: Record<string, any>) => new userModel(values).save().then((user: any) => user.toObject());
export const deleteUserById = (id : string) => userModel.findByIdAndDelete({_id : id});
export const updateUserById = (id : string , value : Record<any,any>) => userModel.findByIdAndUpdate(id, value);

  