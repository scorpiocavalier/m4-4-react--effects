import { useEffect } from 'react'

export default (code, callback) => {

  const handleKeydown = event => {
    if(event.code === code)
      callback()
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  })
}
