import { useState } from "react"

export default function PasswordInput({value, onChange, placeholder}){
    const [showPassword, setShowPassword] = useState(false)
    return(
        <div className='position-relative'>
          <input
            type={showPassword?"text":"password"}
            placeholder={placeholder || "password"}
            value={value}
            className='form-control'
            onChange={onChange}
         />
         <i onClick={()=>setShowPassword(!showPassword)} className={`bi ${showPassword?"bi-eye-slash":"bi-eye"}`} 
          style={{
            position:"absolute", right:"10px", top:"50%", transform:"translateY(-50%)", cursor:"pointer", fontSize:"18px"
          }}></i>
         </div>
    )
}