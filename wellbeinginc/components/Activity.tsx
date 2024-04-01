type ActivityProps = {
    name: string;
    type: string;
    description: string;
    duration: number;
    caloriesBurnt: number;
}

export default function Activity(props : ActivityProps) {

    return (
        <>
            <h1>Activity</h1>
        </>
    )
}