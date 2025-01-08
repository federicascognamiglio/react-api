import { useEffect, useState } from 'react'
import axios from 'axios';
// Components
import AppForm from './components/AppForm';
import AppPost from './components/AppPost';


// Valori di partenza Form
const initialFormData = {
  title: "",
  content: "",
  img: "",
  tags: []
};

// const availableTags = ["dolci", "homemade", "semplice", "snack", "barbabietola", "sano", "creativo", "tradizionale"];
const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  // VARIABILI DI STATO
  // Lista Post
  const [postsList, setPostsList] = useState([]);
  // Valori per form
  const [formData, setFormData] = useState(initialFormData);
  // Tags
  const [tagsList, setTagsList] = useState([])
  // Check Selezionati
  const [selectedChecks, setSelectedChecks] = useState([]);
  // Filter 
  const [filter, setFilter] = useState("all")

  // USE EFFECTS
  // Show Posts
  useEffect(() => getPosts(), [filter])
  // Show Tags
  useEffect(() => getTags(), [])

  // FUNCTIONS
  // Get Posts
  const getPosts = () => {
    let url = `${apiUrl}/posts`

    if (filter !== "all") {
      url += `?tag=${filter}`;
    }

    axios.get(url).then((resp) => {
      setPostsList(resp.data)
    })
  }

  // Get Tags
  const getTags = () => {
    axios.get(`${apiUrl}/tags`).then((resp) => {
      setTagsList(resp.data.tags)
    })
  }

  // Submit Handler Function
  const handleSubmit = (event) => {
    event.preventDefault()

    axios.post(`${apiUrl}/posts`, formData).then((resp) => {
      const newPostsList = resp.data;
      setPostsList(newPostsList);
      setFormData(initialFormData)
    })
  }

  // Multiple Checkboxes Handler Function
  const handleMultipleCheckbox = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    const updatedChecks = isChecked ? [...selectedChecks, value] : selectedChecks.filter((curValue) => curValue !== value);
    setSelectedChecks(updatedChecks);

    setFormData({
      ...formData,
      tags: updatedChecks,
    });
  }

  // Input Change Handler Function
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
      {/* Header */}
      <header>
        <h1 className='text-center pt-4'>POSTS</h1>
      </header>
      {/* Main */}
      <main className='container'>
        {/* Form */}
        <section className="pt-4">
          <h3>Add Post</h3>
          <AppForm
            submitHandler={handleSubmit}
            data={formData}
            inputChangeHandler={handleChange}
            availableTags={tagsList}
            selectedChecks={selectedChecks}
            multipleCheckboxHandler={handleMultipleCheckbox}
          />
        </section >

        {/* Posts */}
        <section className='mt-5' >
          <h3 className='pb-3'>My Posts</h3>
          <select onChange={(event) => setFilter(event.target.value)} value={filter} name="filter" id="filter" className='form-select w-25 mb-4'>
            <option value="all">All Posts</option>
            {tagsList.map((curTag, index) => <option key={index} value={curTag}>{curTag}</option>)}
          </select>
          <div className="row">
            {postsList.length !== 0 ? postsList.map((curPost, index) =>
              <div key={index} className="col-4 mb-3">
                <AppPost
                  url={apiUrl}
                  post={curPost}
                  deleteHandler={handleDelete}
                />
              </div>) : <p>Nessun Post Disponibile</p>}
          </div>
        </section >
      </main>
    </>
  )
}

export default App
