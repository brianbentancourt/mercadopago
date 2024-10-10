import './product.css'
import { useState } from 'react'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from 'axios'

const Product = () => {
    const [preferenceId, setPreferenceId] = useState('')

    initMercadoPago('YOUR_PUBLIC_KEY', { locale: 'es-UY' });

    const createPreference = async () => {
        try {
            const response = await axios.post('http://localhost:3001/create_preference', {
                title: 'Tasty burger',
                price: 100,
                quantity: 1,
            })

            const { id } = response.data

            return id
        } catch (error) {
            console.error(error)

        }
    }

    const handleBuy = async () => {
        const id = await createPreference()
        id && setPreferenceId(id)
    }

    return (
        <div className='card-product-container'>
            <div className='card-product'>
                <div className='card'>
                    <img
                        className='card-img-top'
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2UsFUk4jF55wlcTy-4DXeEOM-ixqlLIgfMQ&s'
                        alt='Card image cap'
                    />
                    <h3>Tasty burger</h3>
                    <p className='card-text'>Price: $100</p>
                    <button onClick={handleBuy}>Buy now</button>
                    {
                        preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts: { valueProp: 'smart_option' } }} />
                    }
                </div>
            </div>
        </div>
    )
}

export default Product