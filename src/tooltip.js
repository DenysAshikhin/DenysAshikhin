import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

function MouseOverPopover({ tooltip, children, style, extraClasses, opacity, forceOpen, setForceOpen }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [forceShow, setForceShow] = useState(false);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        if (!setForceOpen) {
            setAnchorEl(null);
        }
    };
    opacity = opacity ? opacity : '0.9';
    const open = !!setForceOpen ? forceOpen : Boolean(anchorEl);
    let currCords = 0;
    let screenX = window.innerWidth;
    let screenY = window.innerHeight;
    let xPlacement = 'left';
    let yPlacement = 'bottom';

    let xTransform = 'left';
    let yTransform = 'top'

    if (anchorEl) {
        currCords = anchorEl.getBoundingClientRect();
        if ((currCords.top / screenY) > 0.5) {
            yPlacement = 'top';
            yTransform = 'bottom'
        }
    }

    return (
        <div
            class={extraClasses ? extraClasses + 'popoverContainer' : 'popoverContainer'}
            style={style ? style : {}}
        >
            <Typography
                // aria-owns={open ? 'mouse-over-popover' : undefined}
                component={'span'}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                {children}
            </Typography>
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none'
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: yPlacement,
                    horizontal: xPlacement,
                }}
                transformOrigin={{
                    vertical: yTransform,
                    horizontal: xTransform,
                }}
                onClose={handlePopoverClose}
                // onMouseEnter={(e) => {
                //     setForceShow(true);
                // }}
                // oneMouseExit={(e) => {
                //     setForceShow(false);
                // }}
                // marginThreshold={1}
                // disableRestoreFocus
                // PaperProps={{
                //     onMouseEnter: handleMouseEnter,
                //     onMouseLeave: handleMouseLeave,
                //     sx: {
                //         pointerEvents: 'auto'
                //     }
                // }}
                slotProps={{
                    paper: {
                        style: {
                            backgroundColor: `rgba(255,255,255,${opacity})`,
                            padding: '6px',
                            pointerEvents: 'auto'
                        },
                        // onMouseEnter: (e) => {
                        //     if (setForceOpen) {
                        //         setForceOpen(true);
                        //     }
                        // },
                        // onMouseLeave: (e) => {
                        //     if (setForceOpen) {
                        //         setForceOpen(false);
                        //     }
                        // },
                        // sx: {
                        //     pointerEvents: 'auto'
                        // }
                    }
                }}
            >
                {tooltip}
            </Popover>
        </div >
    );
}

export default MouseOverPopover;
