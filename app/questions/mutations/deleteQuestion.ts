import { Ctx } from "blitz"
import db, { Prisma } from "db"

console.log(db)

type DeleteQuestionInput = Pick<Prisma.QuestionDeleteArgs, "where">

// export default async function deleteQuestion({ where }: DeleteQuestionInput, ctx: Ctx) {
//   ctx.session.authorize()

//   const question = await db.question.delete({ where })

//   return question
// }

export default async function deleteQuestion({ where }: DeleteQuestionInput, ctx: Ctx) {
  ctx.session.authorize()
  // TODO: remove once Prisma supports cascading deletes
  await db.choice.deleteMany({ where: { question: { id: where.id } } })
  const question = await db.question.delete({ where })
  return question
}
