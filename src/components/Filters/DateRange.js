import React, {Component} from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './datePicker.css';
import {connect} from 'react-redux';
import {changeDateRange} from '../../AC';

class DateRange extends Component {

    handleDayClick = (day) => {
        const range = DateUtils.addDayToRange(day, this.props.dateRange);
        this.props.changeDateRange(range);
    }

    render () {
        const { from, to } = this.props.dateRange;
        const modifiers = { start: from, end: to };

        return (
            <div>
                <DayPicker
                    className="Selectable"
                    numberOfMonths={this.props.numberOfMonths}
                    selectedDays={[from, { from, to }]}
                    modifiers={modifiers}
                    onDayClick={this.handleDayClick}
                />
                <p>
                    {!from && !to && 'Please select the first day.'}
                    {from && !to && 'Please select the last day.'}
                    {from &&
                        to &&
                        `Selected from ${from.toLocaleDateString()} to
                        ${to.toLocaleDateString()}`}{' '}
                </p>
            </div>
        );
    }
}

const decorator = connect((state) => ({
    dateRange: state.filters.dateRange
}), {changeDateRange});

export default decorator(DateRange);
