import { useStore } from "../store/store"
import {useEffect, useState} from 'react'

const PageTwo = () => {
  const {changePage, setPreferences, formData} = useStore()
  const [checkboxes, setCheckboxes] = useState({})
  const [selectors, setSelectors] = useState({
    language: '',
    theme: ''
  })
  const [notification, setNotification] = useState('daily')

  useEffect(() => {
    const {preferences} = formData
    if(preferences.length === 0) {
      return 
    }
    // console.log(Object.keys(...preferences))
    const keys = Object.keys(...preferences)
    // console.log(preferences[0].language)
    // console.log(keys.includes('language'))
    if(keys.includes('notification')) {
     setNotification(preferences[0].notification)
    }
    if(keys.includes('language')) {
     setSelectors(prev => ({
      ...prev,
      language: preferences[0].language
     }))
    }
    if(keys.includes('theme')) {
     setSelectors(prev => ({
      ...prev,
      theme: preferences[0].theme
     }))
    }
    if(keys.includes('newsletter')) {
      setCheckboxes(prev => ({
        ...prev,
        newsletter: preferences[0].newsletter
      }))
    }
    if(keys.includes('dark')) {
      setCheckboxes(prev => ({
        ...prev,
        dark: preferences[0].dark
      }))
    }
    if(keys.includes('updates')) {
      setCheckboxes(prev => ({
        ...prev,
        updates: preferences[0].updates
      }))
    }
  }, [])
  
  const handleCheckboxes = e => {
    setCheckboxes(prev => ({
      ...prev, 
      [e.target.name]: e.target.checked
    }))
  }   

  console.log(checkboxes, notification, selectors)
  return (
    <div style={{
      display: 'flex',
      flexDirection: "column",
      gap: "20px"
    }}>
      <div>
        <h1>Step 2</h1>
      </div>
      {/* checkboxes */}
      <div>
        <div>
          <label htmlFor="">Recieve Newsletter</label>
          <input type="checkbox" name="newsletter" checked={checkboxes.newsletter} onChange={handleCheckboxes}/>
        </div>
        <div>
          <label htmlFor="">Dark Mode By Default</label>
          <input type="checkbox" name="dark" checked={checkboxes.dark} onChange={handleCheckboxes}/>
        </div>
        <div>
          <label htmlFor="">Recieve Product Updates</label>
          <input type="checkbox" name="updates" checked={checkboxes.updates} onChange={handleCheckboxes}/>
        </div>
      </div>
      {/* selectors */}
      <div>
        <div>
          <label htmlFor="">Select Language</label>
          <select value={selectors.language} onChange={e => setSelectors(prev => ({...prev, language: e.target.value}))}>
            <option value="" disabled>Select</option>
            <option value="hindi">Hindi</option>
            <option value="english">English</option>
          </select>
        </div>
        <div>
          <label htmlFor="">Theme</label>
          <select value={selectors.theme} onChange={(e) => setSelectors(prev => ({...prev, theme: e.target.value}))}>
            <option value="" disabled>Select</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
      </div>
      {/* radio buttons */}
      <div>
        <div>
          <label htmlFor="">Notification Frequency</label>
          <div>
            <label htmlFor="">Daily</label>
            <input type="radio" name="" value='daily' checked={notification === 'daily'} onChange={e => setNotification(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="">Monthly</label>
            <input type="radio" name="" value='monthly' checked={notification === 'monthly'} onChange={e => setNotification(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="">Weekly</label>
            <input type="radio" name="" value='weekly' checked={notification === 'weekly'} onChange={e => setNotification(e.target.value)}/>
          </div>
        </div>
      </div>
      <div>
        <button onClick={() => changePage('prev')}>Prev</button>
        <button onClick={() => {
          changePage('next')
          setPreferences({
            ...selectors,
            ...checkboxes,
            notification
          })
        }}>Next</button>
      </div>
    </div>
  )
}

export default PageTwo