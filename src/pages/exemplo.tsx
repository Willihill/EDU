import React, { useState, useEffect } from 'react'

const ExemploScreen = () => {
  const [salaId, setSalaId] = useState('')

  useEffect(() => {
    console.log('MUDOU')

    return () => {
      console.log('DUMIU')
    }
  }, [])

  // useEffect(() => {
  //   if (salaId.length < 10) return

  //   setSalaId('')
  // }, [salaId])

  const onChangeSalaId = (e: any) => {
    setSalaId(e.target.value)
  }

  return (
    <div>
      <input
        type='text'
        value={salaId}
        onChange={onChangeSalaId}
      />
      {/* <button id='btnCreate'>Criar sala</button> */}
      <hr />
      <h1>Sala ID: {salaId} - ({salaId.length})</h1>

      {salaId.length > 10 && (
        <h3>Maior que 10</h3>
      )}
    </div>
  )
}

export default ExemploScreen
