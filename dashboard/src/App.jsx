import { useEffect, useState } from 'react'
import './App.css'

import Header from './components/Header'
import StatCard from './components/StatCard'
import InfoPanel from './components/InfoPanel'
import CategoryList from './components/CategoryList'
import ProductList from './components/ProductList'

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
      <Header />

      <section className="stats-grid">
        <StatCard title="Total de productos" value={productsData.count} />
        <StatCard title="Total de usuarios" value={usersData.count} />
        <StatCard title="Total de categorías" value={categories.length} />
      </section>

      <section className="content-grid">
        <InfoPanel
          title="Último producto creado"
          name={lastProduct?.name}
          description={lastProduct?.description}
          detail={lastProduct?.detail}
        />

        <InfoPanel
          title="Último usuario registrado"
          name={lastUser?.name}
          description={lastUser?.email}
          detail={lastUser?.detail}
        />
      </section>

      <CategoryList categories={productsData.countByCategory} />

      <ProductList products={productsData.products} />
    </main>
  )
}

export default App