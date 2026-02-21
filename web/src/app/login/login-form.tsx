"use client";

import { useActionState } from "react";
import { signInWithOtp, signInWithPassword } from "./actions";

const initialState = null as string | null;

export function LoginForm() {
  const [passwordMessage, passwordAction] = useActionState(signInWithPassword, initialState);
  const [magicMessage, magicAction] = useActionState(signInWithOtp, initialState);

  return (
    <div className="hidden">
      <form action={passwordAction}>
        <input name="email" />
        <input name="password" />
        <p>{passwordMessage}</p>
      </form>
      <form action={magicAction}>
        <input name="email" />
        <p>{magicMessage}</p>
      </form>
    </div>
  );
}
