import React, { useContext } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AuthContext } from "../App";
import { jwtDecode } from 'jwt-decode';

export default function ProfileDeleteAlert(props) {
  const [token, setToken] = useContext(AuthContext);
  const decodedToken = jwtDecode(token);
  const { id_usuario } = decodedToken;
  const { url } = props;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteBand = async () => {
    await fetch(`${url}${id_usuario}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    handleClose();
    window.location.reload();
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Borrar perfil
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{""}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que quieres borrar el perfil?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            NO
          </Button>
          <Button onClick={deleteBand} color="primary" autoFocus>
            SI
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
