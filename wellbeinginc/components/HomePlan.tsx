import './HomePlan.css';
export default function HomePlan() {
    return (
        <>
            <div className='plan-container'>
                <h1>YOUR PLAN</h1>
                <table>
                    <tbody>
                        <tr>
                            <td className='name-cell'>BREAKFAST</td>
                            <td className='data-container'></td>
                        </tr>
                        <tr>
                            <td className='name-cell'>SNACK</td>
                            <td className='data-container'></td>
                        </tr>
                        <tr>
                            <td className='name-cell'>LUNCH</td>
                            <td className='data-container'></td>
                        </tr>
                        <tr>
                            <td className='name-cell'>DINNER</td>
                            <td className='data-container'></td>
                        </tr>
                        <tr>
                            <td className='name-cell'>EXERCISE</td>
                            <td className='data-container'></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}