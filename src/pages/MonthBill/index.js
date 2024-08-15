import {  NavBar } from 'antd-mobile'
import { useEffect, useMemo } from 'react'
import groupBy from 'lodash/groupBy'
import classNames from 'classnames'
import dayjs from 'dayjs'
import './index.scss'
import CustomDatePicker from '@/components/CustomDatePicker';


import { getOverview } from '@/contant/billList'
import { useLocation } from 'react-router-dom'
import { useMonthBillList } from '@/hooks/useBillList'
import { useDate } from '@/hooks/useDate'
import TwoLineOverview from '@/components/TwoLineOverview'
import DailyBill from './components/DailyBill'
import { orderBy } from 'lodash'

const MonthlyBill = () => {
  const { state } = useLocation()
  const { date, visible, onShowDate, onHideDate, onDateChange } = useDate()

  const selectedYear = date.get('year')
  const selectedMonth = date.get('month')
  const currentBillList = useMonthBillList(selectedYear, selectedMonth)

  const overview = getOverview(currentBillList)

  const monthBills = useMemo(() => {
    const billGroup = groupBy(currentBillList, item =>
      dayjs(item.date).format('YYYY-MM-DD')
    )
    const sortedKeys = orderBy(
      Object.keys(billGroup),
      // Convert to date numbers for comparison
      item => +new Date(item),
      'desc'
    )
    return {
      keys: sortedKeys,
      billGroup,
    }
  }, [currentBillList])

  useEffect(() => {
    if (state === null) return
    onDateChange(state.date)
  }, [state, onDateChange])

  const renderMonthBills = () => {
    const { keys, billGroup } = monthBills
    return keys.map(key => {
      const dateText = dayjs(key).format('MM/DD')
      const overview = getOverview(billGroup[key])

      return (
        <DailyBill
          key={key}
          overview={overview}
          dateText={dateText}
          billList={billGroup[key]}
        />
      )
    })
  }

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
      Monthly income and expenditure
      </NavBar>

      <div className="content">
        <div className="header">
          <div className="date">
            <span className="text" onClick={onShowDate}>
              {selectedYear} | {selectedMonth + 1}  Statement
            </span>
            <span className={classNames('arrow', visible && 'expand')}></span>
          </div>
          <CustomDatePicker
            className="kaDate"
            title="Accounting date"
            precision="month"
            visible={visible}
            onClose={onHideDate}
            max={new Date()}
            onConfirm={onDateChange}
            okText="confirm"
            cancelText="cancel"
          />

          <TwoLineOverview
            pay={overview.pay}
            income={overview.income}
            type="month"
          />
        </div>

        {renderMonthBills()}
      </div>
    </div>
  )
}

export default MonthlyBill
