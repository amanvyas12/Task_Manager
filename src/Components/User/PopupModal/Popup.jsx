import React, { useState } from 'react'
import styles from './popup.module.css'
import {Modal,ModalHeader,ModalBody} from 'reactstrap'

const Popup = (props) => {

    const[modal, setModal] = useState(true);
    const [message, setMessage] = useState('');
    const {rowData, tableData, setTableData} = props

    const handleChange = (event) => {
        setMessage(event.target.value);
      };
    
      const handleClick = (event) => {
        event.preventDefault();
        // console.log(message);
        console.log(tableData)
        console.log(rowData)
        setModal(!true);
        rowData.map((v)=>{
            console.log(v.name)
            v.subtask = message
            // rowData.push()
            setTableData(message)
        })
      };

  return (
    <div>
        <Modal
            size='md'
            isOpen={modal}
            toggle={()=> setModal(!modal)}
        >
            <ModalHeader
                toggle={()=> setModal(!modal)}
            >
                Sub Task 
            </ModalHeader>
            <ModalBody>
                <textarea 
                    name="message" 
                    cols="49" 
                    rows="4" 
                    onChange={handleChange}
                    value={message}
                    message={message}
                ></textarea>
                <button className={styles.assign_subtask} onClick={handleClick}>Assign Sub Task</button>
            </ModalBody>
        </Modal>
    </div>
  )
}

export default Popup