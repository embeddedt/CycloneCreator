import React from 'react';
import { LatitudeLine } from './LatitudeChooser';
import { Button } from '@material-ui/core';

const SeaTemperatureSelector = (props) => {
    const onClick = delta => {
        const n = props.value + delta;
        if(typeof props.onChange == 'function' && n >= 21 && n <= 26.5)
            props.onChange({ currentTarget: { value: n }});
    };
    return <div className="latitude-chooser sea-temperature-chooser">
        <img src="assets/wave.png" className="wave-overlay"/>
        <div className="temperature-background">
            <div className="temperature-mover" style={{transform: `translateY(${((props.value-21)/5.5)*50}%)`}}></div>
            <div className="current-temperature">{props.value} &deg;C</div>
            <div className="thermometer-container">
                <div className="thermometer-fill">
                    <div style={{ height: `${((props.value-21)/5.5)*100}%`}}></div>
                </div>
                <div className="thermometer-bulb"></div>
            </div>
        </div>
        <div className="latitude-lines">
            <LatitudeLine style={{visibility: 'hidden'}}></LatitudeLine>
            <LatitudeLine style={{visibility: 'hidden'}}>40 N</LatitudeLine>
            <LatitudeLine style={{visibility: 'hidden'}}>30 N</LatitudeLine>
            <LatitudeLine style={{visibility: 'hidden'}}>20 N</LatitudeLine>
            <LatitudeLine style={{visibility: 'hidden'}}>10 N</LatitudeLine>
            <LatitudeLine style={{visibility: 'hidden'}}>50 metres</LatitudeLine>
        </div>
        <div className="latitude-controls">
            <Button disabled={props.value >= 26.5} onClick={onClick.bind(void 0, 0.5)}>+0.5 &deg;C</Button>
            <Button disabled={props.value <= 21} onClick={onClick.bind(void 0, -0.5)}>-0.5 &deg;C</Button>
        </div>
    </div>;
};
export default SeaTemperatureSelector;