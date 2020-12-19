import React, { useState } from "react"

type QuestionFormProps = {
  initialValues: any
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

const QuestionForm = ({ initialValues, onSubmit }: QuestionFormProps) => {
  // console.log(initialValues)
  // const [name, setName] = useState(initialValues.text || "")
  // const [choiceOne, setchoiceOne] = useState(initialValues.choices[0].text || "")

  const handleInput = (e) => {
    console.log(e)
  }
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        width: "300px",
        height: "200px",
        justifyContent: "space-between",
      }}
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(event)
      }}
    >
      <input
        placeholder="Name"
        //  value={name} onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Choice 1"
        // value={choiceOne}
        // onChange={(e) => setchoiceOne(e.target.value)}
      />
      {/* <input
        placeholder="Choice 2"
        // value={initialValues.choices[1] ? initialValues.choices[1].text : ""}
      />
      <input
        placeholder="Choice 3"
        // value={initialValues.choices[2] ? initialValues.choices[2].text : ""}
      /> */}
      <button>Submit</button>
    </form>
  )
}

export default QuestionForm
