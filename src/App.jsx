import AppPosts from './components/AppPosts';

function App() {

  return (
    <>
      {/* Header */}
      <header>
        <h1 className='text-center pt-4'>POSTS</h1>
      </header>
      {/* Main */}
      <main className='container'>
        <section>
          <AppPosts />
        </section>
      </main>
    </>
  )
}

export default App
