const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: Number,
            default: 0, //! user
        }
    },
    { timestamps: true }
);

// UserSchema.pre('save', async function(next)) //! virtual sau khi save 
const User = mongoose.model('User', UserSchema);

module.exports = User;