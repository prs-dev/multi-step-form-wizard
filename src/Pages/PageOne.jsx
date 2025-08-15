import {useState} from 'react'
import { useStore } from "../store/store"

const PageOne = () => {
    const {page, changePage, setData} = useStore()
    const [value, setValue] = useState({
        name: '',
        email: "",
        phone: ''
    })
    // console.log(changePage, page)
    const pageStyle = {
        width: "70%",
        height: "70%",
        background: "rgba(0,0,0,.2)",
        borderRadius: "10px",
        boxShadow: "5px 5px 10px rgba(0,0,0,.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "100px"
    }
    const containerStyles = {
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        gap: "10px"
    }
    const inputStyles = {
        width: "100%",
        height: "50px",
        padding: "10px",
        border: "none",
        borderRadius: "10px"
    }
    const labelStyles = {
        fontSize: "20px"
    }
    const handleChange = e => {
        setValue(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    console.log("test", value)
    return (
        <div style={pageStyle}>
            <div style={containerStyles}>
                <label style={labelStyles} htmlFor="">Name</label>
                <input type="text" name="name" style={inputStyles} value={value.name} onChange={handleChange}/>
            </div>
            <div style={containerStyles}>
                <label style={labelStyles} htmlFor="">Email</label>
                <input type="email" name="email" style={inputStyles} value={value.email} onChange={handleChange}/>
            </div>
            <div style={containerStyles}>
                <label style={labelStyles} htmlFor="">Phone</label>
                <input type="number" name="phone" style={inputStyles} value={value.phone} onChange={handleChange}/>
            </div>
            <div>
                <button onClick={() => {
                    changePage('next')
                    setData(value)
                }} style={{
                    padding: "10px",
                    border: "1px solid #333",
                    fontSize: "16px",
                    borderRadius: "5px"
                }}>Next</button>
            </div>
        </div>
    )
}

export default PageOne