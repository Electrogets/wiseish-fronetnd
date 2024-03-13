import React, { useState } from 'react';
import { addDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';

const CalenderUpdate = () => {
    const [state, setState] = useState({
        selection: {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        },
        compare: {
            startDate: new Date(),
            endDate: addDays(new Date(), 3),
            key: 'compare'
        }
    });
    return (
        <div>
            <DateRangePicker
                onChange={item => setState({ ...state, ...item })}
                months={1}
                minDate={addDays(new Date(), -300)}
                maxDate={addDays(new Date(), 900)}
                direction="vertical"
                scroll={{ enabled: true }}
                ranges={[state.selection, state.compare]}
            />;
        </div>
    )
}

export default CalenderUpdate