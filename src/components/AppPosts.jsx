import { useEffect, useState } from 'react'
import axios from 'axios';

// Valori di partenza Form
const initialFormData = {
    title: "",
    content: "",
    img: "",
    tags: []
};

// const availableTags = ["dolci", "homemade", "semplice", "snack", "barbabietola", "sano", "creativo", "tradizionale"];

const apiUrl = "http://localhost:3000";


function AppPosts() {
    // Lista Post
    const [postsList, setPostsList] = useState([]);

    // Valori per form
    const [formData, setFormData] = useState(initialFormData);

    // Get Posts
    const getPosts = () => {
        axios.get(`${apiUrl}/posts`).then((resp) => {
            setPostsList(resp.data)
        })
    }

    // Set PostsList
    useEffect(() => getPosts, [])

    // Submit Function
    const handleSubmit = (event) => {
        event.preventDefault()

        axios.post(`${apiUrl}/posts`, formData).then((resp) => {
            const newPostsList = [
                ...postsList,
                resp.data
            ];
            setPostsList(newPostsList);
            setFormData(initialFormData)
        })
    }

    // Multiple Checkboxes
    // const [selectedChecks, setSelectedChecks] = useState([]);
    // const handleMultipleCheckbox = (event) => {
    //     const value = event.target.value;
    //     const isChecked = event.target.checked;

    //     // Calcolo il nuovo array di selectedChecks
    //     const updatedChecks = isChecked ? [...selectedChecks, value] : selectedChecks.filter((curValue) => curValue !== value);

    //     // Aggiorna lo stato di selectedChecks
    //     setSelectedChecks(updatedChecks);

    //     // Aggiorna formData
    //     setFormData({
    //         ...formData,
    //         tags: updatedChecks,
    //     });
    // }

    // InputChange Function
    const handleChange = (event) => {
        const keyToChange = event.target.name;
        const newValue = event.target.value;
        const newData = {
            ...formData,
            [keyToChange]: newValue
        }
        setFormData(newData)
    }


    // Delete Function
    const handleDelete = (idToDelete) => {
        axios.delete(`${apiUrl}/posts/${idToDelete}`).then((resp) => {
            const filteredList = postsList.filter(curArticle => curArticle.id !== idToDelete)
            setPostsList(filteredList);
        })
    }

    return (
        <>
            {/* Form */}
            <section className="pt-4">
                <h3>Add Post</h3>
                <form onSubmit={handleSubmit} className='mt-4'>
                    <div className="row">
                        {/* Title Input */}
                        <div className='col-6'>
                            <label htmlFor="title" className='form-label'>Title</label>
                            <input name='title' className='form-control' value={formData.title} onChange={handleChange} type="text" id='title' />
                        </div>
                        {/* Image Input */}
                        <div className="col-6">
                            <label htmlFor="image" className='form-label'>Image</label>
                            <input name='img' className='form-control' value={formData.img} onChange={handleChange} type="text" id='image' />
                        </div>
                        {/* Content Input */}
                        <div className="col-6 mt-4">
                            <label htmlFor="content" className='form-label'>Content</label>
                            <textarea name="content" className='form-control' value={formData.content} onChange={handleChange} id="content" rows="5"></textarea>
                        </div>
                        {/* Tags CheckBox */}
                        {/* <div className="col-12 mt-4">
                            <p className='fw-medium'>Tags:</p>
                            <div className='d-flex justify-content-between'>
                                {availableTags.map((curTag, index) => <div key={index} className="form-check form-check-inline">
                                    <input type="checkbox" name="tags" checked={selectedChecks.includes(curTag)} onChange={handleMultipleCheckbox} className='form-check-input me-2' id={'ckeck' + curTag} value={curTag} />
                                    <label htmlFor={'ckeck' + curTag} className='form-check-label'>{curTag}</label>
                                </div>)}
                            </div>
                        </div> */}
                    </div>
                    {/* Form Button */}
                    <div className="col-12">
                        <button type='submit' className="btn btn-primary mt-3">Save</button>
                    </div>
                </form>
            </section >

            {/* Articles */}
            <section className='mt-5' >
                <h3 className='pb-3'>My Posts</h3>
                <div className="row">
                    {postsList.length !== 0 ? postsList.map((curPost, index) =>
                        <div key={index} className="col-4 mb-3">
                            <div className="card">
                                <img src={`${apiUrl}/${curPost.img}`} alt="Placeholder image" />
                                <div className="card-body">
                                    <h6 className='card-title'><strong>{curPost.title}</strong></h6>
                                    <p className='card-text'>{curPost.content}</p>
                                    {/* <div>
                                        {curPost.tags.map((curTag, index) => <span key={index} className='badge text-bg-dark me-2 mb-4'>{curTag}</span>)}
                                    </div> */}
                                    <button onClick={() => handleDelete(curPost.id)} className='btn btn-outline-danger'>Delete</button>
                                </div>
                            </div>
                        </div>) : <p>Nessun Post Disponibile</p>}
                </div>
            </section >
        </>
    )
}

export default AppPosts;