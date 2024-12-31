
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { getImports, getSpecificItemRemoveColumn, getSpecificItemTrainTestSpilt, getSpecificItemRemoveRow } from '../../getFromConfig';

import ImportModal from './importModal';
import RemoveColumnModal from './removeColumnModal';
import TrainTestSplitModal from './train-testSplitModal';
import RemoveRowModal from './removeRowModal';

interface Props {
    name: string;
    show: boolean; 
    onHide: () => void; 
}

const ButtonModal: React.FC<Props> = (props) => { 
  const [uploadedFilename, setUploadedFilename] = useState<string | null>(null);  // State to store uploaded filename

  let modal = <></>;
  const modalName = props.name.split("_")[0];

  const IMPORT = getImports();
  const REMOVE_COLUMN = getSpecificItemRemoveColumn();
  const REMOVE_ROW = getSpecificItemRemoveRow();
  const TRAIN_TEST_SPLIT = getSpecificItemTrainTestSpilt();


  if (IMPORT.includes(modalName)) {
    modal = <ImportModal onFileUpload={setUploadedFilename} />;  // Pass the callback function to ImportModal
    console.log("Uploaded filename:", uploadedFilename);
  } else if (REMOVE_COLUMN === modalName) {
    modal = <RemoveColumnModal />;
  }else if (REMOVE_ROW === modalName) {
    modal = <RemoveRowModal />;
  } else if (TRAIN_TEST_SPLIT === modalName) {
    modal = <TrainTestSplitModal />;
  }
  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            {props.name.split("_")[0]}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        {modal}

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ButtonModal;

