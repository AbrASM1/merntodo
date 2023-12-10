const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
mongoose.connect('mongodb://127.0.0.1:27017/todo')
    .then(() => {
        console.log('Connected to database');
    })
    .catch((error) => {
        console.error('Error connecting to database:', error);
    });

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});
const User = mongoose.model("User", userSchema);

const todosSchema = new mongoose.Schema({
    userId: String,
    Todos:
    {
        checked: Boolean,
        text: String,
        description: String,
        priority: String,
        deadline: Date,
        time: String,

    }

});
const Todos = mongoose.model("Todo", todosSchema);


app.use(cors());
app.use(express.json());


app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).exec();
    if (user) {
        res.status(500);
        res.json({
            message: "User already exsits",
        });
        return;
    }
    await User.create({ username, password });
    
        const secretKey = 'test'; // Replace with your actual secret key
        const payload = {
          username: username,
          password: password,
        };
      
        // Generate a JWT
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Set an expiration time
        console.log('Generated Token:', token);
    res.json(token);
});
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).exec();
    if (!user || user.password !== password) {
        res.status(403);
        res.json({
            message: "invalid",
        });
        return;
    }
    const secretKey = 'test'; // Replace with your actual secret key
    const payload = {
      username: username,
      password: password,
    };
  
    // Generate a JWT
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Set an expiration time
    console.log('Generated Token:', token);
    res.json(token);
    
});

app.post("/todos", async (req, res) => {
    const { authorization } = req.headers;
    const [, token] = authorization.split(" ");
    const [username, password] = token.split(":");
    const todosItem = req.body;
    const user = await User.findOne({ username }).exec();
    if (!user || user.password !== password) {
        res.status(403);
        res.json({
            message: "invalid",
        });
        return;

    }

    const todos = await Todos.findOne({ _id: todosItem._id }).exec();
    if (!todos) {
        Todos.create({
            userId: user._id,
            Todos: todosItem,
        });
    } else {
        //todos.Todos.push(todosItem);
        todos.updateOne(
            { "_id": todosItem._id },
            { $set: { "Todos.checked": true } },
        );
    }
    res.json({
        message: "success2",
    });

})







app.post("/todoscheck", async (req, res) => {
    const { authorization } = req.headers;
    const [, token] = authorization.split(" ");
    const [username, password] = token.split(":");
    const todosItem = req.body;
    const user = await User.findOne({ username }).exec();
    if (!user || user.password !== password) {
        res.status(403);
        res.json({
            message: "invalid",
        });
        return;

    }

    const todos = await Todos.findOne({ _id: todosItem._id }).exec();
    if (!todos) {
        console.log("not found")

    } else {
        //todos.Todos.push(todosItem);
        console.log("FOUDNDD");
        console.log(todosItem);

        // Todos.create({
        //     userId:user._id,
        //     Todos:todosItem.Todos,
        // });

        Todos.updateOne(
            { _id: todosItem._id },
            { $set: { Todos: todosItem.Todos } }
        )
            .then(result => {
                console.log('Todo updated successfully');
            })
            .catch(err => {
                console.error(err);
            });
    }
    res.json({
        message: "success2",
    });

})
app.post("/todosupdate", async (req, res) => {
    const { authorization } = req.headers;
    const [, token] = authorization.split(" ");
    const [username, password] = token.split(":");
    const todosItem = req.body;
    const user = await User.findOne({ username }).exec();
    if (!user || user.password !== password) {
        res.status(403);
        res.json({
            message: "invalid",
        });
        return;

    }

    const todos = await Todos.findOne({ _id: todosItem._id }).exec();
    if (!todos) {
        console.log("not found")

    } else {
        //todos.Todos.push(todosItem);
        console.log("FOUDNDD");
        console.log(todosItem);

        // Todos.create({
        //     userId:user._id,
        //     Todos:todosItem.Todos,
        // });

        Todos.updateOne(
            { _id: todosItem._id },
            { $set: { Todos: todosItem.Todos } }
        )
            .then(result => {
                console.log('Todo updated successfully');
            })
            .catch(err => {
                console.error(err);
            });
    }
    res.json({
        message: "success2",
    });

})





app.post("/todosdelete", async (req, res) => {
    const { authorization } = req.headers;
    const [, token] = authorization.split(" ");
    const [username, password] = token.split(":");
    const Id = req.body;
    const user = await User.findOne({ username }).exec();
    if (!user || user.password !== password) {
        res.status(403);
        res.json({
            message: "invalid",
        });
        return;

    }

    const todos = await Todos.findOne({ _id: Id.id }).exec();
    if (!todos) {
        console.log("not found")

    } else {
        console.log("FOUDNDD");
        console.log(Id);

        // Todos.create({
        //     userId:user._id,
        //     Todos:todosItem.Todos,
        // });

        Todos.deleteOne({ _id: Id.id })
            .then(result => {
                console.log('Document deleted successfully');
            })
            .catch(err => {
                console.error(err);
            });
    }
    res.json({
        message: "success2",
    });

})










app.get("/todos", async (req, res) => {
    const { authorization } = req.headers;
    const [, token] = authorization.split(" ");
    const [username, password] = token.split(":");
    const user = await User.findOne({ username }).exec();
    if (!user || user.password !== password) {
        res.status(403);
        res.json({
            message: "invalid",
        });
        return;

    }

    const todos = await Todos.find({ userId: user._id }).exec();
    res.json(todos);

})

//console.log('test')
const db = mongoose.connection;
//console.log('test2')
db.on("error", console.error.bind(console, "connection error:"));
db.on("error", function (error) {
    console.error('MongoDB connection error:', error);
});

db.once("open", function () {
    app.listen(port, () => {
        console.log("Started");
    });
});
//console.log('test4')