function ProductList({ products }) {
    return (
        <section className="panel">
            <h2>Listado de productos</h2>

            <div className="product-list">
                {products.map(product => (
                    <article className="product-row" key={product.id}>
                        <div>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <small>{product.category}</small>
                        </div>

                        <a href={product.detail} target="_blank">
                            Ver API
                        </a>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default ProductList