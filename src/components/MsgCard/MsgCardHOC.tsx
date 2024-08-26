import React from 'react'

const MsgCardHOC =
  (OriginalComponent: any) =>
  ({ variant, msg, card, ghost, style, timeOut }: any) => {
    const NewComponent = () => {
      const [state, setState] = React.useState<any>({ variant, msg, card, ghost, style, timeOut })

      return <OriginalComponent {...{ variant, msg, card, ghost, style, timeOut }} />
    }
    const MainComp = NewComponent()

    return MainComp
  }

export default MsgCardHOC
