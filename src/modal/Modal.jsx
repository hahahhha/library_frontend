import React, { useState } from 'react'

function Modal(props) {
  const [title, setTitle] = useState(props.title);
  const [submitText, setSubmitText] = useState(props.submitText);
  const [cancelText, setCancelText] = useState(props.cancelText || 'Закрыть');

  const { id } = props;
  const { cleanFunc } = props;
  const { submitFunc } = props;

  const submitClick = () => {
    submitFunc();
    cleanFunc();
  }

  return (
    <>
      {/* Модальное окно */}
      <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addStudentModal">{title}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {props.children}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={submitClick}>{submitText}</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{cancelText}</button>
            </div>

          </div>
        </div>
      </div>
      
    </>

  )
}

export default Modal