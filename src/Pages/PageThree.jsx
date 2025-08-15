import { useStore } from "../store/store"

const PageThree = () => {
  const {changePage} = useStore()
  return (
    <div>
      <div>
        Final Step
      </div>
      <div>
        <button onClick={() => changePage("prev")}>Prev</button>
        <button>Review</button>
        <button>Submit</button>
      </div>
    </div>
  )
}

export default PageThree