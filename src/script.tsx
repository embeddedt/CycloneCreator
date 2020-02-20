import React from 'react';
import ReactDOM from 'react-dom';
import useForceUpdate from 'use-force-update';

import { AppBar, Tabs, Tab, Select, MenuItem, FormControl, Button } from '@material-ui/core';
import TabPanel from './TabPanel';
import DirectionSelector, { Direction } from './DirectionSelector';
import AnimatedNumber from 'react-animated-number';
import EnumSelect from './EnumSelect';
import LatitudeChooser from './LatitudeChooser';
import SeaTemperatureSelector from './SeaTemperatureSelector';

const WindDirectionCompound = props => (
    <div className="wind-direction-compound">
        <DirectionSelector value={props.value} onChange={props.onChange}/>
        <span>{props.name}-level wind direction</span>
    </div>
);

enum MoistureLevel {
    Dry,
    Medium,
    Moist
}

interface WindInfo {
    upperWindDirection: Direction;
    midWindDirection: Direction;
    lowWindDirection: Direction;
    midMoistureLevel: MoistureLevel;
    lowerMoistureLevel: MoistureLevel;
    latitudeRange: number;
    seaTemperature: number;
}

const AtmosphericLayer = props => (
    <div className="atmospheric-layer"><div className="layer-name">{props.name}</div><span className="layer-bracket">{`{`}</span>{props.children}</div>
);

const LEVEL_EASY = true;
const LEVEL_HARD = false;

window.onload = function() {
    function App() {
        const [ currentTab, setCurrentTab ] = React.useState(4);
        const [ level, setLevel ] = React.useState<boolean|null>(null);
        const windInfo = React.useRef<WindInfo>({} as any);

        const updateLevel = (level: boolean) => {
            windInfo.current = {
                upperWindDirection: level == LEVEL_EASY ? Direction.East : Direction.North,
                midWindDirection: Direction.East,
                lowWindDirection: level == LEVEL_EASY ? Direction.East : Direction.Southwest,
                midMoistureLevel: level == LEVEL_EASY ? MoistureLevel.Moist : MoistureLevel.Dry,
                lowerMoistureLevel: level == LEVEL_EASY ? MoistureLevel.Moist : MoistureLevel.Dry,
                latitudeRange: 0,
                seaTemperature: 21.5
            };
            setLevel(level);
        };

        const forceUpdate = useForceUpdate();

        const changeProperty = (property: keyof WindInfo, e: React.ChangeEvent<{ value: any; }>) => {
            windInfo.current[property as any] = e.currentTarget.value;
            console.log("update", property, "to", e.currentTarget.value);
            forceUpdate();
        };

        const handleTabChange = (e, newValue) => {
            setCurrentTab(newValue);
        };
        const numCategories = level == LEVEL_EASY ? 2 : 4;
        const pointIncrement = 100 / numCategories;
        let points = 0;
        if(level != null) {
            if(level == LEVEL_HARD) {
                if(windInfo.current.upperWindDirection == windInfo.current.lowWindDirection && windInfo.current.upperWindDirection == windInfo.current.midWindDirection)
                    points += pointIncrement;
                if(windInfo.current.midMoistureLevel == MoistureLevel.Moist)
                    points += pointIncrement / 2;
                if(windInfo.current.lowerMoistureLevel == MoistureLevel.Moist)
                    points += pointIncrement / 2;
            }
            
            points += windInfo.current.latitudeRange * (pointIncrement / 4);
            if(windInfo.current.latitudeRange == 5) {
                points -= (pointIncrement / 4) * 2;
            }
            const tmp = Math.max(0, windInfo.current.seaTemperature - 24.5);
            points += (pointIncrement / 2) * tmp;
        }
        const hasGameWon = points >= 100;
        return <div className="hurricane-container">
            {level == null && <>
                <span className="hurricane-points-header">Choose a level:</span>
                <div className="hurricane-level-buttons">
                    <Button variant="contained" color="primary" onClick={updateLevel.bind(this, LEVEL_EASY)}>Easy</Button>
                    <Button variant="contained" color="primary" onClick={updateLevel.bind(this, LEVEL_HARD)}>Hard</Button>
                </div>
            </>}
            {level != null && <>
                {hasGameWon && <div className="hurricane-won-container">
                    <img src="assets/hurricane.png" className="hurricane-won"/>
                </div>}
                <span className="hurricane-points-header">{hasGameWon ? "YOU MADE A HURRICANE!" : "YOUR POINTS:"}</span>
                <AnimatedNumber component="span" value={Math.round(points)} stepPrecision={0}
                    style={{
                        transition: '0.8s ease-out',
                        fontSize: '4rem',
                        zIndex: 1,
                        position: 'relative',
                        color: hasGameWon ? 'green' : 'black',
                        transitionProperty:
                            'background-color, color, opacity'
                    }}
                    duration={500}
                />
                <div className={`hurricane-settings ${hasGameWon ? "hurricane-settings-gamewon" : ""}`}>
                    <AppBar position="static">
                        <Tabs value={currentTab} onChange={handleTabChange} scrollButtons="on" variant="scrollable">
                            <Tab disabled={level == LEVEL_EASY} label="Wind directions" />
                            <Tab disabled={level == LEVEL_EASY} label="Moisture levels" />
                            <Tab label="Latitude range" />
                            <Tab label="Sea temperature" />
                            <Tab label="Help" />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={currentTab} index={0}>
                        <div className="wind-direction-container">
                            <WindDirectionCompound name="Upper" value={windInfo.current.upperWindDirection} onChange={changeProperty.bind(this, "upperWindDirection")}/>
                            <WindDirectionCompound name="Mid" value={windInfo.current.midWindDirection} onChange={changeProperty.bind(this, "midWindDirection")}/>
                            <WindDirectionCompound name="Low" value={windInfo.current.lowWindDirection} onChange={changeProperty.bind(this, "lowWindDirection")}/>
                        </div>
                    </TabPanel>
                    <TabPanel value={currentTab} index={1}>
                        <div className="atmospheric-layers">
                            <AtmosphericLayer name="UPPER">
                                <FormControl className="game-select">
                                    <Select disabled value="drymoist">
                                        <MenuItem value="drymoist">Dry/Moist</MenuItem>
                                    </Select>
                                </FormControl>
                            </AtmosphericLayer>
                            <AtmosphericLayer name="MIDDLE">
                                <EnumSelect enum={MoistureLevel} value={windInfo.current.midMoistureLevel} onChange={changeProperty.bind(this, "midMoistureLevel")}/>
                            </AtmosphericLayer>
                            <AtmosphericLayer name="LOWER">
                                <EnumSelect enum={MoistureLevel} value={windInfo.current.lowerMoistureLevel} onChange={changeProperty.bind(this, "lowerMoistureLevel")}/>
                            </AtmosphericLayer>
                        </div>
                    </TabPanel>
                    <TabPanel value={currentTab} index={2}>
                        <LatitudeChooser value={windInfo.current.latitudeRange} onChange={changeProperty.bind(this, "latitudeRange")}/>
                    </TabPanel>
                    <TabPanel value={currentTab} index={3}>
                        <SeaTemperatureSelector value={windInfo.current.seaTemperature} onChange={changeProperty.bind(this, "seaTemperature")}/>
                    </TabPanel>
                    <TabPanel value={currentTab} index={4}>
                        <span style={{ textAlign: 'left', display: 'block', padding: '1rem' }}>
                            In order for a hurricane to form, wind speeds don't have to be high,
                            but they need to come from the same direction at all levels in the
                            atmosphere and those layers need to be very full of moisture. This
                            needs to be happening not too close nor too far away from the
                            equator and over very warm waters.
                            <p></p>
                            Have a look at the different tabs and adjust the weather
                            condtions to make them perfect for creating a hurricane.
                            <p></p>
                            Your goal is to reach 100 points. Good luck!
                        </span>
                    </TabPanel>
                </div>
            </>}
        </div>;
    }
    ReactDOM.render(<App/>, document.getElementById('game-container'));
};