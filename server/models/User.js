import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 100,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true, // must be unique within the database table/collection
    },
    // *not* adding validations for simplicity's sake: (feel free to add)
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transactions: {
        type: Array,
        default: [],
    },
    role: {
        type: String,
        enum: ["user", "admin", "superadmin"],  // enum = one of these values
        default: "admin"
    },
    password: String
},
{ timestamps: true} // created_at, updated_at
)

// from: https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
// Password hash middleware.
UserSchema.pre('save', function save(next) {
    const user = this
    console.log(this)
    // only hash the password if it has been modified (or is new)
    // if (!user.isModified('password')) { return next() }
    bcrypt.genSalt(10, (err, salt) => {   // 10 = SALT_WORK_FACTOR
      if (err) { return next(err) }
      // hash the password along with our new salt
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) { return next(err) }
        // override the cleartext password with the hashed one
        user.password = hash
        console.log(hash)
        next()
      })
    })
  })
  
  // From mongodb docs:
  // Helper method for validating user's password.
    UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      // cb = 'credential belongs':
      cb(err, isMatch)
    })
  }

const User = mongoose.model("User", UserSchema);
export default User;