function InfoPanel({ title, name, description, detail }) {
    return (
        <article className="panel">
            <h2>{title}</h2>

            {name ? (
                <div>
                    <h3>{name}</h3>
                    <p>{description}</p>

                    {detail && (
                        <a href={detail} target="_blank">
                            Ver detalle API
                        </a>
                    )}
                </div>
            ) : (
                <p>No hay información disponible.</p>
            )}
        </article>
    )
}

export default InfoPanel