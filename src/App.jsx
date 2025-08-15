import { useStore } from './store/store'
import PageOne from './Pages/PageOne'
import PageTwo from './Pages/PageTwo'
import PageThree from './Pages/PageThree'

const App = () => {
  const {page, formData} = useStore()
  console.log("form", formData)
  // const page = 2
  const pageStyle = {
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
  return (
    <div>
      {page === 1 && <div style={pageStyle}>
        <PageOne />
      </div>}
      {page === 2 && <div style={pageStyle}>
        <PageTwo />
      </div>}
      {page === 3 && <div style={pageStyle}>
        <PageThree />
      </div>}
    </div>
  )
}

export default App