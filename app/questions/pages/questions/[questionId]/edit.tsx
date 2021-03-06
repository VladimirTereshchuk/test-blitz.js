import { Suspense, useState } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getQuestion from "app/questions/queries/getQuestion"
import updateQuestion from "app/questions/mutations/updateQuestion"
import QuestionForm from "app/questions/components/QuestionForm"
import updateChoice from "app/choices/mutations/updateChoice"

export const EditQuestion = () => {
  const router = useRouter()
  const questionId = useParam("questionId", "number")
  const [question, { setQueryData }] = useQuery(getQuestion, { where: { id: questionId } })
  const [updateQuestionMutation] = useMutation(updateQuestion)
  const [updateChoiceMutation] = useMutation(updateChoice)
  // const [name, setName] = useState("")
  // const [choiceOne, setchoiceOne] = useState("")
  console.log(question.choices)

  return (
    <div>
      <h1>Edit Question {question.id}</h1>
      <pre>{JSON.stringify(question, null, 2)}</pre>

      <QuestionForm
        initialValues={question}
        onSubmit={async (event) => {
          try {
            const updated: any = await updateQuestionMutation({
              where: { id: question.id },
              data: {
                text: "value2",
              },
            })
            await setQueryData(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push(`/questions/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error editing question " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditQuestionPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditQuestion />
      </Suspense>

      <p>
        <Link href="/questions">
          <a>Questions</a>
        </Link>
      </p>
    </div>
  )
}

EditQuestionPage.getLayout = (page) => <Layout title={"Edit Question"}>{page}</Layout>

export default EditQuestionPage
