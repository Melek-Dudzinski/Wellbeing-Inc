import Image from 'next/image';
import './landing.css'
import logo from '../components/images/logo.png';
import AuthButton from "../components/AuthButton";

export default async function Index() {

  return (
    <>
      <div className="section">
        <h1>Welcome to Wellbeing Inc.</h1>
        <h3>Powered by FDM</h3>
        <div className='center'>
          <Image src={logo} alt="logo" />
        </div>
        <p>Wellbeing Inc. is a wellbeing and mental health web-based application for FDM employees</p>
        <div className='center'>
          <AuthButton />
        </div>
      </div>
    </>
  );
}
