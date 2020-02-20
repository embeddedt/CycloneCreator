import React from 'react';
import { Typography, Box } from '@material-ui/core';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
  }
  
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        className="tab-panel"
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}
export default TabPanel;