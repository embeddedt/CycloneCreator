import React from 'react';


enum Direction {
    North,
    Northeast,
    East,
    Southeast,
    South,
    Southwest,
    West,
    Northwest
};
export { Direction };

export function getDirectionAbbreviation(dir: Direction): string {
    switch(dir) {
        case Direction.North:
        case Direction.South:
        case Direction.East:
        case Direction.West:
            return Direction[dir].charAt(0);
        case Direction.Northeast:
            return "NE";
        case Direction.Northwest:
            return "NW";
        case Direction.Southwest:
            return "SW";
        case Direction.Southeast:
            return "SE";
    }
}

const DirectionSelector: React.FC<{ value: Direction; onChange?: (e: { currentTarget: {value: Direction} }) => void; }> = props => {
    const onChange = (dir: Direction) => {
        if(typeof props.onChange == 'function') {
            props.onChange({ currentTarget: { value: dir }});
        }
    };
    return <div className="direction-selector">
        {Object.keys(Direction).filter(key => isNaN(key as any)).map(key =>
            <button
                key={key}
                onClick={onChange.bind(props, Direction[key])}
                className={`direction-button direction-button-${key} ${Direction[key] == props.value && "direction-button-active"}`}>
            </button>
        )}
        <span className="direction-abbrev">{getDirectionAbbreviation(props.value)}</span>
        {/*<div className="direction-info direction-info-border-hider"></div>*/}
    </div>;
};
export default DirectionSelector;