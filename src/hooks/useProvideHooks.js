import { useState } from "react"
import {useDispatch} from 'react-redux'

const useProvideHooks = ()=>{
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)

    return {
        loading,setLoading,
        dispatch
    }


}

export default useProvideHooks