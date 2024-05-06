import React, {useEffect, useState} from 'react';

function ExcelSimulation({onAddRow}) {
    const [montant1, setMontant1] = useState(0);
    const [montant2, setMontant2] = useState(0);
    const [montant3, setMontant3] = useState(0);

    const calculateTotal = (m1, m2) => {
        return parseFloat(m1) + parseFloat(m2);
    };

    useEffect(() => {
        const total = calculateTotal(montant1, montant2);
        setMontant3(total);
    }, [montant1, montant2]);

    const handleMontant1Change = (e) => {
        setMontant1(parseFloat(e.target.value));
    };

    const handleMontant2Change = (e) => {
        setMontant2(parseFloat(e.target.value));
    };

    return (
        <>
            <h1>Simulation Excel</h1>
            <table>
                <thead>
                <tr>
                    <th>Montant 1</th>
                    <th>Montant 2</th>
                    <th>Montant 3 (Total)</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><input type="number" value={montant1} onChange={handleMontant1Change}/></td>
                    <td><input type="number" value={montant2} onChange={handleMontant2Change}/></td>
                    <td><h1>{montant3}</h1></td>
                </tr>
                </tbody>
            </table>
        </>
    );
}

export default ExcelSimulation;
