import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getQuestions from "app/questions/queries/getQuestions"

const ITEMS_PER_PAGE = 10

export const QuestionsList = () => {
  // const [questions] = useQuery(getQuestions, { orderBy: { id: "desc" } })
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ questions, hasMore }] = usePaginatedQuery(getQuestions, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })
  console.log(questions)
  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <Link href={`/questions/${question.id}`}>
              <a>{question.text}</a>
            </Link>
            <ul>
              {question.choices.map((choice) => (
                <li key={choice.id}>
                  {choice.text} - {choice.votes} votes
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const QuestionsPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/questions/new">
          <a>Create Question</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <QuestionsList />
      </Suspense>
    </div>
  )
}

QuestionsPage.getLayout = (page) => <Layout title={"Questions"}>{page}</Layout>

export default QuestionsPage
