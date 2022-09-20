import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import styles from './task.module.css'
import Popup from '../PopupModal/Popup'
import fire from '../../../fire'

const Task = (props) => {

    const[modal, setModal] = useState(false)
    const[rowData, setRowData] = useState([]);
    const[addTaskDisabled, setAddTaskDisabled] = useState(true)

    // function to handle add sub task button only admin can add it
    useEffect(()=>{
      fire.auth().onAuthStateChanged(user => {
          if (user) {
            const a = user._delegate.email
            if (a=="admin@gmail.com") {
              setAddTaskDisabled(false)
              console.log("clicked")
            }
          }
        })
    },[])

    // const{message} = props
    const[tableData, setTableData] = useState([
      {name:"Aman", task:"project needs to be done", status:"active", priority: "high", date: "22/12/2022", subtask:''},
      {name:"raj", task:"RGI project", status:"active", priority: "low", date: "22/12/2022", subtask:''},
      {name:"sid", task:"UI work", status:"active", priority: "low", date: "22/12/2022", subtask:''},
      {name:"shree", task:"backend work", status:"active", priority: "high", date: "22/12/2022", subtask:''}
    ])

    const columns = [
        {title: "Name", field: "name"},
        {title: "Task", field:"task"},
        {title: "Status", field:"status"},
        {title: "Priority", field:"priority"},
        {title: "Subtask", field:"subtask"},
        {title: "Date", field:"date"},
    ]

  return (
    <div className={styles.task_data}>
      <div className={styles.task_table}>
        {modal && <Popup rowData={rowData} tableData={tableData} setTableData={setTableData}/>}
        <MaterialTable columns={columns} 
          data={tableData}
          editable={{
            onRowAdd:(newRow)=> new Promise((resolve, reject)=>{
              setTableData([...tableData,newRow])
              setTimeout(() => resolve(), 500);
            }),
            // onRowUpdate:(newRow, oldRow)=> new Promise((resolve, reject)=>{
            //   const updatedData=[...tableData]
            //   updatedData[oldRow.tableData.id]=newRow
            //   setTableData(updatedData)
            //   setTimeout(() => resolve(), 500);
            // }),
            // onRowDelete:(selectedRow)=> new Promise((resolve, reject)=>{
            //   const updatedData = [...tableData]
            //   updatedData.splice(selectedRow.tableData.id,1)
            //   setTableData(updatedData)
            //   setTimeout(() => resolve(), 1000); 
            // }),
          }}

          actions={[
            {icon:()=><button disabled={addTaskDisabled} className={styles.add_subtasks}>Add Sub Task</button>,
            tooltip:"add sub task",
            onClick:(e,data)=>{
              setModal(true)
              fire.auth().onAuthStateChanged(user => {
                if (user) { 
                  const admin = user._delegate.email
                  if (admin=="admin@gmail.com") {
                    setAddTaskDisabled(!true)
                    console.log("new")
                  }
                }
              })
            },
            // isFreeAction:true
          }
          ]}

          onSelectionChange={(selectedRow)=>{
            selectedRow.map((val)=>{
              setRowData(selectedRow)
            })
          }}

          options={{searchFieldVariant:"standard", actionsColumnIndex:-1, selection:true}}
          title="Task Details"
        />  
      </div>
      <div className={styles.task_board}>Coming Soon....</div>
    </div>
  )
}

export default Task