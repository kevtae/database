const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_CD_QUERY = 'select * FROM CD ';
const SELECT_ALL_producer_QUERY = 'SELECT * FROM producer';
const SELECT_ALL_supplier_QUERY = 'SELECT * FROM supplier';
const SELECT_ALL_customer_QUERY = 'SELECT * FROM customer';
const SELECT_ALL_vip_QUERY = 'SELECT * FROM vip';






const connection = mysql.createConnection({
    host: 'localhost',
    user: 'kevtae',
    password: 'Lim09455!',
    database:'proj2'
});

connection.connect(err => {
    if(err){
        return err;
    }
})

app.use(cors());

app.get('/producer', (req,res) => {
   connection.query(SELECT_ALL_producer_QUERY, (err, results) => {
       if(err){
           return res.send(err)
       } else {
           return res.json({
               data:results
           })
       }
   })
});

app.get('/customerDue', (req,res) => {
    const {title, date} = req.query
    connection.query(`SELECT name,telephone FROM customer NATURAL JOIN rent WHERE title='${title}' AND date ='${date}'`, (err, results) => {
        if(err){
            return res.send(err)
        } else {
            return res.json({
                data:results
            })
        }
    })
 });

 app.get('/producerDue', (req,res) => {
    const {artist, year} = req.query
    connection.query(`SELECT p.name,p.address FROM producer p, song s NATURAL JOIN CD c WHERE p.name = name_producer AND artist='${artist}' AND year='${year}';`, (err, results) => {
        if(err){
            return res.send(err)
        } else {
            return res.json({
                data:results
            })
        }
    })
 });



app.get('/CD', (req,res) => {
    connection.query(SELECT_ALL_CD_QUERY, (err, results) => {
        if(err){
            return res.send(err)
        } else {
            return res.json({
                data:results
            })
        }
    })
 });

 app.get('/customer', (req,res) => {
    connection.query(SELECT_ALL_customer_QUERY, (err, results) => {
        if(err){
            return res.send(err)
        } else {
            return res.json({
                data:results
            })
        }
    })
 });


 app.get('/vip', (req,res) => {
    connection.query(SELECT_ALL_vip_QUERY, (err, results) => {
        if(err){
            return res.send(err)
        } else {
            return res.json({
                data:results
            })
        }
    })
 });
 

app.get('/supplier', (req,res) => {
    connection.query(SELECT_ALL_supplier_QUERY, (err, results) => {
        if(err){
            return res.send(err)
        } else {
            return res.json({
                data:results
            })
        }
    })
 });

var multiconnection = mysql.createConnection({multipleStatements: true});

// app.get('/addCD', (req,res)=>{
//     const {title, year, type, name_producer, supplier} = req.query;
//     const INSERT_INTO_CD = `INSERT INTO CD VALUES('${title}', ${year}, '${type}', '${name_producer}')`;
//     let supplierName = `SELECT name FROM Supplier WHERE name=${supplier}`;
//     multiconnection.query(
//         `INSERT INTO CD VALUES('${title}', ${year}, '${type}', '${name_producer}');
//         SELECT (SELECT name FROM supplier WHERE name = '${supplier}') AS name;`
//          ,function(err, results) {
//             if(err){
//                 return res.send(err)
//             }
//             else{
//                 return res.send('succefully added product')
//             }
//       }
//     )
// })

app.get('/addCD', (req,res)=>{
    const {title, year, type, name_producer, supplier} = req.query;
    const INSERT_INTO_CD = `INSERT INTO CD VALUES('${title}', ${year}, '${type}', '${name_producer}')`;
    const supplierName = `SELECT (SELECT name FROM supplier WHERE name = '${supplier}') AS name`;
    const INSERT_INTO_SUPPLIER = `INSERT INTO supplied_by VALUES('${supplier}', '${title}')`;
    // connection.query(supplierName, (err,results)=>{
    //     if(supplierName == false){
    //         return res.send(err)
    //     } else{
    //         return res.send('good')
    //     }
    // })
    connection.query(supplierName, (err,results)=>{
        if(supplierName === 'null'){
            connection.query(INSERT_INTO_SUPPLIER, (err,results)=>{
                if(err){
                    return res.send(err)
                }else{
                    connection.query(INSERT_INTO_CD, (err, results)=>{
                        if(err){
                            return res.send(err)
                        } else{
                            return res.send('added new supplier')
                        }
                    })
                }
            })
        }
        //after query, it should return an error if supplied can't be added in supplied by due to supplier not being found
        else{
            connection.query(INSERT_INTO_CD, (err, results)=>{
                if(err){
                    return res.send(err)
                } else{
                    return res.send('added supplied_by')
                }
            })
        }
    })
})

app.get('/addProducer', (req,res)=>{
    const {name, address} = req.query;
    const INSERT_INTO_producer = `INSERT INTO producer VALUES('${name}', '${address}')`;
    connection.query(INSERT_INTO_producer, (err,results)=>{
        if(err){
            return res.send(err)
        }else{
            return res.send('succefully added producer')
        }
    })
})

//fails when title or ssn isn't duplicated
app.get('/addCustomer', (req,res)=>{
    const {ssn,name,telephone,title,date,period} = req.query;
    const INSERT_INTO_customer = `INSERT INTO customer VALUES('${ssn}', '${name}','${telephone}')`;
    const INSERT_INTO_RENT = `INSERT INTO rent VALUES('${ssn}', '${title}','${date}', '${period}')`;
    connection.query(
        INSERT_INTO_customer,function(err, customer) {
            if(err){
                return res.send(err)
            }else{
                connection.query(INSERT_INTO_RENT, function(err,rent){
                    if(err){
                        return res.send("no rent added")
                    } else{
                        return res.send('added rent')
                    }
                })
            }
        }
    )
})

app.get('/addVip', (req,res)=>{
    const {ssn,startingDate,discount,title,date,period} = req.query;
    const INSERT_INTO_VIP = `INSERT INTO vip VALUES('${ssn}', '${startingDate}','${discount}')`;
    const INSERT_INTO_RENT = `INSERT INTO rent VALUES('${ssn}', '${title}','${date}', '${period}')`;
    connection.query(
        INSERT_INTO_VIP,function(err, customer) {
            if(err){
                return res.send(err)
            }else{
                connection.query(INSERT_INTO_RENT, function(err,rent){
                    if(err){
                        return res.send(err)
                    } else{
                        return res.send('added rent')
                    }
                })
            }
        }
    )
})




app.listen(4000, ()=> {
    console.log(`server is on 4000`)
});