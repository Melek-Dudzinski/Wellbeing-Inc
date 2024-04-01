import PlanTemplate from "./PlanTemplate"

export default function ChangePlanPremade() {
    return (
        <>
            <table className="prePlanTable">
                <tbody>
                    <tr>
                        <td><PlanTemplate name="name1" description="description1"/></td>
                        <td><PlanTemplate name="name2" description="description2"/></td>
                        <td><PlanTemplate name="name3" description="description3"/></td>
                        <td><PlanTemplate name="name4" description="description4"/></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}