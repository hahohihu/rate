import { auth, signOut, signIn } from '@/auth';

export default async function LoginPage() {
    const session = await auth();

    return (
        <main className="flex items-center justify-center h-full my-auto">

            {session?.user ?
                <form action={async () => {
                    "use server";
                    await signOut();
                }}>
                    <button type="submit" className="p-2 bg-red-600">sign out</button>
                </form>
                :
                <form action={async () => {
                    "use server";
                    await signIn("google", { redirectTo: "/" });
                }}>
                    <button type="submit" className="p-2 bg-white text-black">Sign in with Google</button>
                </form>
            }
        </main >
    );
}
