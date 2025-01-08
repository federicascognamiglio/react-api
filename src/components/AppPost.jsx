function AppPost({url, post, deleteHandler}) {
    return (
        <div className="card">
            <img src={`${url}/${post.img}`} alt="Placeholder image" />
            <div className="card-body">
                <h6 className='card-title'><strong>{post.title}</strong></h6>
                <p className='card-text'>{post.content.slice(0, 80) + "..."}</p>
                <div>
                    {post.tags.map((curTag, index) => <span key={index} className='badge text-bg-dark me-2 mb-4'>{curTag}</span>)}
                </div>
                <button onClick={() => deleteHandler(post.id)} className='btn btn-outline-danger'>Delete</button>
            </div>
        </div>
    )
}

export default AppPost