import { create } from "zustand";

export const useStore = create(set => ({
    page: 1,
    formData: {
        name: "",
        email: "",
        phone: "",
        preferences: []
    },
    changePage: (command) => set(state => {
        if (command === 'next' && state.page === 3) {
            return {
                page: 1
            }
        }
        if (command === 'next') {
            return {
                page: state.page + 1
            }
        }
        if (command === 'prev' && state.page === 1) {
            return {
                page: 3
            }
        }
        if (command === 'prev') {
            return {
                page: state.page - 1
            }
        }
    }),
    setData: data => set(state => {
        const obj = { formData: { ...state.formData, ...data } }
        localStorage.setItem('formData', JSON.stringify(obj))
        return obj
    }),
    setPreferences: data => set(state => {
        const obj = { formData: { ...state.formData, preferences: [data] } }
        localStorage.setItem('formData', JSON.stringify(obj))
        return obj
    }),
    setSubmit: () => set(state => {
        const initialState = {
            name: '',
            email: '',
            phone: '',
            preferences: []
        }
        localStorage.setItem("formData", JSON.stringify({formData: initialState}))
        return initialState
    })
}))