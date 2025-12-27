"use client"

function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  size = "medium",
  className = "",
  ...props
}) {
  const getButtonClass = () => {
    let baseClass = "button"

    // Variant styles
    switch (variant) {
      case "primary":
        baseClass += " button-primary"
        break
      case "secondary":
        baseClass += " button-secondary"
        break
      case "danger":
        baseClass += " button-danger"
        break
      case "success":
        baseClass += " button-success"
        break
      default:
        baseClass += " button-primary"
    }

    // Size styles
    switch (size) {
      case "small":
        baseClass += " button-small"
        break
      case "large":
        baseClass += " button-large"
        break
      default:
        baseClass += " button-medium"
    }

    if (disabled) {
      baseClass += " button-disabled"
    }

    return `${baseClass} ${className}`
  }

  return (
    <button className={getButtonClass()} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  )
}

export default Button
