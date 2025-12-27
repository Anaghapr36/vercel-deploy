function Card({ children, className = "" }) {
  return <div className={`section ${className}`}>{children}</div>
}

export default Card
