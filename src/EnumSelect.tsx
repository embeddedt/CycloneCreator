import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';


const EnumSelect: React.FC<{ enum: any, value: any, label?: string, onChange?: (e: { currentTarget: { value: any; } }) => void }> = props => {
    const keys = Object.keys(props.enum).filter(key => isNaN(key as any));
    const onChange = (e: React.ChangeEvent<{ value: any; }>) => {
        if(typeof props.onChange == 'function') {
            const key = keys[e.target.value];
            props.onChange({ currentTarget: { value: props.enum[key] } } as any);
        }
    };
    return <FormControl className="game-select">
        {props.label && <InputLabel>{props.label}</InputLabel>}
        <Select value={props.value} onChange={onChange}>
            {keys.map(key => <MenuItem key={key} value={props.enum[key]}>{key}</MenuItem>)}
        </Select>
    </FormControl>;
};
export default EnumSelect;