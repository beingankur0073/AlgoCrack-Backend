import mongoose,{Schema} from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema=new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true, // for searching
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullName:{
            type:String,
            required:true,
            trim:true,
            index:true,
        },
        avatar:{
            type:String, //cloundnary url
            required:true,
        },
        coverImage:{
            type:String, //cloundnary url
        },
        password:{
            type:String,
            required:[true,'Password is required']
        },
        refreshToken:{
            type:String,
        },
        role: {
        type: String,
        enum: ['user', 'admin'], 
        default: 'user', 
    },
    },{
        timestamps:true // for created at and updated add
    }
)

// no arrow function
// just before save password gets encrypted>>>
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password=await bcrypt.hash(this.password,10);
    next();
})


// custom made method
userSchema.methods.isPasswordCorrect=async function (password){
  return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken= function (){
   return jwt.sign(
    {
    _id:this._id,
    email:this.email,
    username:this.username,
    fullname:this.fullname,
   },
   process.env.ACCESS_TOKEN_SECRET,
   {
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
   }
)
}

userSchema.methods.generateRefreshToken= function (){
    return jwt.sign(
       {
        _id:this._id,
       },
        process.env.REFRESH_TOKEN_SECRET,
       {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
       }
    )
}

export const User=mongoose.model("User",userSchema)