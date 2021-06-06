const mongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin123@cluster0.o9sox.mongodb.net/drinkApp?retryWrites=true&w=majority";
const client = new mongoClient(uri);

let instance = null;

const getConnection = async () => {
    if(instance == null){
        try {
            instance = await client.connect();
        } catch (error) {
            console.log(error.message);
            throw new Error('problemas al conectarse con mongo');
        }
    }
    return instance;
}

module.exports = {getConnection};


