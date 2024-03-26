import './contact.css'
import Navbar from '@/components/Navbar'
import ContactFeedback from '@/components/ContactFeedback'
import ContactChampions from '@/components/ContactChampions'

export default function contact() {
    return (
        <>
            <div id="Navbar">
                <Navbar />
            </div>
            <div id="Feedback">
                <ContactFeedback />
            </div>
            <div id="Information">
                <ContactChampions />
            </div>
        </>
    )
}