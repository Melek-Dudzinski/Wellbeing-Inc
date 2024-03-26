import Navbar from "@/components/Navbar"
import DiaryCalendar from "@/components/DiaryCalendar"
import DiaryEntry from "@/components/DiaryEntry"
import './diary.css';

export default function Diary() {
    return (
        <>
            <Navbar/>
            <DiaryCalendar/>
            <DiaryEntry/>
            <DiaryEntry/>
            <DiaryEntry/>
        </>
    )
}