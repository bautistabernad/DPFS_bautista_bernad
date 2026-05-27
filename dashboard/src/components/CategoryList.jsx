function CategoryList({ categories }) {
    return (
        <section className="panel">
            <h2>Productos por categoría</h2>

            <div className="category-list">
                {Object.keys(categories).map(category => (
                    <div className="category-item" key={category}>
                        <span>{category}</span>
                        <strong>{categories[category]}</strong>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default CategoryList