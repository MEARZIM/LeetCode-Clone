import mongoose, { Model } from "mongoose";
import connectDB from "@/database/dbConfig";

connectDB();

const problemSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      problemStatement: {
        type: String,
        required: true,
      },
      examples: [
        {
          id: {
            type: Number,
            required: true,
          },
          inputText: {
            type: String,
            required: true,
          },
          outputText: {
            type: String,
            required: true,
          },
          explanation: String,
        },
      ],
      constraints: {
        type: String,
        required: true,
      },
      difficulty: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      order: {
        type: Number,
        required: true,
      },
      videoId: {
        type: String,
        required: true,
      },
      starterCode: {
        type: String,
        required: true,
      },
});


let problemModel : Model<any>;

try {
    problemModel = mongoose.model('problems');
} catch {
    problemModel = mongoose.model('problems', problemSchema);  
}


//actions
export const getProblems = () => problemModel.find();
// export const getProblemByEmail = (email : string) => problemModel.findOne({email});
// export const getProblemBySessionToken = (sessionToken :string) => problemModel.findOne({"authentication.sessionToken" : sessionToken});
// export const getProblemById = (id : string) => problemModel.findById(id);
// export const createProblem = (values: Record<string, any>) => new problemModel(values).save().then((user: any) => user.toObject());
// export const deleteProblemById = (id : string) => problemModel.findByIdAndDelete({_id : id});
// export const updateProblemById = (id : string , value : Record<string,any>) => problemModel.findByIdAndUpdate(id, value);

  