import { auth, signOut, signIn } from '@/auth';

function SignoutButton() {
    return (
        <form action={async () => {
            "use server";
            await signOut();
        }}>
            <button type="submit" className="p-2 bg-red-600">sign out</button>
        </form>
    )
}

function Signin() {
    return (
        <form action={async () => {
            "use server";
            if (process.env.BYPASS_AUTH) {
                let data = new FormData();
                data.append('password', 'password');
                await signIn('credentials', data);
            } else {
                await signIn("google", { redirectTo: "/" });
            }
        }}>
            <button type="submit" className="p-2 bg-white text-black">Sign in</button>
        </form>
    )
}

export default async function LoginPage() {
    const session = await auth();

    return (
        <main className="flex items-center justify-center h-full my-auto">

            {session?.user ? <SignoutButton />
                : <Signin />
            }
        </main >
    );
}
