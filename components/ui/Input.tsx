import { HTMLInputTypeAttribute, useRef } from "react"

import styles from "@/styles/ui/Input.module.css"


export default function Input({
    className="", onChange, value, placeholder="", type="text", name="", id="", label, isError=false, errorText="Error",
    checked=false, left, right, readonly=false, isLoading=false
} : {
    className?: string,
    onChange: Function,
    value?: string,
    placeholder?: string,
    type?: HTMLInputTypeAttribute | undefined,
    name?: string,
    id?: string,
    label?: string,
    isError?: boolean,
    errorText?: string,
    checked? : boolean,
    left?: any, right?: any,
    readonly?: boolean,
    isLoading?: boolean
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    switch(type) {
        case "checkbox":
            return (
                <div className="flex flex-col gap-1">
                    <div 
                        className={`flex flex-row cursor-pointer
                            justify-between items-center relative border
                            transition-all duration-200 rounded-lg p-3 px-3 outline-none
                            ${isError ? styles.inputError : styles.input}
                        `}
                        onClick={() => onChange(!checked) as (e: React.ChangeEvent<HTMLInputElement>) => void}
                        >
                        
                        {label && <label htmlFor={name} className="select-none">{label}</label>}
                        <input 
                            placeholder={placeholder} className={`${isError ? styles.inputError : styles.input} `} 
                            type="checkbox" id={id} name={name}
                            checked={checked} onChange={() => null}
                            readOnly={readonly}
                        />
                    </div>
                    {<span className="text-xs text-red-500 font-bold">{isError && errorText}</span>}
                </div>
            )
        case "image":
        case "file":
            return (
                <>
                <div className="flex flex-col gap-1">
                    <div 
                        className={`flex flex-row cursor-pointer
                            justify-between items-center relative border
                            transition-all duration-200 rounded-lg p-3 px-3 outline-none
                            ${isError ? styles.inputError : styles.input}
                        `}
                        >
                        
                        {label && <label htmlFor={name} className="select-none">{label}</label>}
                        <input 
                            placeholder={placeholder} className={` hidden `} 
                            type="file" id={id} name={name}
                            onChange={(e) => onChange(e.target.files) as (e: React.ChangeEvent<HTMLInputElement>) => void}
                            readOnly={readonly}
                            accept="image/png, image/jpeg"
                            ref={fileInputRef}
                        />

                        <button 
                            className={`${isError ? styles.inputError : styles.input} flex flex-row items-center gap-2 relative`} 
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isLoading}
                        >
                            {left && <div className="pl-3 select-none flex items-center justify-center">{left}</div>}
                            <span>Upload</span>
                            {right && <div className="pr-3 select-none flex items-center justify-center">{right}</div>}
                        </button>
                        
                    </div>
                    {<span className="text-xs text-red-500 font-bold">{isError && errorText}</span>}
                </div>             
                </>
            )
        default:
            return (
                <>
                
                <div className={`${styles.inputWrapper}`}>
                    <label htmlFor={name} className="select-none">{label}</label>
                    <div className={`${isError ? styles.inputError : styles.input} flex flex-row items-center max-xs:flex-wrap`}>
                        {left && <div className="pl-3 select-none">{left}</div>}
                        <input 
                            placeholder={placeholder} 
                            className={` outline-none bg-transparent w-full h-full border-0 ${left && "pl-10"} `} 
                            type={type} id={id} name={name}  
                            onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
                            value={value}
                            readOnly={readonly}
                        />
                        {right && <div className="pr-3 select-none">{right}</div>}
                    </div>
                    {<span className="text-xs text-red-500 font-bold">{isError && errorText}</span>}
                </div>
                </>
            )
    }
}