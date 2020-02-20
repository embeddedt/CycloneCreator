import React from 'react';
import { Button } from '@material-ui/core';

const MAX_LATITUDE = 6;
const LatitudeLine = props => (
    <div className="latitude-line" style={props.style}><span className="latitude-line-label">{props.children}</span></div>
);
export { LatitudeLine };
const LatitudeChooser: React.FC<{ value: number; onChange?: (e: { currentTarget: { value: number; }}) => void }> = (props) => {
    const onClick = delta => {
        const n = props.value + delta;
        if(typeof props.onChange == 'function' && n >= 0 && n < MAX_LATITUDE)
            props.onChange({ currentTarget: { value: n }});
    };
    return <div className="latitude-chooser">
        <img src="assets/worldbkgd.jpg"/>
        <div className="latitude-lines">
            <LatitudeLine>50 N</LatitudeLine>
            <LatitudeLine>40 N</LatitudeLine>
            <LatitudeLine>30 N</LatitudeLine>
            <LatitudeLine>20 N</LatitudeLine>
            <LatitudeLine>10 N</LatitudeLine>
            <LatitudeLine>Equator</LatitudeLine>
        </div>
        <div className="latitude-selector" style={{ transform: `translateY(${props.value*1.5}em)`}}><span>LATITUDE<br/>RANGE</span></div>
        <div className="latitude-controls">
            <Button disabled={props.value <= 0} onClick={onClick.bind(void 0, -1)}>MOVE NORTH</Button>
            <Button disabled={props.value >= (MAX_LATITUDE - 1)} onClick={onClick.bind(void 0, 1)}>MOVE SOUTH</Button>
        </div>
    </div>;
};
export default LatitudeChooser;