import React from 'react';
import { Button } from '@material-ui/core';

const MAX_LATITUDE = 6;
const LatitudeLine = props => (
    <div className="latitude-line" style={props.style}><span className="latitude-line-label">{props.children}</span></div>
);
export { LatitudeLine };

const LatitudeValueBox = ({value}) => {
    const divRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        if(divRef.current != null) {
            divRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [value, divRef.current]);
    return <div ref={divRef} className="latitude-selector" style={{ transform: `translateY(${value*1.5}em)`}}><span>LATITUDE<br/>RANGE</span></div>;
}

const LatitudeChooser: React.FC<{ value: number; onChange?: (e: { currentTarget: { value: number; }}) => void }> = (props) => {
    const onClick = delta => {
        const n = props.value + delta;
        if(typeof props.onChange == 'function' && n >= 0 && n < MAX_LATITUDE)
            props.onChange({ currentTarget: { value: n }});
    };
    return <div className="latitude-chooser">
        <div className="latitude-renderer">
            <img src="assets/worldbkgd.jpg"/>
            <div className="latitude-lines">
                <LatitudeLine>50 N</LatitudeLine>
                <LatitudeLine>40 N</LatitudeLine>
                <LatitudeLine>30 N</LatitudeLine>
                <LatitudeLine>20 N</LatitudeLine>
                <LatitudeLine>10 N</LatitudeLine>
                <LatitudeLine>Equator</LatitudeLine>
            </div>
            <LatitudeValueBox value={props.value}/>
        </div>
        <div className="latitude-controls">
            <Button disabled={props.value <= 0} onClick={onClick.bind(void 0, -1)}>MOVE NORTH</Button>
            <Button disabled={props.value >= (MAX_LATITUDE - 1)} onClick={onClick.bind(void 0, 1)}>MOVE SOUTH</Button>
        </div>
    </div>;
};
export default LatitudeChooser;