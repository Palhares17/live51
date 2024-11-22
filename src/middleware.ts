/* Aula 51, time: 4:00:00*/

import { match } from "assert";
import { NextResponse } from "next/server";

// O middleware é executado antes de qualquer rota ser chamada.
// isso permite criar alguma aplicação de autenticação ou validação dentro do middleware.
export function middleware() {
  console.log("middleware");

  return NextResponse.next();
}

export const config = {
  matcher: [],
};