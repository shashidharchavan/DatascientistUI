import axios from 'axios'
import React, { useState, useEffect } from 'react'


export default function MyFeatures() {
    let [features, setFeatures] = useState([]);

    useEffect(() => {
        axios.get("https://featuremarketplacewebapiforcrud.azurewebsites.net/api/Feature/GetFeaturesByEntityName/Stock")
            .then(resp => {
                setFeatures(resp.data);
                console.log(resp.data);
            })
            .catch(err => {

            })

        return () => {

        }
    }, [])

    let maprows = features.map(p => {
        return (
            <tr>
                <td>{p.entityName}</td>
                <td>{p.featureName}</td>
                <td>{p.value}</td>
                <td>{p.featureDataType}</td>
                <td>{p.createdAt}</td>
            </tr>
        )
    })

    return (
        <>
        <div className='table-responsive'>
            <table className='table table-striped table-bordered table-hover' style={{border:"1px solid black"}}>
                <thead>
                    <tr>
                        <th>Entity Name</th>
                        <th>Feature Name</th>
                        <th>Feature Value</th>
                        <th>Feature Type</th>
                        <th>Timestamp</th>
                        {/* Add more table headers as needed */}
                    </tr>
                </thead>
                <tbody>
                    {maprows}
                </tbody>
            </table>
        </div>
        </>
    )
}




