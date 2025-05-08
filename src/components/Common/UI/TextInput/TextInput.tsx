import styles from "./TextInput.module.css"

type TextInputType={
  placeholder?:string,
  onChange?:(event : React.ChangeEvent<HTMLInputElement>) => void;
  input_type?:string,
  className?:string,
  value?:string|number,
  disabled?:boolean,
  name:string,
}
const TextInput:React.FC<TextInputType>=({
  placeholder="Enter Text here",
  onChange,
  input_type="text",
  className,
  value,
  disabled=false,
  name
})=>{
   return (
    <div >
      <input className={className?`${styles.input} ${className}`:`${styles.input}`} type={input_type} placeholder={placeholder} value={value} onChange={onChange}  name = {name}disabled={disabled}/>
    </div>
   )
}
export default TextInput