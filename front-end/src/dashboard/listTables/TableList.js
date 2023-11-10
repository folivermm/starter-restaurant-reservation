import React from "react";
import TableInfo from "./TableInfo";
import "./Table.css"; // Import the CSS file

export default function TableList({ tables, loadDashboard }) {
    if (!tables) {
        return null;
    }

    const formatted = tables.map((table) => {
        return (
            <div key={table.table_id} className="table-list-container">
                <TableInfo table={table} loadDashboard={loadDashboard} />
            </div>
        );
    });

    return <div>{formatted}</div>;
}


// import React from "react";
// import TableInfo from "./TableInfo";

// export default function TableList({ tables, loadDashboard }) {
//     if (!tables) {
//         return null;
//     }

//     const formatted = tables.map((table) => {
//         return (
//             <TableInfo key={table.table_id} table={table} loadDashboard={loadDashboard} />
//         );
//     });

//     return (
//         <div>
//             <table className="table table-sm table-striped table-bordered">
//                 <thead>
//                     <tr>
//                         <th scope="col">ID #</th>
//                         <th scope="col">Table</th>
//                         <th scope="col">Capacity</th>
//                         <th scope="col">Status</th>
//                         <th scope="col">Finish</th>
//                     </tr>
//                 </thead>
//                 <tbody>{formatted}</tbody>
//             </table>
//         </div>
//     );
// }