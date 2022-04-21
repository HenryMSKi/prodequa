import mysql from 'mysql';
import dotenv from 'dotenv/config';

const dbConfig = {
    host: process.env.host,
    database: process.env.database,
    user: process.env.user,
    password: process.env.password,
    port: process.env.portBD
}

const connection = mysql.createConnection(dbConfig);

connection.connect( (error) =>{

    if(error){
        console.log('Error al conectarme');
    }else{
        console.log('conectado al id: ' + connection.threadId);
    }
});

export default connection;
