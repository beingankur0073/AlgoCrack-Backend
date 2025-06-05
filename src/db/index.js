import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import Problems from '../constants/questions.js'
import Problem from "../models/problem.models.js";

// db is on another continent

const connectDB=async()=>{
    try{
        //         for (const [pIndex, problem] of Problems.entries()) {
        //   for (const [tcIndex, testCase] of problem.testCases.entries()) {
        //     if (!testCase.expectedOutput || typeof testCase.expectedOutput !== "string") {
        //       console.warn(`⚠️ Problem[${pIndex}] "${problem.title}" testCase[${tcIndex}] is missing expectedOutput.`);
        //     }
        //   }
        // }

    const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
    // await Problem.insertMany(Problems);
    // console.log(`🎉 Successfully imported ${questions.length} problems!`)
    }
    catch(error){
        console.log("MONGODB connection failure",error);
        process.exit(1);
    }
}


export default connectDB;