import React from 'react'

export default function SearchResult(props) {

    var results = [];


    for (var key in props) {
        results.push([key, props[key]]);
    }



    console.log(results);
    let mappedresult = results.map(temp => {
        return (
            <>

                <div className="card mx-auto m-4 ">

                    <h5 className="card-title">{temp[1].entityName}</h5>
                    <p className="card-text">{temp[1].description}</p>


                </div>
                <br />
                <br />
            </>
        )
    })
    return (

        <>


            {mappedresult}


        </>
    )
}
