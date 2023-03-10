import { useReducer, useState } from "react"
import styles from "@/styles/Home.module.css"

// // 1 - Avoiding recreating the initial state + Updating state based on the previous state
// const getInitialState = () => {
//   console.log("llamando al estado inicial")
//   return 42
// }

// export default function Counter() {
//   const [age, setAge] = useState(getInitialState)

//   const increment = (prevAge: number) => {
//     setAge(prevAge + 1)
//   }
//   const tripleIncrement = () => {
//     setAge((newAge) => newAge + 1)
//     setAge((newAge) => newAge + 1)
//     setAge((newAge) => newAge + 1)
//   }

//   return (
//     <div className={styles.container}>
//       <h1>Your age: {age}</h1>
//       <button
//         onClick={() => {
//           increment(age)
//         }}
//       >
//         +1
//       </button>
//       <button
//         onClick={() => {
//           tripleIncrement(age)
//         }}
//       >
//         +3
//       </button>
//     </div>
//   )
// }

// // 2 - Resetting state with a key
// export default function App() {
//   const [version, setVersion] = useState(0)

//   function handleReset() {
//     setVersion(version + 1)
//   }

//   return (
//     <div className={styles.container}>
//       <button onClick={handleReset}>Reset</button>
//       <Form key={version} />
//     </div>
//   )
// }

// function Form() {
//   const [name, setName] = useState("Pepe")

//   return (
//     <>
//       <input value={name} onChange={(e) => setName(e.target.value)} />
//       <p>Hola {name}!</p>
//     </>
//   )
// }

// // 3 - Use setState during render
// export default function Counter() {
//   const [count, setCount] = useState(0)

//   return (
//     <div className={styles.container}>
//       <h1>Couunt: {count}</h1>
//       <button
//         onClick={() => {
//           setCount(count + 1)
//         }}
//       >
//         +1
//       </button>
//       <button
//         onClick={() => {
//           setCount(count - 1)
//         }}
//       >
//         -1
//       </button>
//       <CountLabel count={count} />
//     </div>
//   )
// }

// const CountLabel = ({ count }: { count: number }) => {
//   const [prevCount, setPrevCount] = useState(count)
//   const [trend, setTrend] = useState<"increasing" | "decreasing" | null>(null)

//   if (count !== prevCount) {
//     setPrevCount(count)
//     setTrend(count > prevCount ? "increasing" : "decreasing")
//   }

//   return (
//     <>
//       <h1>{count}</h1>
//       {trend && <p>The count is {trend}</p>}
//     </>
//   )
// }

// Bonus - useReducer
const dataReducer = (state, action) => {
  switch (action.type) {
    case "change_name":
      return {
        ...state,
        name: action.payload,
      }
    case "change_age":
      return {
        ...state,
        age: action.payload,
      }

    default:
      break
  }
}

export default function Reducer() {
  const [name, setName] = useState("Pepe")
  const [age, setAge] = useState(18)

  const [state, dispatch] = useReducer(dataReducer, { name: "Pepe", age: 18 })

  return (
    <div className={styles.container}>
      <h3>Rellena los datos:</h3>
      <input
        placeholder="nombre"
        value={state.name}
        onChange={(e) =>
          dispatch({ type: "change_name", payload: e.target.value })
        }
      />
      <button
        style={{ width: "212px" }}
        onClick={() => dispatch({ type: "change_age", payload: age + 1 })}
      >
        añadir año
      </button>
      <button
        style={{ width: "212px" }}
        onClick={() => dispatch({ type: "change_age", payload: age - 1 })}
      >
        quitar año
      </button>
      <hr />
      <h3>Resultado:</h3>
      <p>
        Me llamo {state.name} y tengo {state.age} años.
      </p>
    </div>
  )
}
