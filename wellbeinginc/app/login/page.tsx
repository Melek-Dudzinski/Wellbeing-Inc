import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import Image from 'next/image';
import logo from '@/components/images/logo.png';
import './login.css';

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {

  {/*Sign In Authentication */}
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      return redirect("/login?message=Could not authenticate user. Please try again.");
    }
    return redirect("/protected");
  };

  {/*Sign Up Account Creation*/}
  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <>
      {/* Page Banner */}
      <div className = "banner"><Image id="img" src={logo} alt="FDM Logo"/></div>
      
      {/*Back Button on Page*/}
      {/*<Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>*/}
      
      <p>Welcome to your personal well-being portal, as part of your FDM experience.</p>

      {/*Sign In Form Layout*/}
      <form>
        <p id = "form-title">
          Sign in to the Wellbeing Portal
        </p>

        <div id = "email-sec">
          <label htmlFor="email">
            Email
          </label>
          <input
            name="email"
            placeholder="you@example.com"
            required
          />
        </div>

        <div id = "pword-sec">
          <label htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
        </div>

        {/*Sign Up/Sign In Buttons*/}
        <SubmitButton className="button"
          formAction={signIn}
          pendingText="Signing In..."
        >
          Sign In
        </SubmitButton>

        <SubmitButton className = "button"
          formAction={signUp}
          pendingText="Signing Up..."
        >
          Sign Up
        </SubmitButton>
        {searchParams?.message && (
          <p id ="message">
            {searchParams.message}
          </p>
        )}
      </form>
    </>
  );
}
