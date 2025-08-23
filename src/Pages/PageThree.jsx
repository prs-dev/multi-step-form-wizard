import { useEffect, useState } from "react"
import { useStore } from "../store/store"
import { aiReview } from "../utils/aiReview"
import Markdown from "react-markdown"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardAction, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const PageThree = () => {
  const { changePage, formData, setSubmit } = useStore()
  const [review, setReview] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleReview = async () => {
    try {
      setLoading(true)
      const res = await aiReview(JSON.stringify(formData))
      if (res.ok) {
        const data = await res.json()
        const { content } = data.choices[0].message
        setReview(content)
        setLoading(false)
        console.log("response", data, content)
      }
    } catch (error) {
      throw new Error('Error in review, ', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (submitted) {
      setTimeout(() => {
        window.location.href = '/'
      }, 2000)
    }
  }, [submitted])

  console.log("loading", loading)

  if (submitted) {
    return (
      <div>Submitted</div>
    )
  } else {
    return (
      <div className="flex w-full max-w-xl gap-2">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>This is the final step, please review the form before submission</CardDescription>
            <CardAction>Final Step</CardAction>
          </CardHeader>
          <CardContent className='flex flex-col gap-2'>
            <div>
              <h2 className="font-semibold text-md">Basic Info</h2>
            </div>
            <div className="text-sm">
              <p>Name: {formData.name}</p>
              <p>Email: {formData.email}</p>
              <p>Phone: {formData.phone}</p>
            </div>
            <div>
              <h2 className="text-md font-semibold">Preferences</h2>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div>
                {Object.keys(formData.preferences[0]).map(item => <p>{item}</p>)}
              </div>
              <div>
                {Object.values(formData.preferences[0]).map(item => {
                  if (typeof item === 'boolean') {
                    return (
                      <p className="text-green-500">&#10003;</p>
                    )
                  }
                  return (
                    <p>{item}</p>
                  )
                })}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button onClick={() => changePage("prev")}>Prev</Button>
            {!review && <Button onClick={handleReview}>Review</Button>}
            <Button onClick={() => {
              setSubmit()
              setSubmitted(true)
            }}>Submit</Button>
          </CardFooter>
        </Card>
        {loading && <Card className="w-full max-w-md h-[450px] overflow-hidden overflow-y-scroll">
          <CardHeader>
            <CardTitle>AI Review</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4"><Skeleton className="h-4" /><Skeleton className="h-4" /><Skeleton className="h-4" /><Skeleton className="h-4" /></CardContent>
        </Card>}
        {!loading && review && <Card className="w-full max-w-md h-[450px] overflow-hidden overflow-y-scroll">
          <CardHeader>
            <CardTitle>AI Review</CardTitle>
          </CardHeader>
          <CardContent>
            <Markdown>{review}</Markdown>
          </CardContent>
        </Card>}
      </div>
    )
  }
}

export default PageThree