import React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRangePicker } from 'react-date-range'
import styled from 'styled-components'
import { FlexDiv } from '../../../../style/styled'
import './customRange.css'
const style = {
  position: 'absolute' as 'absolute',
  top: '53%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
const SubmitButton = styled.button`
  color: #4f4545;
  font-size: 15px;
  padding: 10px 15px;
  font-weight: bold;
  width: 150px;
  background-color: yellow;
  border: 1px solid #000;
  cursor: pointer;
  border-radius: 10px;
`

function CustomDateRangeModal({
  submit,
  customDateRangeModal,
  onCustomDateRangeModalClose,
  customDateRangeSelection,
  onCustomDateRangeChange,
}) {
  return (
    <Modal open={customDateRangeModal.open} onClose={onCustomDateRangeModalClose}>
      <Box sx={style}>
        <FlexDiv width="100%" column style={{ minWidth: '500px' }}>
          <DateRangePicker
            onChange={item => onCustomDateRangeChange(item)}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={true}
            months={2}
            ranges={customDateRangeSelection}
            direction="horizontal"
          />
        </FlexDiv>
        <FlexDiv width="100%" justifyContentFlexEnd style={{ marginTop: '20px' }}>
          <button
            onClick={onCustomDateRangeModalClose}
            style={{
              borderRadius: '10px',
              padding: '10px',
              background: 'transparent',
              color: '#5a5757',
              fontSize: '15px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginRight: '10px',
            }}>
            Cancel
          </button>
          <SubmitButton onClick={submit}>Submit</SubmitButton>
        </FlexDiv>
      </Box>
    </Modal>
  )
}

export default CustomDateRangeModal
