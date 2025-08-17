const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true
    },
    password: { 
        type: String, 
        required: true
    },
    savedLists: [
        {
            name: { 
                type: String, 
                required: true
            },
            images: [
                {
                    code: { 
                        type: Number, 
                        required: true
                    },
                    image: { 
                        type: String, 
                        required: true
                    }
                }
            ]
        }
    ]
});

module.exports = mongoose.model('User', userSchema);
