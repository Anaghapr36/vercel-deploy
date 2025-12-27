function Badge({ children, color, className = "" }) {
  const badgeStyle = color ? { backgroundColor: color } : {}

  return (
    <span className={`badge ${className}`} style={badgeStyle}>
      {children}
    </span>
  )
}

export default Badge
