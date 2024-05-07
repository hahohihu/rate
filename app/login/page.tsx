"use client";

import { authenticate } from "@/data/user";
import { useFormState, useFormStatus } from "react-dom";
import AlertIcon from '@/public/alert-circle-error.svg';

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button className="mt-4 p-2 rounded-md w-full bg-color-brand" aria-disabled={pending}>
      Log in
    </button>
  );
}

export default function LoginPage() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <main className="flex items-center justify-center md:h-screen">
      <form action={dispatch}>
        <label
          className="mb-1 block text-xs font-medium text-color-reach"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="peer block w-full rounded-md border border-transparent py-[9px] pl-4 placeholder:text-color-noise bg-color-middle"
          id="password"
          type="password"
          name="password"
          placeholder="Enter password"
          required
        />
        <LoginButton />
        {
          errorMessage && (
            <div className="mt-4 p-2 rounded-md text-color-ordinary bg-red-600 flex gap-1 items-center">
              <div
                className="w-[20px] h-[20px] bg-color-ordinary text-color-ordinary border border-color-ordinary"
                style={{
                  maskImage: `url(${AlertIcon.src})`
                }}></div>
              <p>
                {errorMessage}
              </p>
            </div>
          )
        }
      </form>
    </main >
  );
}
