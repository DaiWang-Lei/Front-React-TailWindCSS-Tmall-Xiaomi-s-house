import React, { useRef, useState, useEffect } from "react";
import { Dialog as MDDialog, DialogContent, DialogContentText, DialogActions, Button, TextField } from "@material-ui/core";
import Grow from "@material-ui/core/Grow";
import { TransitionProps } from "@material-ui/core/transitions";
import Picker from "../picker";

//@ts-ignore
const GrowTransition = React.forwardRef<unknown, TransitionProps>((props, ref) => <Grow ref={ref} {...props} />);

const Dialog: React.FC<{
    open: boolean,
    handleClose?: (text?: string) => void,
    label?: string,
    validate?: (value: string) => boolean,
    error?: string

}> = ({ open, handleClose, label, validate, error }) => {

    const [value, setValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPicker, setShowPicker] = useState(false)
    useEffect(() => {
        setErrorMessage("");
        label == '修改出生日期' ? setShowPicker(true) : setShowPicker(false)
    }, [open]);

    return (
        <MDDialog
            open={open}
            TransitionComponent={GrowTransition}
            transitionDuration={500}
            maxWidth="xs"
        >
            <div className="p-6 pt-4">
                <DialogContent>
                    {
                        showPicker ? (
                            <Picker onChange={date => setValue(date)} />
                        ) : (
                            <TextField
                                error={!!errorMessage}
                                helperText={errorMessage}
                                fullWidth
                                onChange={e => setValue(e.target.value)}
                                label={label}
                            />
                        )
                    }

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose()}>
                        取消
                    </Button>
                    <Button onClick={() => {
                        if (validate !== undefined) {
                            if (validate(value))
                                handleClose(value);
                            else
                                setErrorMessage(error ?? "出错了");
                        }
                        else handleClose(value);
                    }}>
                        确定
                    </Button>
                </DialogActions>
            </div>
        </MDDialog>
    )
}

export default Dialog;