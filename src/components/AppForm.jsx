function AppForm({submitHandler, data, inputChangeHandler, availableTags, selectedChecks, multipleCheckboxHandler}) {
    return (
        <form onSubmit={submitHandler} className='mt-4'>
            <div className="row">
              {/* Title Input */}
              <div className='col-6'>
                <label htmlFor="title" className='form-label'>Title</label>
                <input name='title' className='form-control' value={data.title} onChange={inputChangeHandler} type="text" id='title' />
              </div>
              {/* Image Input */}
              <div className="col-6">
                <label htmlFor="image" className='form-label'>Image</label>
                <input name='img' className='form-control' value={data.img} onChange={inputChangeHandler} type="text" id='image' />
              </div>
              {/* Content Input */}
              <div className="col-6 mt-4">
                <label htmlFor="content" className='form-label'>Content</label>
                <textarea name="content" className='form-control' value={data.content} onChange={inputChangeHandler} id="content" rows="5"></textarea>
              </div>
              {/* Tags CheckBox */}
              <div className="col-12 mt-4">
                <p className='fw-medium'>Tags:</p>
                <div className='d-flex justify-content-between'>
                  {availableTags.map((curTag, index) => <div key={index} className="form-check form-check-inline">
                    <input type="checkbox" name="tags" checked={selectedChecks.includes(curTag)} onChange={multipleCheckboxHandler} className='form-check-input me-2' id={'ckeck' + curTag} value={curTag} />
                    <label htmlFor={'ckeck' + curTag} className='form-check-label'>{curTag}</label>
                  </div>)}
                </div>
              </div>
            </div>
            {/* Form Button */}
            <div className="col-12">
              <button type='submit' className="btn btn-primary mt-3">Save</button>
            </div>
          </form>
    )
}

export default AppForm