"use client"

function Input({ value, onChange, onKeyPress, placeholder = "", type = "text", className = "", ...props }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      className={`input ${className}`}
      {...props}
    />
  )
}

export default Input
