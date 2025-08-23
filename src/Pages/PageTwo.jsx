import { useStore } from "../store/store"
import { useEffect, useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { Card, CardAction, CardTitle, CardHeader, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

const PageTwo = () => {
  const { changePage, setPreferences, formData } = useStore()
  const [checkboxes, setCheckboxes] = useState({})
  const [selectors, setSelectors] = useState({
    language: '',
    theme: ''
  })
  const [notification, setNotification] = useState('daily')

  useEffect(() => {
    const { preferences } = formData
    if (preferences.length === 0) {
      return
    }
    // console.log(Object.keys(...preferences))
    const keys = Object.keys(...preferences)
    // console.log(preferences[0].language)
    // console.log(keys.includes('language'))
    if (keys.includes('notification')) {
      setNotification(preferences[0].notification)
    }
    if (keys.includes('language')) {
      setSelectors(prev => ({
        ...prev,
        language: preferences[0].language
      }))
    }
    if (keys.includes('theme')) {
      setSelectors(prev => ({
        ...prev,
        theme: preferences[0].theme
      }))
    }
    if (keys.includes('newsletter')) {
      setCheckboxes(prev => ({
        ...prev,
        newsletter: preferences[0].newsletter
      }))
    }
    if (keys.includes('dark')) {
      setCheckboxes(prev => ({
        ...prev,
        dark: preferences[0].dark
      }))
    }
    if (keys.includes('updates')) {
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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Enter Preferences</CardTitle>
        <CardDescription>Please provide preferences.</CardDescription>
        <CardAction>Step 2</CardAction>
      </CardHeader>
      {/* checkboxes */}
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm" htmlFor="">Recieve Newsletter</Label>
            <input type="checkbox" name="newsletter" checked={checkboxes.newsletter} onChange={handleCheckboxes} />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-sm" htmlFor="">Dark Mode By Default</Label>
            <input type="checkbox" name="dark" checked={checkboxes.dark} onChange={handleCheckboxes} />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-sm" htmlFor="">Recieve Product Updates</Label>
            <input type="checkbox" name="updates" checked={checkboxes.updates} onChange={handleCheckboxes} />
          </div>
        </div>
        {/* selectors */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm" htmlFor="">Select Language</Label>
            <select className="border border-gray-200 p-.5" value={selectors.language} onChange={e => setSelectors(prev => ({ ...prev, language: e.target.value }))}>
              <option value="" disabled>Select</option>
              <option value="hindi">Hindi</option>
              <option value="english">English</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-sm" htmlFor="">Theme</Label>
            <select className="border border-gray-200 p-.5" value={selectors.theme} onChange={(e) => setSelectors(prev => ({ ...prev, theme: e.target.value }))}>
              <option value="" disabled>Select</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>
        {/* radio buttons */}
 
          <div className="flex flex-col gap-1">
            <Label className="text-sm underline" htmlFor="">Notification Frequency</Label>
            <div className="flex items-center justify-between">
              <Label className="text-sm" htmlFor="">Daily</Label>
              <input type="radio" name="" value='daily' checked={notification === 'daily'} onChange={e => setNotification(e.target.value)} />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm" htmlFor="">Monthly</Label>
              <input type="radio" name="" value='monthly' checked={notification === 'monthly'} onChange={e => setNotification(e.target.value)} />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm" htmlFor="">Weekly</Label>
              <input type="radio" name="" value='weekly' checked={notification === 'weekly'} onChange={e => setNotification(e.target.value)} />
            </div>
          </div>
   
      </CardContent>

      <CardFooter className='flex gap-2'>

          <Button onClick={() => changePage('prev')}>Prev</Button>
          <Button onClick={() => {
            changePage('next')
            setPreferences({
              ...selectors,
              ...checkboxes,
              notification
            })
          }}>Next</Button>

      </CardFooter>
    </Card>
  )
}

export default PageTwo