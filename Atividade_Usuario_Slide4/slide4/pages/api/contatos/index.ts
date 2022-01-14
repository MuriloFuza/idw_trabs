import { NextApiRequest, NextApiResponse } from "next";

import {prisma} from '../../../services/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { method } = req;

  switch (method) {
    case "GET": {
      const contacts = await prisma.contatos.findMany({
        orderBy: [
          {
            dataCadastro: "desc",
          },
        ],
      });

      res.status(200).json(contacts);
      break;
    }
    case "POST": {
      const {
        body: { id, nome, telefone, email, observacao },
      } = req;
      const totalContacts = await prisma.contatos.count();
      const contact = await prisma.contatos.upsert({
        where: {
          id: Number(id ?? totalContacts + 1),
        },
        update: {
          nome,
          email,
          telefone,
          observacao,
        },
        create: {
          nome,
          email,
          telefone,
          observacao,
        },
      });

      res.status(200).json(contact);
      break;
    }
    case "DELETE": {

     const deletedFull = await prisma.contatos.deleteMany();
      res.status(200).json(deletedFull);
      break;
    }
    default: {
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
}