import {useStore} from '../store/store'

const useFormProgress =(totalSteps = 3) => {
    const {formData, page} = useStore()

    //step 1
    const step1Complete = formData.name && formData.email && formData.phone

    //step 2
    const step2Complete = Array.isArray(formData.preferences) && formData.preferences.length > 0 && Object.values(formData.preferences[0]).some(Boolean)

    //step 3
    const step3Complete = step1Complete && step2Complete
    const completedSteps = [step1Complete, step2Complete, step3Complete].filter(Boolean).length

    const progress = Math.round((completedSteps / totalSteps) * 100)
    return {
        progress,
        currentStep: page,
        totalSteps,
        completedSteps
    }

}

export default useFormProgress