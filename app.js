const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));
const UserSchema = new mongoose.Schema({
    name: String,
    email: String
});
const User = mongoose.model('User', UserSchema);
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
});
app.put('/users/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(user);
});
app.delete('/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.send({ message: "User deleted" });
});
app.listen(3000, () => console.log('Server running on http://localhost:3000'));


npm init -y

npm install express mongoose body-parser

node app.js

http://localhost:3000/users/PASTE_YOUR_ID_HERE

{
    "name": "Jane Doe",
    "email": "jane.doe@example.com"
}