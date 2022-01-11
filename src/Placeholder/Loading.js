



export const WavePlaceholder = () => {
    //glow
    return (
        <div className="row">
            <div className="placeholder-glow">
                <div className="placeholder placeholder-lg col-12 bg-secondary"></div>
                <div className="placeholder placeholder-lg col-12 bg-secondary"></div>
                <div className="placeholder placeholder-lg col-12 bg-secondary"></div>
                <div className="placeholder placeholder-lg col-12 bg-secondary"></div>
                <div className="placeholder placeholder-lg col-12 bg-secondary"></div>
                <div className="placeholder placeholder-lg col-12 bg-secondary"></div>
                <div className="placeholder placeholder-lg col-12 bg-secondary"></div>
                <div className="placeholder placeholder-lg col-12 bg-secondary"></div>
                <div className="placeholder placeholder-lg col-12 bg-secondary"></div>
                <div className="placeholder placeholder-lg col-12 bg-secondary"></div>
            </div>
        </div>
    )
}

export const GrowingSpinner = () => {
    return (
        <div className="d-flex justify-content-center align-items-center gap-2 " style={{ height: "50vh" }}>
            <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-success" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-info" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}