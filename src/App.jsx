import { useStore } from './store/store'
import PageOne from './Pages/PageOne'
import PageTwo from './Pages/PageTwo'
import PageThree from './Pages/PageThree'
import { useEffect, useRef } from 'react'

const App = () => {
  const {page, formData, setData} = useStore()
  // console.log("form", formData)
  // const page = 2
  // useEffect(() => { 
  //   if(firstRender.current) {
  //     firstRender.current = false
  //     console.log("i'm here")
  //   }
  // }, [])
  // useEffect(() => {
  //   const {formData: data} = localStorage.getItem('formData')
  //   if(firstRender.current) {
  //     setData(JSON.parse(data))
  //   }
  // }, [formData])
  // useEffect(() => {
  //   const {formData: data} = JSON.parse(localStorage.getItem("formData"))
  //   if(data) {
  //     setData(data)
  //   }
    // console.log("date", data)
  // }, [])
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