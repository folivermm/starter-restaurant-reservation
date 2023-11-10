import React from "react";
import FinishButton from "./FinishButton";
import "./Table.css";

export default function TableInfo({ table, loadDashboard }) {
    const status = table.reservation_id ? "Occupied" : "Free";
    return (
        <div className="table-container">
            <table className="table table-sm table-striped table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Table</th>
                        <th scope="col">Capacity</th>
                        <th scope="col">Status</th>
                        <th scope="col">Finish</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{table.table_id}</td>
                        <td>{table.table_name}</td>
                        <td>{table.capacity}</td>
                        <td data-table-id-status={table.table_id}>{status}</td>
                        <td>
                            <FinishButton
                                status={status}
                                table={table}
                                loadDashboard={loadDashboard}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}


// import React from "react";
// import FinishButton from "./FinishButton";

// export default function TableInfo({ table, loadDashboard }) {
//     const status = table.reservation_id ? "Occupied" : "Free";
//     return (
//         <>
//             <tr>
//                 <th scope="row">{table.table_id}</th>
//                 <td>{table.table_name}</td>
//                 <td>{table.capacity}</td>
//                 <td data-table-id-status={table.table_id}>{status}</td>
//                 <FinishButton
//                     status={status}
//                     table={table}
//                     loadDashboard={loadDashboard}
//                 />
//             </tr>
//         </>
//     );
// }