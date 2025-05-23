import mongoose from 'mongoose';


const {
    set, connect, Schema, model, connection
} = mongoose;


if (process.argv.length<3)
{
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2];
const name = process.argv[3];

const number = process.argv[4];


const urlLink =
    `mongodb+srv://fullstack:${password}@cluster0.kjwb2vw.mongodb.net/?retryWrites=true&w=majority`

set('strictQuery',false)
connect(urlLink)

const personSchema = new Schema(
    {

    name: String,
    number: String,
})

const Person = model('Person', personSchema)



if (process.argv.length === 5){
    const person = new Person({
        name: name,
        number: number,
    })


    person.save().then(response => {
        console.log(`added ${name} num ${number} to phonebook`)
        connection.close()
    })
}



else if (process.argv.length === 3){
    console.log("phonebook:\n")

    Person.find({ }).then(result => {
        result.forEach(person => {
            console.log(person.name + ' ' + person.number)
        })
        connection.close()
    })

}


else{
    connection.close()
}