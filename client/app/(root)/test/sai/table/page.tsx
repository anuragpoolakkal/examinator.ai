"use client"

import { useState, useEffect } from "react"
import { HiMiniDocumentText } from "react-icons/hi2"

//Font.register( {family: "Inter", src: "/assets/font.otf"})

const Table = () => {
  return (
    <>
      <div className="overflow-x-auto m-5">
        <table className="table table-zebra ">
          {/* head */}
          <thead className="bg-gray-300 text-black ">
            <tr>
              <th>Roll No </th>
              <th>Name</th>
              <th>Score</th>
              <th>View Detailed Result</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>
                <HiMiniDocumentText />
              </td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>
                <HiMiniDocumentText />
              </td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>
                <HiMiniDocumentText />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Table
