const getStates = (data: any) => {
  let states: any = []
  data &&
    data.map((i: any) => {
      let city = data && data.filter((o: any) => o?.address?.state === i?.address?.state)
      let options: any = []
      city &&
        city.map((a: any) => options.push({ label: a?.address?.city, value: a?.address?.city }))

      states.push({ label: i?.address?.city, options })
    })
  return states
}

let removeDupCity = (data: any, title: any) => {
  let newData: any = []

  data &&
    data.map((i: any) => {
      let options = removeDuplicates(i.options, title)
      newData.push({ label: i.label, options })
    })
  return newData
}

function removeDuplicates(data: any, title: any) {
  let newArray: any = []

  let uniqueObject: any = {}
  for (let i in data) {
    let objTitle = data[i][title]

    uniqueObject[objTitle] = data[i]
  }

  for (let i in uniqueObject) {
    newArray.push(uniqueObject[i])
  }

  return newArray
}

export const removeDuplicatesArrObj = (data: any) => {
  const states = getStates(data)

  return removeDupCity(removeDuplicates(states, 'label'), 'label')
}

export const getKeyValue = (data: any, item: any) => {
  let keys = item.split('.')

  let value: any = data
  keys.map((a: any, i: any) => {
    value = value[a]
  })
  return value
}
