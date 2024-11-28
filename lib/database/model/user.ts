import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({

    email: {
    type: String,
    required: true,
    unique: true,
    },
    

});

export default mongoose.models?.User || mongoose.model("User", userSchema);

// export default User;