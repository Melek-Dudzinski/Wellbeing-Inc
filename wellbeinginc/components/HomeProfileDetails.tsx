import { createClient } from "@/utils/supabase/server";

type HomeProfileDetailsProps = {
    userName: string;
    userEmail: string;
    userRole: string;
  }

export default function HomeProfileDetails(props: HomeProfileDetailsProps) {

  return (
    <>
        <h3>Name: {props.userName}</h3>
        <p>Email: {props.userEmail}</p>
        <p>Status: {props.userRole}</p>
    </>
  )
}