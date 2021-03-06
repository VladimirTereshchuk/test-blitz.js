import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetChoiceInput = Pick<Prisma.FindFirstChoiceArgs, "where">

export default async function getChoice({ where }: GetChoiceInput, ctx: Ctx) {
  ctx.session.authorize()

  const choice = await db.choice.findFirst({ where })

  if (!choice) throw new NotFoundError()

  return choice
}
