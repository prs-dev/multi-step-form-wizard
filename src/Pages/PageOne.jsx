import { useState, useReducer, useEffect } from 'react'
import { useStore } from "../store/store"

const initialState = {
    name: {
        value: '',
        touched: '',
        error: null
    },
    email: {
        value: '',
        touched: '',
        error: null
    },
    phone: {
        value: '',
        touched: '',
        error: null
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'name':
            return {
                ...state, name: {
                    value: action.payload.value,
                    touched: true,
                    error: action.payload.error
                }
            }
        case 'email':
            return {
                ...state, email: {
                    value: action.payload.value,
                    touched: true,
                    error: action.payload.error
                }
            }
        case 'phone':
            return {
                ...state, phone: {
                    value: action.payload.value,
                    touched: true,
                    error: action.payload.error
                }
            }
        default:
            throw new Error(`Unknown action type: ${action.type}`)
    }
}

const PageOne = () => {
    const { page, changePage, setData, formData } = useStore()
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        const saved = localStorage.getItem('formData')

        const initialData = saved ? JSON.parse(saved).formData : {
            name: '',
            email: '',
            phone: '',
            preferences: []
        }

        setData(initialData)

        const { name, email, phone } = initialData
        
        dispatch({
            type: "name", payload: {
                value: name,
                error: null
            }
        })
        dispatch({
            type: "email", payload: {
                value: email,
                error: null
            }
        })
        dispatch({
            type: "phone", payload: {
                value: phone,
                error: null
            }
        })

    }, [])

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
    console.log("test", state, formData)
    return (
        <div style={pageStyle}>
            <div style={containerStyles}>
                <label style={labelStyles} htmlFor="">Name</label>
                <input type="text" name="name"
                    className={state.name.error ? 'error' : ''}
                    style={inputStyles}
                    // value={value.name}
                    value={state.name.value}
                    // onChange={handleChange}
                    onChange={e => dispatch({
                        type: 'name', payload: {
                            value: e.target.value,
                            error: state.name.touched ? e.target.value.length === 0 : null
                        }
                    })}
                />
            </div>
            <div style={containerStyles}>
                <label style={labelStyles} htmlFor="">Email</label>
                <input type="email" name="email"
                    style={inputStyles}
                    className={state.email.error ? 'error' : ''}
                    value={state.email.value}
                    onChange={e => dispatch({
                        type: 'email', payload: {
                            value: e.target.value,
                            error: state.email.touched ? e.target.value.length === 0 : null
                        }
                    })}
                />
            </div>
            <div style={containerStyles}>
                <label style={labelStyles} htmlFor="">Phone</label>
                <input type="number" name="phone"
                    style={inputStyles}
                    className={state.phone.error ? 'error' : ''}
                    value={state.phone.value}
                    onChange={e => dispatch({
                        type: 'phone', payload: {
                            value: e.target.value,
                            error: state.phone.touched ? e.target.value.length === 0 : null
                        }
                    })}
                />
            </div>
            <div>
                <button onClick={() => {
                    changePage('next')
                    setData({
                        name: state.name.value,
                        email: state.email.value,
                        phone: state.phone.value
                    })
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