import express from 'express';
import Supplier from './models/supplier.js';

const app = express();

const hostname = '127.0.0.1';
const port = 3001;

app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    Supplier.findAll().then((results) => {
        res.render('index', { suppliers: results });
    });
})

app.get('/create', (req, res) => {
    res.render('create');
})

app.get('/edit/:id', (req, res) => {
    Supplier.findOne({ where: { id: req.params.id } }
        ).then((results) => {
            res.render('edit', { supplier: results });
        })
    })

app.post('/api/suppliers', (req, res) => {
    Supplier.create({ company_name: req.body.company_name, contact_name: req.body.contact_name, email: req.body.email, phone: req.body.phone, active: req.body.active }
        ).then((results) => {
            res.json({ status: 200, error: null, Response: results });
        }).catch(err => {
            res.json({ status: 502, error: err });
        })
    })
    
app.put('/api/supplier/:id', (req, res) => {
    Supplier.update({ company_name: req.body.company_name, contact_name: req.body.contact_name, email: req.body.email, phone: req.body.phone, active: req.body.active }, { where: { id: req.params.id } }
        ).then((results) => {
            res.json({ status: 200, error: null, Response: results });
        }).catch(err => {
            res.json({ status: 502, error: err });
        })
    })
    
app.delete('/api/supplier/:id', (req, res) => {
    Supplier.destroy({ where: { id: req.params.id } }
        ).then(() => {
            res.json({ status: 200, error: null, Response: results });
        }).catch(err => {
            res.json({ status: 500, error: err, Response: {} });
        })
    })
    
app.listen(port, () => {
    console.log(`Server running at ${hostname}:${port}`);})