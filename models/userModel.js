const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "User name is required field"]
        },
        email: {
            type: String,
            required: [true, "User email is required field"],
            unique: true,
            validate: {
                validator: function (value) {
                    return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
                }
            }
        },
        password: {
            type: String,
            required: [true, "User password is required field"],
            minlength: [6, "Password must be at least 6 characters long"]
        },
        confirmPassword: {
            type: String,
            required: [true, "User confirm password is required field"],
            validate: {
                validator: function (value) {
                    return value === this.password;
                }
            }
        },
        avatar: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform: function (doc, ret) {
                // delete ret.password;
                delete ret.confirmPassword;
                delete ret.createdAt;
                delete ret.updatedAt;
            }
        }
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;