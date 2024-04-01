import Activity from "./Activity"
import Menu from "./Menu"

type PlanTemplateProps = {
    name: string;
    description: string;
}

export default function PlanTemplate(props : PlanTemplateProps) {
    return (
        <>
            <p>{props.name}</p>
            <p>{props.description}</p>
        </>
    )
}