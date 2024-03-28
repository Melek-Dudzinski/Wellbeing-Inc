import Image from 'next/image'
import blank from './images/Blank Profile Picture.jpg'

export default function ContactChampions() {
    return (
        <>
            <div id="Information">
                <h2>Mental Health Champions</h2>
                <div className="Champion">
                    <Image src={blank} alt="Blank" height="150" width="150"/>
                    <div>
                        <h3>Name</h3>
                        <p>Profile</p>
                        <p>Contact Information</p>
                    </div>
                </div>
                <div className="Champion">
                    <Image src={blank} alt="Blank" height="150" width="150"/>
                    <div>
                        <h3>Name</h3>
                        <p>Profile</p>
                        <p>Contact Information</p>
                    </div>
                </div>
                <div className="Champion">
                    <Image src={blank} alt="Blank" height="150" width="150"/>
                    <div>
                        <h3>Name</h3>
                        <p>Profile</p>
                        <p>Contact Information</p>
                    </div>
                </div>
            </div>
        </>
    )
}