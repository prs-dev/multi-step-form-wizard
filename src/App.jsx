import { useStore } from './store/store'
import PageOne from './Pages/PageOne'
import PageTwo from './Pages/PageTwo'
import PageThree from './Pages/PageThree'
import { useEffect, useRef } from 'react'
import useFormProgress from './hooks/useFormProgress'
import { Progress } from "@/components/ui/progress"

const App = () => {
  const { page, formData, setData } = useStore()
  const { progress, currentStep, totalSteps } = useFormProgress()
  const pageStyle = {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
  return (
    <div>
      <div className='p-2'>
        <Progress value={progress} />
      </div>
      <p className='p-2 font-semibold'>Step {currentStep} of {totalSteps} — {progress}%</p>
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