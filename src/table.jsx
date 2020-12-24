import React from 'react';



const TableBuilder = ({data}) => {
    return data.map((row,i)=>{
        let{item1,item2,item3,item4,item5}=row;
        return (
        
            
             <tr key={i}>
                 <td >{item1}</td>
                 <td>{item2}</td>
                 <td>{item3}</td>
                 <td>{item4}</td>
                <td>{item5}</td>
            </tr>
         
         )
    })
    };

export default TableBuilder;