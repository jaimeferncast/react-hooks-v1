/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import styles from "@/styles/Home.module.css"

const names = ["David", "Iraitz", "Nacho", "Jesús", "Iván", "Chema"]

const Counter = () => {
  const [age, setAge] = useState(0)
  const [namesPosition, setNamePosition] = useState(0)

  useEffect(() => {
    console.log("🦄efecto secundario🦄")
    return () => {
      console.log("🧹cleanup🧹")
    }
  }, [age])

  return (
    <>
      <h1>Your name: {names[namesPosition]}</h1>
      <h1>Your age: {age}</h1>
      <button
        onClick={() => {
          setAge(age + 1)
        }}
      >
        +1
      </button>
      <button
        onClick={() => {
          setAge(age - 1)
        }}
      >
        -1
      </button>
      <button
        onClick={() => {
          setNamePosition((prevState) => {
            let newState = Math.floor(Math.random() * names.length)
            while (prevState === newState) {
              newState = Math.floor(Math.random() * names.length)
            }
            return newState
          })
        }}
      >
        cambiar nombre
      </button>
    </>
  )
}

const DataDisplayer = ({ id }: { id: string }) => {
  const [data, setData] = useState<any>(null)
  const [fetchedId, setFetchedId] = useState<any>(null)

  useEffect(() => {
    let busy = true
    const fetchData = async () => {
      console.log("fetching data for id: " + id)
      setTimeout(async () => {
        const response = await fetch(`https://swapi.dev/api/people/${id}/`)
        const newData = await response.json()
        if (busy) {
          setFetchedId(id)
          setData(newData)
        }
      }, Math.round(Math.random() * 12000))
    }

    if (id) {
      fetchData()
    }

    return () => {
      busy = false
    }
  }, [id])

  if (data) {
    return (
      <>
        <p style={{ color: fetchedId === id ? "green" : "red" }}>
          Displaying Data for: {fetchedId}
        </p>
        <p>{data.name}</p>
      </>
    )
  } else {
    return null
  }
}

export default function UseEffect() {
  const [showCounter, setShowCounter] = useState(false)
  const [dataId, setDataId] = useState("")

  return (
    <div className={styles.container}>
      <button
        onClick={() => {
          setShowCounter(!showCounter)
        }}
      >
        {showCounter ? "Ocultar componente" : "Mostrar componente"}
      </button>
      {showCounter && <Counter />}

      <div style={{ margin: 10, marginTop: 30, borderTop: "1px solid black" }}>
        <h1>Data Fetcher:</h1>
        <input value={dataId} onChange={(e) => setDataId(e.target.value)} />
        <DataDisplayer id={dataId} />
      </div>
    </div>
  )
}
