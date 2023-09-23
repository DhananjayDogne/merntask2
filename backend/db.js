const mongoose =require('mongoose');


const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    // if (isConnected) {
    //     console.log('MongoDB is already connected'); 
    //     return;
    // }
    try {
        await mongoose.connect("mongodb+srv://dhananjaydogne:DD@cluster0.q565lol.mongodb.net/?retryWrites=true&w=majority", {
            dbName: "merntask2",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;

        console.log('MongoDB connected')
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectToDB;