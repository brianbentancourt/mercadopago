import express from 'express';
import cors from 'cors';

import { MercadoPagoConfig, Preference } from 'mercadopago';

const mercadopagoClient = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Mercadopago API");
});

app.post("/create_preference", async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    unit_price: Number(req.body.price),
                    quantity: Number(req.body.quantity),
                    currency_id: 'UYU',
                }
            ],
            back_urls: {
                success: 'https://brianbentancourt.com/',
                failure: 'https://brianbentancourt.com/',
                pending: 'https://brianbentancourt.com/',
            },
            auto_return: 'approved',
        }

        const preference = new Preference(mercadopagoClient);
        const result = await preference.create({ body });

        res.json({
            id: result.id
        })
    } catch (error) {
        console.error(error)
        res.status(500).send('Error creating preference')
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
