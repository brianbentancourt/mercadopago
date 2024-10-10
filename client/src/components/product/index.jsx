import './product.css'

const Product = () => {
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
                    <button>Buy now</button>
                </div>
            </div>
        </div>
    )
}

export default Product