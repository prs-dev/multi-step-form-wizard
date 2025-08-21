import { useEffect, useState } from "react"
import { useStore } from "../store/store"
import { aiReview } from "../utils/aiReview"
import Markdown from "react-markdown"

const PageThree = () => {
  const { changePage, formData } = useStore()
  const [review, setReview] = useState('')

  const handleReview = async () => {
    try {
      const res = await aiReview(JSON.stringify(formData))
      if(res.ok) {
        const data = await res.json()
        const {content} = data.choices[0].message
        setReview(content)
        console.log("response", data, content)
      }
    } catch (error) {
      throw new Error('Error in review, ', error)
    }
  }

  return (
    <div>
      <div>
        Final Step
      </div>
      <div>
        {/* preview */}
        <h2>Preview</h2>
        <div>
          <div>
            <p>Name: {formData.name}</p>
            <p>Email: {formData.email}</p>
            <p>Phone: {formData.phone}</p>
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <div>
              {Object.keys(formData.preferences[0]).map(item => <p>{item}</p>)}
            </div>
            <div>
              {Object.values(formData.preferences[0]).map(item => {
                // const booleanValues = typeof item === 'boolean'
                // console.log(booleanValues)
                if (typeof item === 'boolean') {
                  return (
                    <p>&#10003;</p>
                  )
                }
                return (
                  <p>{item}</p>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div>
        <button onClick={() => changePage("prev")}>Prev</button>
        <button onClick={handleReview}>Review</button>
        <button>Submit</button>
      </div>
      <div>
        {/* review */}
        {review && <div style={{
          width: "70%",
          height: "400px",
          overflowY: "scroll"
        }}>
            <Markdown>{review}</Markdown>
          </div>}
      </div>
    </div>
  )
}

export default PageThree