import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import styled from 'styled-components'
import { FlexDiv } from '../../../../style/styled'

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

const orderStatus = ['Order fulfillment status', 'Status warnings']

function TablePreferencesModal({
  preferencesModal,
  setPreferencesModal,
  onTablePreferenceModalCancel,
  allOptionsChecked,
  setAllOptionsChecked,
  onPreferenceModalChange,
  orderDateOptionsArray,
  orderDetailsOptionsArray,
  orderProductNameArray,
  orderCustomerOptionsArray,
}) {
  return (
    <>
      <Modal open={preferencesModal} onClose={() => setPreferencesModal(false)}>
        <Box sx={style}>
          <FlexDiv width="100%" column>
            <FlexDiv width="100%" justifyContentFlexStart>
              <FlexDiv style={{ borderRight: '1px solid green' }}>
                <Button variant="text" color="success" onClick={() => setAllOptionsChecked(true)}>
                  Check all options
                </Button>
              </FlexDiv>
              <FlexDiv style={{ borderRight: '1px solid green' }}>
                <Button variant="text" color="success" onClick={() => setAllOptionsChecked(false)}>
                  UnCheck all (optional) options
                </Button>
              </FlexDiv>
              <FlexDiv>
                <Button variant="text" color="success">
                  Reset to default preferences
                </Button>
              </FlexDiv>
            </FlexDiv>
            <FlexDiv width="100%" column>
              <FlexDiv width="100%" justifyContentSpaceEvenly style={{ margin: '20px' }}>
                <FlexDiv width="30%" column>
                  <h3>Order date</h3>
                  {orderDateOptionsArray?.map((item, index: number) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        disabled={item.valueName === 'day'}
                        checked={allOptionsChecked || item.checked}
                        name={item.name}
                        value={item.valueName}
                        onChange={event => onPreferenceModalChange(event, index)}
                      />
                      <label> {item.displayName}</label>
                    </div>
                  ))}
                </FlexDiv>
                <FlexDiv width="30%" column>
                  <h3>Order details</h3>
                  {orderDetailsOptionsArray?.map((item, index: number) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        checked={allOptionsChecked || item.checked}
                        disabled={item.valueName === 'orderId' || item.valueName === 'firstName'}
                        name={item.name}
                        value={item.valueName}
                        onChange={event => onPreferenceModalChange(event, index)}
                      />
                      <label> {item.displayName}</label>
                    </div>
                  ))}
                </FlexDiv>
                <FlexDiv width="30%" column>
                  <h3>Product</h3>
                  {orderProductNameArray?.map((item, index: number) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        checked={allOptionsChecked || item.checked}
                        disabled={item.valueName === 'name' || item.valueName === 'quantity'}
                        name={item.name}
                        value={item.valueName}
                        onChange={event => onPreferenceModalChange(event, index)}
                      />
                      <label> {item.displayName}</label>
                    </div>
                  ))}
                </FlexDiv>
              </FlexDiv>
              <FlexDiv width="100%" justifyContentSpaceEvenly style={{ marginTop: '20px' }}>
                <FlexDiv width="40%" column>
                  <h3>Customer option</h3>
                  {orderCustomerOptionsArray?.map((item, index: number) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        checked={allOptionsChecked || item?.checked}
                        disabled={item.valueName === 'shipping'}
                        name={item.name}
                        value={item.valueName}
                        onChange={event => onPreferenceModalChange(event, index)}
                      />
                      <label> {item.displayName}</label>
                    </div>
                  ))}
                </FlexDiv>
                <FlexDiv width="40%" column>
                  <h3>Order status</h3>
                  {orderStatus?.map((item, index: number) => (
                    <div key={index}>
                      <input type="checkbox" disabled checked id={item} name={item} value={item} />
                      <label> {item}</label>
                    </div>
                  ))}
                </FlexDiv>
              </FlexDiv>
            </FlexDiv>
            <FlexDiv width="100%" justifyContentFlexEnd style={{ marginTop: '20px' }}>
              <button
                onClick={onTablePreferenceModalCancel}
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
              <SubmitButton onClick={onTablePreferenceModalCancel}>Save Preferences</SubmitButton>
            </FlexDiv>
          </FlexDiv>
        </Box>
      </Modal>
    </>
  )
}

export default TablePreferencesModal
