export default function ChangePlanFilter() {
    return (
        <>
            <table className="filterPlanTable">
                <tbody>
                    <tr>
                        <td className="filterField">
                            <p>Filter by Menu</p>
                            <form action="" method="">
                                <label>Allergies:</label>
                                <div>
                                    <label><input type="checkbox" name="allergies" value="peanut"/> Peanut</label><br/>
                                    <label><input type="checkbox" name="allergies" value="dairy"/> Dairy</label><br/>
                                    <label><input type="checkbox" name="allergies" value="gluten"/> Gluten</label><br/>
                                </div>
                            </form>
                        </td>
                        <td className="filterField">
                            <p>Filter by Activity</p>
                            <form action="" method="">
                                <label>Activity:</label>
                                <div>
                                    <label><input type="checkbox" name="activity" value="peanut"/> Walk</label><br/>
                                    <label><input type="checkbox" name="activity" value="dairy"/> Run</label><br/>
                                    <label><input type="checkbox" name="activity" value="gluten"/> Smth else</label><br/>
                                </div>
                            </form>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}