export default function ContactFeedback() {
    return (
        <>
            <div id="Feedback">
                <form action="" method="">
                    <legend>Provide Feedback</legend>
                    <select name="Type">
                        <option value="" disabled selected>Select Feedback Topic</option>
                        <option>Home</option>
                        <option>Plan</option>
                        <option>Diary</option>
                        <option>Health Tracker</option>
                        <option>Articles</option>
                        <option>Contact Us</option>
                        <option>Other</option>
                    </select>
                    <textarea name="Content" rows="10"></textarea>
                    <button name="Submit" type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}