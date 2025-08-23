import { useState, useReducer, useEffect } from 'react'
import { useStore } from "../store/store"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

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

    // console.log("test", state, formData)
    return (
        <Card className='w-full max-w-md'>
            <CardHeader>
                <CardTitle>Enter Basic Information</CardTitle>
                <CardDescription>Please provide basic information, like name, email and phone number</CardDescription>
                <CardAction>Step 1</CardAction>
            </CardHeader>
            <CardContent>
                <div className=''>
                    <Label className='p-2 text-md' htmlFor="">Name</Label>
                    <Input type="text" name="name"
                        className={state.name.error ? 'error' : ''}
                        value={state.name.value}
                        onChange={e => dispatch({
                            type: 'name', payload: {
                                value: e.target.value,
                                error: state.name.touched ? e.target.value.length === 0 : null
                            }
                        })}
                    />
                </div>
                <div className=''>
                    <Label className='p-2 text-md' htmlFor="email">Email</Label>
                    <Input type="email" name="email"
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
                <div>
                    <Label className="p-2 text-md" htmlFor="phone">Phone</Label>
                    <Input type="number" name="phone"
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
            </CardContent>
            <CardFooter>

                <Button className='w-20 h-10' onClick={() => {
                    changePage('next')
                    setData({
                        name: state.name.value,
                        email: state.email.value,
                        phone: state.phone.value
                    })
                }}>Next</Button>

            </CardFooter>
        </Card>
    )
}

export default PageOne