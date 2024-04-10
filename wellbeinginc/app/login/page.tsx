import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import Image from 'next/image';
import logo from '@/components/images/logo.png';
import './login.css';
import image45 from '@/components/images/image45.png';

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
        <Image className="banner" id="img" src={logo} alt="FDM Logo"/>


        <Image id= "loginphoto" src={image45} alt="Image 45" />

       <div className="welcome">Welcome to your personal well-being portal, as part of your FDM experience.</div>
     

      {/*Sign In Form Layout*/}
      <div className="sign-in-form">
        <form>
        <p id = "form-title">
            Log In
          </p>

          <div id="email-sec" className="sign-in-input">
            <label htmlFor="email">Email:</label>
            <input name="email" required />
          </div>

          <div id="pword-sec" className="sign-in-input">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" required />
          </div>

          {/*Sign Up/Sign In Buttons*/}
          <SubmitButton className="button"
            formAction={signIn}
            pendingText="Signing In..."
          >
            Log In
          </SubmitButton>

           <div className="sign">Dont have an account yet? <SubmitButton formAction={signUp} pendingText="Signing Up..."> Sign Up </SubmitButton></div>
          
          
          {searchParams?.message && (
            <p id ="message">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </>
  );
}
