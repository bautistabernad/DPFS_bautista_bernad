import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [productsData, setProductsData] = useState(null)
  const [usersData, setUsersData] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then(response => response.json())
      .then(data => setProductsData(data))
      .catch(error => console.log(error))

    fetch('http://localhost:3000/api/users')
      .then(response => response.json())
      .then(data => setUsersData(data))
      .catch(error => console.log(error))
  }, [])

  if (!productsData || !usersData) {
    return <p className="loading">Cargando dashboard...</p>
  }

  const categories = Object.keys(productsData.countByCategory)

  const lastProduct = productsData.products[productsData.products.length - 1]
  const lastUser = usersData.users[usersData.users.length - 1]

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Dashboard Tempo</h1>
          <p>Resumen general del marketplace de clases de música</p>
        </div>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <h2>Total de productos</h2>
          <p>{productsData.count}</p>
        </article>

        <article className="stat-card">
          <h2>Total de usuarios</h2>
          <p>{usersData.count}</p>
        </article>

        <article className="stat-card">
          <h2>Total de categorías</h2>
          <p>{categories.length}</p>
        </article>
      </section>

      <section className="content-grid">
        <article className="panel">
          <h2>Último producto creado</h2>

          {lastProduct ? (
            <div>
              <h3>{lastProduct.name}</h3>
              <p>{lastProduct.description}</p>
              <a href={lastProduct.detail} target="_blank">
                Ver detalle API
              </a>
            </div>
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </article>

        <article className="panel">
          <h2>Último usuario registrado</h2>

          {lastUser ? (
            <div>
              <h3>{lastUser.name}</h3>
              <p>{lastUser.email}</p>
              <a href={lastUser.detail} target="_blank">
                Ver detalle API
              </a>
            </div>
          ) : (
            <p>No hay usuarios disponibles.</p>
          )}
        </article>
      </section>

      <section className="panel">
        <h2>Productos por categoría</h2>

        <div className="category-list">
          {categories.map(category => (
            <div className="category-item" key={category}>
              <span>{category}</span>
              <strong>{productsData.countByCategory[category]}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Listado de productos</h2>

        <div className="product-list">
          {productsData.products.map(product => (
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
    </main>
  )
}

export default App