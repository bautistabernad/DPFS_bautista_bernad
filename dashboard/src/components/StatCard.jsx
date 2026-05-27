function StatCard({ title, value }) {
    return (
        <article className="stat-card">
            <h2>{title}</h2>
            <p>{value}</p>
        </article>
    )
}

export default StatCard