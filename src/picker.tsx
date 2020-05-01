import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { useEffect, useState } from 'react';

function formatDate(d: Date) {
    let month:string|number = d.getMonth() + 1
    if (d.getMonth() + 1 < 10) {
        month = '0' + (d.getMonth()+1) 
    }
    let day:string|number = d.getDate()
    if (d.getDate()<10){
        day = '0' + d.getDate()
    }
    return d.getFullYear() + '-' + month + '-' + day;
}

const Picker: React.FC<{ birthDay?: string, onChange: (date: string) => void }> = ({ birthDay, onChange }) => {
    const [selectedDate, setSelectedDate] = useState(new Date(birthDay ?? Date.now()));

    return (
        <div className='flex justify-start'>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker

                        format="yyyy-MM-dd"
                        value={selectedDate}
                        onChange={date => {
                            setSelectedDate(date);
                            onChange(formatDate(date).toString());
                        }}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
        </div>
    );
}
export default Picker
