import dayjs from 'dayjs'

export const billListData = {
  pay: [
    {
      type: 'foods',
      name: 'foods',
      list: [
        { type: 'food', name: 'food' },
        { type: 'drinks', name: 'drinks' },
        { type: 'dessert', name: 'dessert' },
      ],
    },
    {
      type: 'taxi',
      name: 'taxi',
      list: [
        { type: 'taxi', name: 'taxi' },
        { type: 'longdistance', name: 'longdistance' },
      ],
    },
    {
      type: 'recreation',
      name: 'recreation',
      list: [
        { type: 'bodybuilding', name: 'bodybuilding' },
        { type: 'game', name: ' game' },
        { type: 'audio', name: 'audio' },
        { type: 'travel', name: 'travel' },
      ],
    },
    {
      type: 'daily',
      name: 'daily',
      list: [
        { type: 'clothes', name: 'cloths' },
        { type: 'bag', name: 'bag' },
        { type: 'book', name: 'book' },
        { type: 'promote', name: 'promote' },
        { type: 'home', name: 'home' },
      ],
    },
    {
      type: 'other',
      name: 'other',
      list: [{ type: 'community', name: 'community' }],
    },
  ],
  income: [
    {
      type: 'professional',
      name: 'professional',
      list: [
        { type: 'salary', name: 'salary' },
        { type: 'overtimepay', name: 'overtimepay' },
        { type: 'bonus', name: 'bonus' },
      ],
    },
    {
      type: 'other',
      name: 'other',
      list: [
        { type: 'financial', name: 'financial' },
        { type: 'cashgift', name: 'cashgift' },
      ],
    },
  ],
}

export const billTypeToName = Object.keys(billListData).reduce((prev, key) => {
  billListData[key].forEach(bill => {
    bill.list.forEach(item => {
      prev[item.type] = item.name
    })
  })
  return prev
}, {})

export const getOverview = (data = []) => {
  return data.reduce(
    (prev, item) => {
      return {
        ...prev,
        date: item.date,
        [item.type]: prev[item.type] + +item.money,
      }
    },
    { pay: 0, income: 0, date: null }
  )
}

export const getMonthOverview = (data, month) => {
  // There may be multiple bills in a given month
  const bill = data.filter(item => {
    return month === dayjs(item.date).get('month')
  })
  return getOverview(bill)
}
