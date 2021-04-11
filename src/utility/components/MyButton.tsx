import React from "react";

// Mui
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

type Props = {
    children?: any;
    onClick?: any;
    tip?: any;
    btnClassName?: any;
    tipClassName?: any;
};

const MyButton: React.FC<Props> = ({ children,onClick,tip,btnClassName,tipClassName }) => (
    <Tooltip title={tip ? tip : false} className={tipClassName} placement="top">
        <IconButton onClick={onClick} className={btnClassName} style={{"padding": "4px"}}>
            {children}
        </IconButton>
    </Tooltip>
);

export default MyButton;
